// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureLogger } from "@azure/logger";
import { disposeResponseBody } from "@typespec/ts-http-runtime/internal/util";
import type { HttpMethods } from "@azure/core-util";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { createPipelineRequest } from "../pipelineRequest.js";
import { createHttpHeaders } from "../httpHeaders.js";
import { logger as coreLogger } from "../log.js";
import { isRestError, type RestError } from "../restError.js";

/**
 * The programmatic identifier of the externalEvaluationPolicy.
 */
export const externalEvaluationPolicyName = "externalEvaluationPolicy";

/**
 * Options for the opt-in ARM External Evaluation prototype.
 */
export interface ExternalEvaluationPolicyOptions {
  /**
   * API version used to acquire a policy token. Defaults to "2025-11-01".
   */
  apiVersion?: string;
  /**
   * A logger for diagnostics that do not include tokens or request bodies.
   */
  logger?: AzureLogger;
}

interface OperationSnapshot {
  url: string;
  method: HttpMethods;
  body?: string | null;
  origin: string;
  subscriptionId: string;
}

type Attempt = [response: PipelineResponse, error: RestError | undefined];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
    return undefined;
  }
}

function captureOperation(request: PipelineRequest): OperationSnapshot | undefined {
  if (
    !["PUT", "PATCH", "POST", "DELETE"].includes(request.method) ||
    request.formData ||
    request.multipartBody
  ) {
    return undefined;
  }
  const body = request.body;
  if (body !== undefined && body !== null) {
    const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
    if (
      typeof body !== "string" ||
      (contentType && contentType !== "application/json" && !contentType.endsWith("+json")) ||
      parseJson(body) === undefined
    ) {
      return undefined;
    }
  }

  let url: URL;
  try {
    url = new URL(request.url);
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error;
    }
    return undefined;
  }
  const subscription =
    /^\/subscriptions\/([0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12})(?:\/|$)/i.exec(url.pathname);
  if (url.protocol !== "https:" || url.username || url.password || url.hash || !subscription) {
    return undefined;
  }
  return {
    url: request.url,
    method: request.method,
    body,
    origin: url.origin,
    subscriptionId: subscription[1],
  };
}

function isActionable([response, error]: Attempt): boolean {
  if (response.status !== 403) {
    return false;
  }
  const payloads = [error?.details, parseJson(response.bodyAsText ?? "")];
  for (const payload of payloads) {
    if (!isRecord(payload)) {
      continue;
    }
    const detail = isRecord(payload.error) ? payload.error : payload;
    if (detail.code !== "RequestDisallowedByPolicy" || !Array.isArray(detail.additionalInfo)) {
      continue;
    }
    let hasMissingToken = false;
    for (const additional of detail.additionalInfo) {
      if (!isRecord(additional) || !isRecord(additional.info)) {
        continue;
      }
      const evaluation = additional.info.evaluationDetails;
      if (!isRecord(evaluation)) {
        continue;
      }
      const missing = evaluation.missingPolicyTokenDetails;
      const entries = Array.isArray(missing) ? missing : [missing];
      for (const entry of entries) {
        if (!isRecord(entry)) {
          continue;
        }
        if (entry.isChangeReferenceRequired === true) {
          return false;
        }
        if (
          entry.isChangeReferenceRequired === undefined ||
          entry.isChangeReferenceRequired === false
        ) {
          hasMissingToken = true;
        }
      }
    }
    if (hasMissingToken) {
      return true;
    }
  }
  return false;
}

async function trySendRequest(request: PipelineRequest, next: SendRequest): Promise<Attempt> {
  try {
    return [await next(request), undefined];
  } catch (error) {
    if (isRestError(error) && error.response) {
      return [error.response, error];
    }
    throw error;
  }
}

function returnOrThrow([response, error]: Attempt): PipelineResponse {
  if (error) {
    throw error;
  }
  return response;
}

function getPolicyToken(response: PipelineResponse): string | undefined {
  if (response.status < 200 || response.status >= 300) {
    return undefined;
  }
  const body = parseJson(response.bodyAsText ?? "");
  if (
    !isRecord(body) ||
    body.result !== "Succeeded" ||
    typeof body.token !== "string" ||
    !body.token.trim() ||
    (body.results !== undefined &&
      (!Array.isArray(body.results) ||
        body.results.some(
          (result: unknown) =>
            !isRecord(result) || result.policyAction === "Deny" || result.policyAction === "Error",
        )))
  ) {
    return undefined;
  }
  return body.token;
}

/**
 * Acquires a policy token after an actionable ARM 403 and replays the operation once.
 *
 * This opt-in prototype supports subscription-scoped JSON or bodyless operations,
 * but not changeReference, streaming, multipart, token caching, or acquisition loops.
 * Install without a phase, before bearerTokenAuthenticationPolicy, so serialization
 * precedes it and authentication and standard retries apply to acquisition and replay.
 *
 * @param options - Options for policy token acquisition and diagnostic logging.
 * @returns The External Evaluation pipeline policy.
 */
export function externalEvaluationPolicy(
  options: ExternalEvaluationPolicyOptions = {},
): PipelinePolicy {
  const logger = options.logger ?? coreLogger;
  return {
    name: externalEvaluationPolicyName,
    async sendRequest(request, next) {
      const snapshot = captureOperation(request);
      const original = await trySendRequest(request, next);
      if (!isActionable(original)) {
        return returnOrThrow(original);
      }
      if (!snapshot) {
        logger.warning("External Evaluation skipped: unsupported operation URL or body.");
        return returnOrThrow(original);
      }

      const url = new URL(
        `/subscriptions/${snapshot.subscriptionId}/providers/Microsoft.Authorization/acquirePolicyToken`,
        snapshot.origin,
      );
      url.searchParams.set("api-version", options.apiVersion ?? "2025-11-01");
      // Preserve serialized content bytes; the service's contentHash canonicalization
      // contract still needs confirmation before production enablement.
      const body =
        `{"operation":{"uri":${JSON.stringify(snapshot.url)},` +
        `"httpMethod":${JSON.stringify(snapshot.method)}` +
        (snapshot.body == null ? "" : `,"content":${snapshot.body}`) +
        "}}";
      const acquireRequest = createPipelineRequest({
        url: url.href,
        method: "POST",
        headers: createHttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body,
        abortSignal: request.abortSignal,
        timeout: request.timeout,
        proxySettings: request.proxySettings,
        disableKeepAlive: request.disableKeepAlive,
      });
      acquireRequest.tracingOptions = request.tracingOptions;
      acquireRequest.tlsSettings = request.tlsSettings;
      acquireRequest.agent = request.agent;

      let acquisition: Attempt;
      try {
        acquisition = await trySendRequest(acquireRequest, next);
      } catch (error) {
        if (!isRestError(error)) {
          throw error;
        }
        logger.warning(
          "External Evaluation token acquisition failed; preserving the original 403.",
        );
        return returnOrThrow(original);
      }
      const token = acquisition[1] ? undefined : getPolicyToken(acquisition[0]);
      await disposeResponseBody(acquisition[0]);
      if (!token) {
        logger.warning(
          "External Evaluation token acquisition did not authorize replay (HTTP %d).",
          acquisition[0].status,
        );
        return returnOrThrow(original);
      }

      await disposeResponseBody(original[0]);
      request.url = snapshot.url;
      request.method = snapshot.method;
      request.body = snapshot.body;
      request.headers.set("x-ms-policy-external-evaluations", token);
      logger.info("External Evaluation replaying the original operation with a policy token.");
      return returnOrThrow(await trySendRequest(request, next));
    },
  };
}
