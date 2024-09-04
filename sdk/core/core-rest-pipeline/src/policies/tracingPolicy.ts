// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type TracingClient,
  type TracingContext,
  type TracingSpan,
  createTracingClient,
} from "@azure/core-tracing";
import { SDK_VERSION } from "../constants.js";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { getUserAgentValue } from "../util/userAgent.js";
import { logger } from "../log.js";
import { getErrorMessage, isError } from "@azure/core-util";
import { isRestError } from "../restError.js";
import { Sanitizer } from "../util/sanitizer.js";

/**
 * The programmatic identifier of the tracingPolicy.
 */
export const tracingPolicyName = "tracingPolicy";

/**
 * Options to configure the tracing policy.
 */
export interface TracingPolicyOptions {
  /**
   * String prefix to add to the user agent logged as metadata
   * on the generated Span.
   * Defaults to an empty string.
   */
  userAgentPrefix?: string;
  /**
   * Query string names whose values will be logged when logging is enabled. By default no
   * query string values are logged.
   */
  additionalAllowedQueryParameters?: string[];
}

/**
 * A simple policy to create OpenTelemetry Spans for each request made by the pipeline
 * that has SpanOptions with a parent.
 * Requests made without a parent Span will not be recorded.
 * @param options - Options to configure the telemetry logged by the tracing policy.
 */
export function tracingPolicy(options: TracingPolicyOptions = {}): PipelinePolicy {
  const userAgentPromise = getUserAgentValue(options.userAgentPrefix);
  const sanitizer = new Sanitizer({
    additionalAllowedQueryParameters: options.additionalAllowedQueryParameters,
  });
  const tracingClient = tryCreateTracingClient();

  return {
    name: tracingPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!tracingClient || !request.tracingOptions?.tracingContext) {
        return next(request);
      }

      const userAgent = await userAgentPromise;

      const spanAttributes = {
        "http.url": sanitizer.sanitizeUrl(request.url),
        "http.method": request.method,
        "http.user_agent": userAgent,
        requestId: request.requestId,
      };
      if (userAgent) {
        spanAttributes["http.user_agent"] = userAgent;
      }

      const { span, tracingContext } = tryCreateSpan(tracingClient, request, spanAttributes) ?? {};

      if (!span || !tracingContext) {
        return next(request);
      }

      try {
        const response = await tracingClient.withContext(tracingContext, next, request);
        tryProcessResponse(span, response);
        return response;
      } catch (err: any) {
        tryProcessError(span, err);
        throw err;
      }
    },
  };
}

function tryCreateTracingClient(): TracingClient | undefined {
  try {
    return createTracingClient({
      namespace: "",
      packageName: "@azure/core-rest-pipeline",
      packageVersion: SDK_VERSION,
    });
  } catch (e: unknown) {
    logger.warning(`Error when creating the TracingClient: ${getErrorMessage(e)}`);
    return undefined;
  }
}

function tryCreateSpan(
  tracingClient: TracingClient,
  request: PipelineRequest,
  spanAttributes: Record<string, unknown>,
): { span: TracingSpan; tracingContext: TracingContext } | undefined {
  try {
    // As per spec, we do not need to differentiate between HTTP and HTTPS in span name.
    const { span, updatedOptions } = tracingClient.startSpan(
      `HTTP ${request.method}`,
      { tracingOptions: request.tracingOptions },
      {
        spanKind: "client",
        spanAttributes,
      },
    );

    // If the span is not recording, don't do any more work.
    if (!span.isRecording()) {
      span.end();
      return undefined;
    }

    // set headers
    const headers = tracingClient.createRequestHeaders(
      updatedOptions.tracingOptions.tracingContext,
    );
    for (const [key, value] of Object.entries(headers)) {
      request.headers.set(key, value);
    }
    return { span, tracingContext: updatedOptions.tracingOptions.tracingContext };
  } catch (e: any) {
    logger.warning(`Skipping creating a tracing span due to an error: ${getErrorMessage(e)}`);
    return undefined;
  }
}

function tryProcessError(span: TracingSpan, error: unknown): void {
  try {
    span.setStatus({
      status: "error",
      error: isError(error) ? error : undefined,
    });
    if (isRestError(error) && error.statusCode) {
      span.setAttribute("http.status_code", error.statusCode);
    }
    span.end();
  } catch (e: any) {
    logger.warning(`Skipping tracing span processing due to an error: ${getErrorMessage(e)}`);
  }
}

function tryProcessResponse(span: TracingSpan, response: PipelineResponse): void {
  try {
    span.setAttribute("http.status_code", response.status);
    const serviceRequestId = response.headers.get("x-ms-request-id");
    if (serviceRequestId) {
      span.setAttribute("serviceRequestId", serviceRequestId);
    }
    span.setStatus({
      status: "success",
    });
    span.end();
  } catch (e: any) {
    logger.warning(`Skipping tracing span processing due to an error: ${getErrorMessage(e)}`);
  }
}
