// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getTracer, getTraceParentHeader } from "@azure/core-tracing";
import { SpanOptions, SpanKind } from "@opentelemetry/api";
import {
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions,
  BaseRequestPolicy
} from "./requestPolicy";
import { WebResourceLike } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";
import { URLBuilder } from "../url";

export interface TracingPolicyOptions {
  userAgent?: string;
}

export function tracingPolicy(tracingOptions: TracingPolicyOptions = {}): RequestPolicyFactory {
  return {
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
      return new TracingPolicy(nextPolicy, options, tracingOptions);
    }
  };
}

export class TracingPolicy extends BaseRequestPolicy {
  private userAgent?: string;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    tracingOptions: TracingPolicyOptions
  ) {
    super(nextPolicy, options);
    this.userAgent = tracingOptions.userAgent;
  }

  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (!request.spanOptions || !request.spanOptions.parent) {
      return this._nextPolicy.sendRequest(request);
    }

    // create a new span
    const tracer = getTracer();
    const spanOptions: SpanOptions = {
      ...request.spanOptions,
      kind: SpanKind.CLIENT
    };
    const path = URLBuilder.parse(request.url).getPath() || "/";
    const span = tracer.startSpan(path, spanOptions);
    span.setAttributes({
      "http.method": request.method,
      "http.url": request.url,
      requestId: request.requestId
    });

    if (this.userAgent) {
      span.setAttribute("http.user_agent", this.userAgent);
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

      const response = await this._nextPolicy.sendRequest(request);
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
}
