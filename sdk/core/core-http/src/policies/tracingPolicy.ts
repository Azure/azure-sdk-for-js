// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import {
  createTracingClient,
  TracingClient,
  TracingContext,
  TracingSpan,
} from "@azure/core-tracing";
import { HttpOperationResponse } from "../httpOperationResponse";
import { URLBuilder } from "../url";
import { WebResourceLike } from "../webResource";
import { logger } from "../log";

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
  private tracingClient: TracingClient;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    tracingOptions: TracingPolicyOptions
  ) {
    super(nextPolicy, options);
    this.userAgent = tracingOptions.userAgent;
    this.tracingClient = createTracingClient({
      namespace: "Microsoft.CoreHttp",
      packageName: "@azure/core-http",
      packageVersion: "foo",
    });
  }

  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (!request.tracingContext) {
      return this._nextPolicy.sendRequest(request);
    }

    const { span, context } = this.tryCreateSpan(request);

    if (!span) {
      return this._nextPolicy.sendRequest(request);
    }

    try {
      const response = await this.tracingClient.withContext(context!, () =>
        this._nextPolicy.sendRequest(request)
      );
      this.tryProcessResponse(span, response);
      return response;
    } catch (err) {
      this.tryProcessError(span, err);
      throw err;
    }
  }

  tryCreateSpan(request: WebResourceLike): {
    span: TracingSpan | undefined;
    context: TracingContext | undefined;
  } {
    try {
      const path = URLBuilder.parse(request.url).getPath() || "/";

      // Passing spanOptions as part of tracingOptions to maintain compatibility @azure/core-tracing@preview.13 and earlier.
      // We can pass this as a separate parameter once we upgrade to the latest core-tracing.
      const { span, updatedOptions } = this.tracingClient.startSpan(path, {
        tracingOptions: {
          spanOptions: {
            ...(request as any).spanOptions,
            spanKind: "client",
          },
          tracingContext: request.tracingContext,
        },
      });

      // If the span is not recording, don't do any more work.
      if (!span.isRecording()) {
        span.end();
        return { context: updatedOptions.tracingOptions.tracingContext, span: undefined };
      }

      const namespaceFromContext = request.tracingContext?.getValue(Symbol.for("az.namespace"));

      if (typeof namespaceFromContext === "string") {
        span.setAttribute("az.namespace", namespaceFromContext);
      }

      span.setAttribute("http.method", request.method);
      span.setAttribute("http.url", request.url);
      span.setAttribute("requestId", request.requestId);

      if (this.userAgent) {
        span.setAttribute("http.user_agent", this.userAgent);
      }

      // set headers
      const headers = this.tracingClient.createRequestHeaders(
        updatedOptions.tracingOptions?.tracingContext
      );
      for (const header in headers) {
        request.headers.set(header, headers[header]);
      }
      return { span, context: updatedOptions.tracingOptions.tracingContext };
    } catch (error) {
      logger.warning(`Skipping creating a tracing span due to an error: ${error.message}`);
      return { context: undefined, span: undefined };
    }
  }

  private tryProcessError(span: TracingSpan, err: any): void {
    try {
      span.setStatus({
        status: "error",
        error: err,
      });

      if (err.statusCode) {
        span.setAttribute("http.status_code", err.statusCode);
      }
      span.end();
    } catch (error) {
      logger.warning(`Skipping tracing span processing due to an error: ${error.message}`);
    }
  }

  private tryProcessResponse(span: TracingSpan, response: HttpOperationResponse): void {
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
}
