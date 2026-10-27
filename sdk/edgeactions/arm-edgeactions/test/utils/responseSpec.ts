// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";
import { Validator } from "jsonschema";
import type { Schema } from "jsonschema";
import { parse } from "yaml";
import type { PipelinePolicy, PipelineResponse } from "@azure/core-rest-pipeline";
import type { OperationState, PollerLike } from "@azure/core-lro";
import type { EdgeActionsManagementContext } from "../../src/api/index.js";

interface ResponseContract {
  schema?: Schema;
  headers?: Record<string, Schema>;
}

interface Operation {
  operationId: string;
  longRunning: boolean;
  responses: Record<string, ResponseContract>;
}

interface Snapshot {
  source: { repository: string; commit: string; url: string };
  apiVersion: string;
  definitions: Record<string, Schema>;
  paths: Record<string, Record<string, Operation>>;
}

export interface CapturedResponse {
  method: string;
  url: string;
  status: number;
  headers: Record<string, string>;
  body?: string;
}

export const responseSpec: Snapshot = JSON.parse(
  readFileSync(new URL("../responseSpec.json", import.meta.url), "utf8"),
);
const validator = new Validator();

export function assertSpecIsCurrent(): void {
  const source = parse(readFileSync(new URL("../../tsp-location.yaml", import.meta.url), "utf8"));
  assert.equal(responseSpec.source.commit, source.commit, "Refresh the response specification.");
  assert.equal(responseSpec.source.repository, source.repo);
  assert.equal(
    responseSpec.source.url,
    `https://raw.githubusercontent.com/${source.repo}/${source.commit}/${source.directory}/stable/${responseSpec.apiVersion}/openapi.json`,
  );
}

