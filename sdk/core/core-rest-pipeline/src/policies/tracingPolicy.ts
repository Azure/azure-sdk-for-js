// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getTraceParentHeader,
  createSpanFunction,
  SpanStatusCode,
  isSpanContextValid,
  Span,
  SpanOptions
} from "@azure/core-tracing";
import { SpanKind } from "@azure/core-tracing";
import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { URL } from "../util/url";
import { getUserAgentValue } from "../util/userAgent";
import { logger } from "../log";

const createSpan = createSpanFunction({
  packagePrefix: "",
  namespace: ""
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

      const span = tryCreateSpan(request, userAgent);

      if (!span) {
        return next(request);
      }

      try {
        const response = await next(request);
        tryProcessResponse(span, response);
        return response;
      } catch (err) {
        tryProcessError(span, err);
        throw err;
      }
    }
  };
}

function tryCreateSpan(request: PipelineRequest, userAgent?: string): Span | undefined {
  try {
    const createSpanOptions: SpanOptions = {
      ...(request.tracingOptions as any)?.spanOptions,
      kind: SpanKind.CLIENT
    };

    const url = new URL(request.url);
    const path = url.pathname || "/";

    // Passing spanOptions as part of tracingOptions to maintain compatibility @azure/core-tracing@preview.13 and earlier.
    // We can pass this as a separate parameter once we upgrade to the latest core-tracing.
    const { span } = createSpan(path, {
      tracingOptions: { ...request.tracingOptions, spanOptions: createSpanOptions }
    });

    // If the span is not recording, don't do any more work.
    if (!span.isRecording()) {
      span.end();
      return undefined;
    }

    const namespaceFromContext = request.tracingOptions?.tracingContext?.getValue(
      Symbol.for("az.namespace")
    );

    if (typeof namespaceFromContext === "string") {
      span.setAttribute("az.namespace", namespaceFromContext);
    }

    span.setAttributes({
      "http.method": request.method,
      "http.url": request.url,
      requestId: request.requestId
    });

    if (userAgent) {
      span.setAttribute("http.user_agent", userAgent);
    }

    // set headers
    const spanContext = span.spanContext();
    const traceParentHeader = getTraceParentHeader(spanContext);
    if (traceParentHeader && isSpanContextValid(spanContext)) {
      request.headers.set("traceparent", traceParentHeader);
      const traceState = spanContext.traceState && spanContext.traceState.serialize();
      // if tracestate is set, traceparent MUST be set, so only set tracestate after traceparent
      if (traceState) {
        request.headers.set("tracestate", traceState);
      }
    }
    return span;
  } catch (error) {
    logger.warning(`Skipping creating a tracing span due to an error: ${error.message}`);
    return undefined;
  }
}

function tryProcessError(span: Span, err: any): void {
  try {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: err.message
    });
    if (err.statusCode) {
      span.setAttribute("http.status_code", err.statusCode);
    }
    span.end();
  } catch (error) {
    logger.warning(`Skipping tracing span processing due to an error: ${error.message}`);
  }
}

function tryProcessResponse(span: Span, response: PipelineResponse): void {
  try {
    span.setAttribute("http.status_code", response.status);
    const serviceRequestId = response.headers.get("x-ms-request-id");
    if (serviceRequestId) {
      span.setAttribute("serviceRequestId", serviceRequestId);
    }
    span.setStatus({
      code: SpanStatusCode.OK
    });
    span.end();
  } catch (error) {
    logger.warning(`Skipping tracing span processing due to an error: ${error.message}`);
  }
}
