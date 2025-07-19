// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import {
  type TracingClient,
  type TracingContext,
  type TracingSpan,
  createTracingClient,
} from "@azure/core-tracing";
import { getErrorMessage } from "@azure/core-util";
import { SDK_VERSION } from "./constants.js";
import { logger } from "./logger.js";
import {
  getRequestBody,
  getSpanName,
  onStartTracing,
  tryProcessError,
  tryProcessResponse,
} from "./tracingHelper.js";

/**
 * The programmatic identifier of the tracingPolicy.
 */
export const tracingPolicyName = "inferenceTracingPolicy";

/**
 * A simple policy to create OpenTelemetry Spans for each request made by the pipeline
 * that has SpanOptions with a parent.
 * Requests made without a parent Span will not be recorded.
 */
export function tracingPolicy(): PipelinePolicy {
  const tracingClient = createTracingClient({
    namespace: "Microsoft.CognitiveServices",
    packageName: "@azure/ai-inference-rest",
    packageVersion: SDK_VERSION,
  });
  return {
    name: tracingPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const url = new URL(request.url);
      if (
        !tracingClient ||
        !url.href.endsWith("/chat/completions") ||
        getRequestBody(request)?.body?.stream
      ) {
        return next(request);
      }

      const { span, tracingContext } = tryCreateSpan(tracingClient, request) ?? {};

      if (!span || !tracingContext) {
        return next(request);
      }

      try {
        request.tracingOptions ??= {};
        request.tracingOptions.tracingContext = tracingContext;

        onStartTracing(span, request, request.url);
        const response = await tracingClient.withContext(tracingContext, next, request);
        tryProcessResponse(span, response);
        return response;
      } catch (err: any) {
        tryProcessError(span, err);
        throw err;
      } finally {
        span.end();
      }
    },
  };
}

function tryCreateSpan(
  tracingClient: TracingClient,
  request: PipelineRequest,
): { span: TracingSpan; tracingContext: TracingContext } | undefined {
  try {
    // As per spec, we do not need to differentiate between HTTP and HTTPS in span name.
    const { span, updatedOptions } = tracingClient.startSpan(
      getSpanName(request),
      { tracingOptions: request.tracingOptions },
      {
        spanKind: "client",
      },
    );

    return { span, tracingContext: updatedOptions.tracingOptions.tracingContext };
  } catch (e: any) {
    logger.warning(`Skipping creating a tracing span due to an error: ${getErrorMessage(e)}`);
    return undefined;
  }
}