export function operationFor(method: string, url: string): Operation | undefined {
  const parsed = new URL(url);
  const versions = parsed.searchParams.getAll("api-version");
  assert(
    versions.length === 0 || (versions.length === 1 && versions[0] === responseSpec.apiVersion),
    "Response specification API version mismatch.",
  );
  for (const [path, methods] of Object.entries(responseSpec.paths)) {
    const pattern = path
      .split("/")
      .map((part) => (part.startsWith("{") ? "[^/]+" : part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
      .join("/");
    if (new RegExp(`^${pattern}$`, "i").test(parsed.pathname)) {
      return methods[method.toLowerCase()];
    }
  }
  return undefined;
}

function assertSchema(value: unknown, schema: Schema, description: string): void {
  const result = validator.validate(value, {
    id: "https://edgeactions.test/response",
    ...schema,
    definitions: responseSpec.definitions,
  });
  // Temporary RP exception: omit validationStatus rather than returning null.
  const errors = result.errors.filter(
    (error) =>
      !(
        description.startsWith("EdgeActionVersions_") &&
        /^instance(?:\.value\[\d+\])?\.properties\.validationStatus$/.test(error.property) &&
        error.instance === null &&
        (error.name === "type" || error.name === "enum")
      ),
  );
  // Do not echo response values or signed polling URLs into test logs.
  assert(
    errors.length === 0,
    `${description}: ${errors.map((error) => `${error.property}: ${error.name}`).join(", ")}`,
  );
}

function bodyOf(response: CapturedResponse): unknown {
  try {
    return JSON.parse(response.body ?? "");
  } catch {
    throw new Error("Response body must be valid JSON.");
  }
}

export function assertResponse(operation: Operation, response: CapturedResponse): void {
  const contract =
    operation.responses[String(response.status)] ??
    (response.status >= 400 ? operation.responses.default : undefined);
  assert(contract, `${operation.operationId}: undocumented HTTP ${response.status}.`);
  if (contract.schema) {
    assertSchema(bodyOf(response), contract.schema, operation.operationId);
  } else {
    assert(!response.body, `${operation.operationId}: HTTP ${response.status} must have no body.`);
  }
  for (const [key, schema] of Object.entries(contract.headers ?? {})) {
    const value = response.headers[key.toLowerCase()];
    if (value === undefined) continue;
    if (schema.type === "integer") {
      assert(/^-?\d+$/.test(value), `${key} must be an integer.`);
    }
    assertSchema(schema.type === "integer" ? Number(value) : value, schema, `${key} header`);
  }
}

export function assertPollingUrl(url: string): void {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Polling headers must contain absolute HTTPS URLs.");
  }
  assert.equal(parsed.protocol, "https:", "Polling URLs must use HTTPS.");
  assert(!parsed.username && !parsed.password && !parsed.hash, "Invalid polling URL.");
  const versions = parsed.searchParams.getAll("api-version");
  assert(
    versions.length === 0 || (versions.length === 1 && versions[0] === responseSpec.apiVersion),
    "Polling URL API version mismatch.",
  );
}

export function urlKey(url: string): string {
  const parsed = new URL(url);
  if (!parsed.searchParams.has("api-version")) {
    parsed.searchParams.set("api-version", responseSpec.apiVersion);
  }
  parsed.searchParams.sort();
  return `${parsed.pathname.toLowerCase()}?${parsed.searchParams}`;
}

export function assertStatusResponse(response: CapturedResponse): string {
  assert.equal(response.status, 200, "Azure-AsyncOperation must return HTTP 200.");
  const body = bodyOf(response);
  assertSchema(
    body,
    {
      type: "object",
      required: ["status"],
      properties: { status: { type: "string", minLength: 1 } },
    },
    "ARM operation status",
  );
  return (body as { status: string }).status;
}

export function assertLocationResponse(operation: Operation, response: CapturedResponse): void {
  assert(response.status >= 200 && response.status < 300, "Location must return success.");
  assert.notEqual(response.status, 202, "Location must return a completed result.");
  // RP fix follows SDK release. Only the known swapDefault 200-with-body result is exempt.
  if (
    operation.operationId === "EdgeActionVersions_SwapDefault" &&
    response.status === 200 &&
    response.body
  ) {
    return;
  }
  assertResponse(operation, response);
}

export function captureResponse(response: PipelineResponse): CapturedResponse {
  return {
    method: response.request.method,
    url: response.request.url,
    status: response.status,
    headers: response.headers.toJSON(),
    body: response.bodyAsText ?? undefined,
  };
}

export function responsePolicy(
  responses: CapturedResponse[],
  signal?: AbortSignal,
): PipelinePolicy {
  return {
    name: "edgeActionsResponseContract",
    async sendRequest(request, next) {
      signal?.throwIfAborted();
      request.abortSignal ??= signal;
      const response = await next(request);
      signal?.throwIfAborted();
      const captured = captureResponse(response);
      responses.push(captured);
      const operation = operationFor(request.method, request.url);
      if (operation) assertResponse(operation, captured);
      return response;
    },
  };
}

export async function completeLro<T>(
  context: EdgeActionsManagementContext,
  responses: CapturedResponse[],
  start: () => PollerLike<OperationState<T>, T>,
  signal?: AbortSignal,
): Promise<T> {
  const offset = responses.length;
  const poller = start();
  const result = await poller.pollUntilDone({ abortSignal: signal });
  assert(poller.isDone, "LRO must finish.");
  assert.equal(poller.operationState?.status, "succeeded");
  const captured = responses.slice(offset);
  const initial = captured[0];
  assert(initial, "LRO must issue an initial request.");
  const operation = operationFor(initial.method, initial.url);
  assert(operation?.longRunning, "Expected a documented long-running operation.");
  assertResponse(operation, initial);
  const statusUrl = initial.headers["azure-asyncoperation"];
  const location = initial.headers.location;
  for (const url of [statusUrl, location, initial.headers["operation-location"]]) {
    if (url) assertPollingUrl(url);
  }
  if (initial.status === 202) {
    assert(statusUrl || location, "Accepted operations must advertise a polling URL.");
  }
  if (statusUrl && location) {
    assert(
      urlKey(statusUrl) !== urlKey(location),
      "Azure-AsyncOperation and Location must identify different URLs.",
    );
  }
  const statusResponses = statusUrl
    ? captured.slice(1).filter((response) => urlKey(response.url) === urlKey(statusUrl))
    : [];
  const statuses = statusResponses.map(assertStatusResponse);
  if (statusUrl && initial.status === 202) {
    assert(statuses.length > 0, "The SDK must poll Azure-AsyncOperation.");
  }
  if (statuses.length) {
    assert.equal(statuses.at(-1), "Succeeded");
    assert(
      statuses
        .slice(0, -1)
        .every((status) => !["Succeeded", "Failed", "Canceled"].includes(status)),
      "The SDK must stop polling after a terminal status.",
    );
  }
  if (initial.status === 202 && location) {
    const locationResponses = captured
      .slice(1)
      .filter((response) => urlKey(response.url) === urlKey(location));
    let final = locationResponses.at(-1);
    if (final && statusResponses.length) {
      assert(captured.indexOf(final) > captured.indexOf(statusResponses.at(-1)!));
    }
    if (!final) {
      // DELETE/PATCH polling can skip Location. Check its logical result, not an unrelated GET schema.
      assert.equal(
        new URL(location).origin,
        new URL(initial.url).origin,
        "Unexpected Location host.",
      );
      const finalUrl = new URL(location);
      if (!finalUrl.searchParams.has("api-version")) {
        finalUrl.searchParams.set("api-version", responseSpec.apiVersion);
      }
      const response = await context.pathUnchecked(finalUrl.href).get({ abortSignal: signal });
      final = {
        method: "GET",
        url: location,
        status: Number(response.status),
        headers: response.headers,
        body: response.body === undefined ? undefined : JSON.stringify(response.body),
      };
    }
    assertLocationResponse(operation, final);
  }
  return result;
}
