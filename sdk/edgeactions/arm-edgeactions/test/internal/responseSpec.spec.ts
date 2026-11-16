// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import {
  assertLocationResponse,
  assertPollingUrl,
  assertResponse,
  assertSpecIsCurrent,
  assertStatusResponse,
  operationFor,
  urlKey,
  responsePolicy,
} from "../utils/responseSpec.js";
import type { CapturedResponse } from "../utils/responseSpec.js";

const resource =
  "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Microsoft.Cdn/edgeActions/test/versions/v1";
const deploy = operationFor("POST", `${resource}/deployVersionCode`)!;
const swap = operationFor("POST", `${resource}/swapDefault`)!;
const code = operationFor("POST", `${resource}/getVersionCode`)!;

function response(status: number, body?: unknown): CapturedResponse {
  return {
    method: "GET",
    url: resource,
    status,
    headers: {},
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}

describe("pinned Edge Actions response contracts", () => {
  it("matches the SDK generation source", assertSpecIsCurrent);

  it("stops requests before transport when the test is cancelled", async () => {
    const controller = new AbortController();
    const reason = new Error("Test cancelled");
    controller.abort(reason);
    const next = vi.fn();
    const policy = responsePolicy([], controller.signal);
    await expect(policy.sendRequest(createPipelineRequest({ url: resource }), next)).rejects.toBe(
      reason,
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("propagates test cancellation and rejects late responses before tests can continue", async () => {
    const controller = new AbortController();
    const reason = new Error("Test cancelled");
    const responses: CapturedResponse[] = [];
    const policy = responsePolicy(responses, controller.signal);
    await expect(
      policy.sendRequest(createPipelineRequest({ url: resource }), async (request) => {
        expect(request.abortSignal).toBe(controller.signal);
        controller.abort(reason);
        return { request, status: 200, headers: createHttpHeaders(), bodyAsText: "{}" };
      }),
    ).rejects.toBe(reason);
    expect(responses).toEqual([]);
  });

  it.each([{}, { status: "" }, { status: 1 }, null])(
    "rejects malformed operation status %#",
    (body) => {
      expect(() => assertStatusResponse(response(200, body))).toThrow();
    },
  );

  it("requires HTTP 200 and accepts the ARM status envelope, not a resource", () => {
    expect(assertStatusResponse(response(200, { status: "Succeeded" }))).toBe("Succeeded");
    expect(() => assertStatusResponse(response(202, { status: "Running" }))).toThrow();
    expect(() =>
      assertStatusResponse(response(200, { properties: { provisioningState: "Succeeded" } })),
    ).toThrow();
  });

  it("checks only status in async-operation bodies, ignoring all additional fields", () => {
    expect(
      assertStatusResponse(
        response(200, {
          status: "Running",
          startTime: "not-a-date",
          endTime: null,
          percentComplete: "not-a-number",
          properties: null,
          error: "not-an-error-envelope",
        }),
      ),
    ).toBe("Running");
  });

  it.each([
    "/relative",
    "http://example.com/status",
    "https://user:pass@example.com/status",
    "https://example.com/status#fragment",
    "https://example.com/status?api-version=2025-12-01-preview",
  ])("rejects invalid polling URLs %#", (url) => {
    expect(() => assertPollingUrl(url)).toThrow();
  });

  it("matches rewritten playback hosts and reordered query parameters", () => {
    expect(urlKey("https://management.azure.com/status?b=2&a=1")).toBe(
      urlKey("http://localhost:5100/status?a=1&b=2"),
    );
    expect(() => assertPollingUrl(`${resource}?api-version=2026-10-01`)).not.toThrow();
  });

  it("rejects API-version drift", () => {
    expect(() => operationFor("GET", `${resource}?api-version=2025-12-01-preview`)).toThrow(
      /version/,
    );
  });

  it("rejects bodies on 202, unexpected success codes and invalid Retry-After", () => {
    expect(() => assertResponse(deploy, response(202, {}))).toThrow(/no body/);
    expect(() => assertResponse(deploy, response(201))).toThrow(/undocumented/);
    expect(() =>
      assertResponse(deploy, { ...response(202), headers: { "retry-after": "1.5" } }),
    ).toThrow(/integer/);
  });

  it("checks final Location against the initiating operation's result schema", () => {
    expect(() => assertLocationResponse(deploy, response(200, { status: "Succeeded" }))).toThrow();
    expect(() =>
      assertLocationResponse(deploy, response(200, { location: "global" })),
    ).not.toThrow();
    expect(() => assertLocationResponse(code, response(200, { location: "global" }))).toThrow();
    expect(() =>
      assertLocationResponse(code, response(200, { name: "handler", content: "YQ==" })),
    ).not.toThrow();
    expect(() =>
      assertLocationResponse(code, response(200, { name: "handler", content: 42 })),
    ).toThrow();
  });

  it("exempts only the known swapDefault Location 200-with-body mismatch", () => {
    expect(() =>
      assertLocationResponse(
        swap,
        response(200, { properties: { provisioningState: "Succeeded" } }),
      ),
    ).not.toThrow();
    expect(() => assertLocationResponse(swap, response(204))).not.toThrow();
    expect(() => assertLocationResponse(swap, response(200))).toThrow();
    expect(() => assertLocationResponse(swap, response(202, {}))).toThrow();
    expect(() => assertLocationResponse(swap, response(204, {}))).toThrow();
    expect(() => assertLocationResponse(swap, response(500, { error: {} }))).toThrow();
    expect(() => assertResponse(swap, response(200, {}))).toThrow();
    expect(() => assertLocationResponse(deploy, response(200, {}))).toThrow();
  });

  it("checks required nested fields and field formats", () => {
    const get = operationFor("GET", resource)!;
    expect(() =>
      assertResponse(
        get,
        response(200, { location: "global", properties: { deploymentType: "file" } }),
      ),
    ).toThrow();
    expect(() =>
      assertResponse(
        get,
        response(200, { location: "global", systemData: { createdAt: "not-a-date" } }),
      ),
    ).toThrow();
  });

  it("temporarily tolerates only null version validationStatus pending the RP fix", () => {
    const get = operationFor("GET", resource)!;
    const body = {
      location: "global",
      properties: { deploymentType: "file", isDefaultVersion: "False", validationStatus: null },
    };
    expect(() => assertResponse(get, response(200, body))).not.toThrow();
    expect(() => assertResponse(deploy, response(200, body))).not.toThrow();
    expect(() =>
      assertResponse(
        get,
        response(200, { ...body, properties: { ...body.properties, deploymentType: null } }),
      ),
    ).toThrow();
    for (const validationStatus of [42, "", "invalid"]) {
      expect(() =>
        assertResponse(
          get,
          response(200, { ...body, properties: { ...body.properties, validationStatus } }),
        ),
      ).toThrow();
    }
    expect(() => assertResponse(get, response(201, body))).toThrow(/undocumented/);
  });

  it("does not leak response values through schema errors", () => {
    expect(() =>
      assertLocationResponse(code, response(200, { name: { secret: "do-not-log" } })),
    ).toThrow();
    try {
      assertLocationResponse(code, response(200, { name: { secret: "do-not-log" } }));
    } catch (error) {
      expect(String(error)).not.toContain("do-not-log");
    }
  });
});
