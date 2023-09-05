// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import {
  Span,
  SpanKind,
  SpanStatusCode,
  createSpanFunction,
  getTraceParentHeader,
  isSpanContextValid,
} from "@azure/core-tracing";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { logger } from "../log";

const createSpan = createSpanFunction({
  packagePrefix: "",
  namespace: "",
});

/**
 * Options to customize the tracing policy.
 */
export interface TracingPolicyOptions {
  /**
   * User agent used to better identify the outgoing requests traced by the tracing policy.
   */
  userAgent?: string;
}

/**
 * Creates a policy that wraps outgoing requests with a tracing span.
 * @param tracingOptions - Tracing options.
 * @returns An instance of the {@link TracingPolicy} class.
 */
export function tracingPolicy(tracingOptions: TracingPolicyOptions = {}): RequestPolicyFactory {
  return {
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
      return new TracingPolicy(nextPolicy, options, tracingOptions);
    },
  };
}

/**
 * A policy that wraps outgoing requests with a tracing span.
 */
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
    if (!request.tracingContext) {
      return this._nextPolicy.sendRequest(request);
    }

    const span = this.tryCreateSpan(request);

    if (!span) {
      return this._nextPolicy.sendRequest(request);
    }

    try {
      const response = await this._nextPolicy.sendRequest(request);
      this.tryProcessResponse(span, response);
      return response;
    } catch (err: any) {
      this.tryProcessError(span, err);
      throw err;
    }
  }

  tryCreateSpan(request: WebResourceLike): Span | undefined {
    try {
      // Passing spanOptions as part of tracingOptions to maintain compatibility @azure/core-tracing@preview.13 and earlier.
      // We can pass this as a separate parameter once we upgrade to the latest core-tracing.
      const { span } = createSpan(`HTTP ${request.method}`, {
        tracingOptions: {
          spanOptions: {
            ...(request as any).spanOptions,
            kind: SpanKind.CLIENT,
          },
          tracingContext: request.tracingContext,
        },
      });

      // If the span is not recording, don't do any more work.
      if (!span.isRecording()) {
        span.end();
        return undefined;
      }

      const namespaceFromContext = request.tracingContext?.getValue(Symbol.for("az.namespace"));

      if (typeof namespaceFromContext === "string") {
        span.setAttribute("az.namespace", namespaceFromContext);
      }

      span.setAttributes({
        "http.method": request.method,
        "http.url": request.url,
        requestId: request.requestId,
      });

      if (this.userAgent) {
        span.setAttribute("http.user_agent", this.userAgent);
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
    } catch (error: any) {
      logger.warning(`Skipping creating a tracing span due to an error: ${error.message}`);
      return undefined;
    }
  }

  private tryProcessError(span: Span, err: any): void {
    try {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: err.message,
      });

      if (err.statusCode) {
        span.setAttribute("http.status_code", err.statusCode);
      }
      span.end();
    } catch (error: any) {
      logger.warning(`Skipping tracing span processing due to an error: ${error.message}`);
    }
  }

  private tryProcessResponse(span: Span, response: HttpOperationResponse): void {
    try {
      span.setAttribute("http.status_code", response.status);
      const serviceRequestId = response.headers.get("x-ms-request-id");
      if (serviceRequestId) {
        span.setAttribute("serviceRequestId", serviceRequestId);
      }
      span.setStatus({
        code: SpanStatusCode.OK,
      });
      span.end();
    } catch (error: any) {
      logger.warning(`Skipping tracing span processing due to an error: ${error.message}`);
    }
  }
}
