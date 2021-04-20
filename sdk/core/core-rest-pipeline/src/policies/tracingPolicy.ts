// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getTraceParentHeader,
  OperationTracingOptions,
  createSpanFunction
} from "@azure/core-tracing";
import { SpanKind } from "@azure/core-tracing";
import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { URL } from "../util/url";
import { getUserAgentValue } from "../util/userAgent";

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

      // create a new span
      const tracingOptions: OperationTracingOptions = {
        ...request.tracingOptions,
        spanOptions: {
          ...request.tracingOptions.spanOptions,
          kind: SpanKind.CLIENT
        }
      };

      const url = new URL(request.url);
      const path = url.pathname || "/";

      const { span } = createSpan(path, { tracingOptions });

      span.setAttributes({
        "http.method": request.method,
        "http.url": request.url,
        requestId: request.requestId
      });

      if (userAgent) {
        span.setAttribute("http.user_agent", userAgent);
      }

      try {
        // set headers
        const spanContext = span.context();
        const traceParentHeader = getTraceParentHeader(spanContext);
        if (traceParentHeader) {
          request.headers.set("traceparent", traceParentHeader);
          const traceState = spanContext.traceState && spanContext.traceState.serialize();
          // if tracestate is set, traceparent MUST be set, so only set tracestate after traceparent
          if (traceState) {
            request.headers.set("tracestate", traceState);
          }
        }

        const response = await next(request);
        span.setAttribute("http.status_code", response.status);
        const serviceRequestId = response.headers.get("x-ms-request-id");
        if (serviceRequestId) {
          span.setAttribute("serviceRequestId", serviceRequestId);
        }
        span.end();
        return response;
      } catch (err) {
        span.end();
        throw err;
      }
    }
  };
}
