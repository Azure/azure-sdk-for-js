// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { createPipelineRequest } from "../pipelineRequest.js";
import { createHttpHeaders } from "../httpHeaders.js";
import { logger } from "../log.js";

export const externalEvaluationPolicyName = "externalEvaluationPolicy";

/**
 * Options for the external evaluation policy.
 */
export interface ExternalEvaluationPolicyOptions {
  /**
   * API version for acquirePolicyToken. Defaults to "2025-11-01".
   */
  apiVersion?: string;
}

/**
 * A policy that handles Azure Policy External Evaluation challenges.
 *
 * When an ARM request receives a 403 with `RequestDisallowedByPolicy` and
 * `missingPolicyTokenDetails`, this policy automatically calls `acquirePolicyToken`
 * and retries the original request with the resulting token.
 *
 * This policy is for ARM pacakages only.
 */
export function externalEvaluationPolicy(
  options: ExternalEvaluationPolicyOptions = {},
): PipelinePolicy {
  const apiVersion = options.apiVersion ?? "2025-11-01";

  return {
    name: externalEvaluationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // Only apply to non GET method
      if (request.method === "GET") {
        return next(request);
      }

      // Require subscriptionId in URL for acquirePolicyToken
      const subscriptionId = extractSubscriptionId(request.url);
      if (!subscriptionId) {
        return next(request);
      }

      const response = await next(request);

      if (response.status !== 403) {
        return response;
      }

      let responseBody;
      try {
        responseBody = JSON.parse(response.bodyAsText ?? "");
      } catch {
        return response;
      }
      // 403 RequestDisallowedByPolicy + error.additionalInfo[*].info.evaluationDetails.missingPolicyTokenDetails
      if (
        responseBody?.error?.code !== "RequestDisallowedByPolicy" ||
        !responseBody?.error?.additionalInfo?.some(
          (info: any) => info?.info?.evaluationDetails?.missingPolicyTokenDetails,
        )
      ) {
        return response;
      }

      // acquirePolicyToken flow
      const baseUrl = getBaseUrl(request.url);
      const acquireUrl =
        `${baseUrl}/subscriptions/${subscriptionId}` +
        `/providers/Microsoft.Authorization/policyTokens/default/acquirePolicyToken` +
        `?api-version=${apiVersion}`;
      const token = await acquirePolicyToken(acquireUrl, request, next);

      if (!token) {
        return response;
      }

      // Retry with the policy token header with verbatim token
      request.headers.set("x-ms-policy-external-evaluations", token);
      return next(request);
    },
  };
}

function extractSubscriptionId(url: string): string | undefined {
  const match = url.match(/\/subscriptions\/([^/?]+)/i);
  return match?.[1];
}

function getBaseUrl(url: string): string {
  const parsed = new URL(url);
  return parsed.origin;
}

async function acquirePolicyToken(
  acquireUrl: string,
  originalRequest: PipelineRequest,
  next: SendRequest,
): Promise<string | undefined> {
  const acquireBody = JSON.stringify({
    properties: {
      operation: {
        uri: originalRequest.url,
        method: originalRequest.method,
        content:
          typeof originalRequest.body === "string"
            ? originalRequest.body
            : JSON.stringify(originalRequest.body),
      },
    },
  });

  const acquireRequest = createPipelineRequest({
    url: acquireUrl,
    method: "POST",
    body: acquireBody,
    headers: createHttpHeaders({
      "Content-Type": "application/json",
      Authorization: originalRequest.headers.get("Authorization") ?? "",
    }),
  });

  const acquireResponse = await next(acquireRequest);
  const result = JSON.parse(acquireResponse.bodyAsText ?? "");
  if (acquireResponse.status !== 200 || result.properties?.result === "Failed") {
    logger.info("External Evaluation: acquirePolicyToken failed, returning original 403");
    return undefined;
  }
  if (result.properties?.results?.some((r: any) => r.policyAction === "Deny")) {
    logger.warning("External Evaluation: acquirePolicyToken denied, returning original 403");
    return undefined;
  }

  return result.properties?.token;
}
