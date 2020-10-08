// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: this code is a straight-copy from EventHubs. Need to merge.

import { Link, Span, SpanContext, SpanKind } from "@opentelemetry/api";
import { OperationOptions } from "@azure/core-http";
import { getTracer, OperationTracingOptions } from "@azure/core-tracing";

/**
 * NOTE: This type is intended to mirror the relevant fields and structure from @azure/core-http OperationOptions
 *
 * Options for configuring tracing and the abortSignal.
 */
export type OperationOptionsBase = Pick<OperationOptions, "abortSignal" | "tracingOptions">;

/**
 * @internal
 * @ignore
 */
export function getParentSpan(
  options?: OperationTracingOptions
): Span | SpanContext | null | undefined {
  return options?.spanOptions?.parent;
}

export function createSendSpan(
  parentSpan?: Span | SpanContext | null,
  spanContextsToLink: SpanContext[] = [],
  entityPath?: string,
  host?: string
): Span {
  const links: Link[] = spanContextsToLink.map((context) => {
    return {
      context
    };
  });
  const tracer = getTracer();
  const span = tracer.startSpan("Azure.ServiceBus.send", {
    kind: SpanKind.CLIENT,
    parent: parentSpan,
    links
  });

  span.setAttribute("az.namespace", "Microsoft.ServiceBus");
  span.setAttribute("message_bus.destination", entityPath);
  span.setAttribute("peer.address", host);

  return span;
}
/**
 * The set of options to manually propagate `Span` context for distributed tracing.
 */
export interface TryAddOptions {
  /**
   * The `Span` or `SpanContext` to use as the `parent` of any spans created while calling operations that make a request to the service.
   */
  parentSpan?: Span | SpanContext | null;
}
