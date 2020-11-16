// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestOptionsBase } from "@azure/core-http";
import { getTracer } from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";

/**
 * Creates a span using the tracer that was set by the user.
 * @param {string} methodName The name of the method creating the span.
 * @param {RequestOptionsBase} [options] The options for the underlying HTTP request.
 */
export function createSpan(methodName: string, requestOptions?: RequestOptionsBase): Span {
  const tracer = getTracer();
  const span = tracer.startSpan(methodName, requestOptions && requestOptions.spanOptions);
  span.setAttribute("az.namespace", "Microsoft.KeyVault");
  return span;
}

/**
 * Returns updated HTTP options with the given span as the parent of future spans,
 * if applicable.
 * @param {Span} span The span for the current operation.
 * @param {RequestOptionsBase} [options] The options for the underlying HTTP request.
 */
export function setParentSpan(span: Span, options: RequestOptionsBase = {}): RequestOptionsBase {
  if (span.isRecording()) {
    const spanOptions = options.spanOptions || {};
    return {
      ...options,
      spanOptions: {
        ...spanOptions,
        parent: span.context(),
        attributes: {
          ...spanOptions.attributes,
          "az.namespace": "Microsoft.KeyVault"
        }
      }
    };
  } else {
    return options;
  }
}
