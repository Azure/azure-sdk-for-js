// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient, TracingSpan, TracingSpanOptions } from "@azure/core-tracing";
import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { getUserAgentValue } from "../util/userAgent";
import { logger } from "../log";
import { SDK_VERSION } from "../constants";

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
      if (!request.tracingOptions?.tracingContext) {
        return next(request);
      }

      const tryCreateSpanResult = tryCreateSpan(request, userAgent);

      if (!tryCreateSpanResult) {
        return next(request);
      }

      const { span, updatedOptions } = tryCreateSpanResult;

      try {
        let response: PipelineResponse;
        if (
          updatedOptions.tracingOptions &&
          updatedOptions.tracingOptions.tracingContext &&
          typeof tracingClient.withContext === "function"
        ) {
          response = await tracingClient.withContext(
            updatedOptions.tracingOptions.tracingContext,
            () => next(request)
          );
        } else {
          response = await next(request);
        }
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
): ReturnType<typeof tracingClient.startSpan> | undefined {
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

    // If the span is not recording, don't do any more work.
    if (!span.isRecording()) {
      span.end();
      return undefined;
    }

    const namespaceFromContext = updatedOptions.tracingOptions.tracingContext?.getValue(
      Symbol.for("az.namespace")
    );

    if (typeof namespaceFromContext === "string") {
      span.setAttribute("az.namespace", namespaceFromContext);
    }

    if (userAgent) {
      span.setAttribute("http.user_agent", userAgent);
    }

    // set headers
    const headers = tracingClient.createRequestHeaders(
      updatedOptions.tracingOptions.tracingContext
    );
    for (const headerName in headers) {
      request.headers.set(headerName, headers[headerName]);
    }

    return { span, updatedOptions };
  } catch (error) {
    logger.warning(`Skipping creating a tracing span due to an error: ${error.message}`);
    return undefined;
  }
}

function tryProcessError(span: TracingSpan, err: any): void {
  try {
    span.setStatus({ status: "error", error: err });
    if (err.statusCode) {
      span.setAttribute("http.status_code", err.statusCode);
    }
    span.end();
  } catch (error) {
    logger.warning(`Skipping tracing span processing due to an error: ${error.message}`);
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
