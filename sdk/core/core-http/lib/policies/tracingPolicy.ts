// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { getTracer, getTraceParentHeader } from "@azure/core-tracing";
import {
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions,
  BaseRequestPolicy
} from "./requestPolicy";
import { WebResource } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";

export function tracingPolicy(): RequestPolicyFactory {
  return {
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
      return new TracingPolicy(nextPolicy, options);
    }
  };
}

export class TracingPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (!request.spanOptions || !request.spanOptions.parent) {
      return this._nextPolicy.sendRequest(request);
    }

    // create a new span
    const tracer = getTracer();
    const span = tracer.startSpan("core-http", request.spanOptions);

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
      span.end();
      return response;
    } catch (err) {
      span.end();
      throw err;
    }
  }
}
