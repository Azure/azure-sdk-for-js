// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces";
import { TracingSpan, TracingSpanOptions, createTracingClient } from "@azure/core-tracing";

import { PipelinePolicy } from "../pipeline";
import { SDK_VERSION } from "../constants";
import { TracingContext } from "../../../core-auth/types/latest/core-auth";
import { getUserAgentValue } from "../util/userAgent";
import { logger } from "../log";

export const tracingClient = createTracingClient({
  namespace: "",
  packageName: "@azure/core-rest-pipeline",
  packageVersion: SDK_VERSION,
});

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
}

/**
 * A simple policy to create OpenTelemetry Spans for each request made by the pipeline
 * that has SpanOptions with a parent.
 * Requests made without a parent Span will not be recorded.
 * @param options - Options to configure the telemetry logged by the tracing policy.
 */
export function tracingPolicy(options: TracingPolicyOptions = {}): PipelinePolicy {
  const userAgent = getUserAgentValue(options.userAgentPrefix);

  return {
    name: tracingPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const { span, tracingContext } = tryCreateSpan(request, userAgent);

      if (!span) {
        return next(request);
      }

      try {
        const response = await tracingClient.withContext(tracingContext!, next, request);
        tryProcessResponse(span, response);
        return response;
      } catch (err) {
        tryProcessError(span, err);
        throw err;
      }
    },
  };
}

function tryCreateSpan(
  request: PipelineRequest,
  userAgent?: string
): { span?: TracingSpan; tracingContext?: TracingContext } {
  try {
    const createSpanOptions: TracingSpanOptions = {
      spanKind: "client",
      spanAttributes: {
        "http.method": request.method,
        "http.url": request.url,
        requestId: request.requestId,
      },
    };

    // As per spec, we do not need to differentiate between HTTP and HTTPS in span name.
    const { span, updatedOptions } = tracingClient.startSpan(
      `HTTP ${request.method}`,
      {
        tracingOptions: { ...request.tracingOptions },
      },
      createSpanOptions
    );

    // If the span is not recording, don't do any more work and return early.
    if (!span.isRecording()) {
      span.end();
      return { span: undefined, tracingContext: undefined };
    }

    if (userAgent) {
      span.setAttribute("http.user_agent", userAgent);
    }

    // set headers
    const headers = tracingClient.createRequestHeaders(
      updatedOptions.tracingOptions.tracingContext
    );
    for (const header in headers) {
      request.headers.set(header, headers[header]);
    }
    return { span, tracingContext: updatedOptions.tracingOptions.tracingContext };
  } catch (error) {
    logger.warning(`Skipping creating a tracing span due to an error: ${error.message}`);
    return { span: undefined, tracingContext: undefined };
  }
}

function tryProcessError(span: TracingSpan, error: any): void {
  try {
    span.setStatus({
      status: "error",
      error,
    });
    if (error.statusCode) {
      span.setAttribute("http.status_code", error.statusCode);
    }
    span.end();
  } catch (err) {
    logger.warning(`Skipping tracing span processing due to an error: ${err.message}`);
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
  } catch (error) {
    logger.warning(`Skipping tracing span processing due to an error: ${error.message}`);
  }
}
