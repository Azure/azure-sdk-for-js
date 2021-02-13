// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: this code is a straight-copy from EventHubs. Need to merge.

import { CanonicalCode, Link, Span, SpanContext, SpanKind } from "@opentelemetry/api";
import { OperationOptions } from "@azure/core-http";
import { getTracer, OperationTracingOptions } from "@azure/core-tracing";

/**
 * NOTE: This type is intended to mirror the relevant fields and structure from `@azure/core-http` OperationOptions
 *
 * Options for configuring tracing and the abortSignal.
 * (This interface is exactly same as the GetTokenOptions from `@azure/core-auth`.)
 */
export type OperationOptionsBase = Pick<OperationOptions, "abortSignal" | "tracingOptions"> & {
  /**
   * Options used when creating and sending HTTP requests for this operation.
   * (Not applicable for the AMQP operations.)
   */
  requestOptions?: {
    /**
     * The number of milliseconds a request can take before automatically being terminated.
     * If provided, this timeout will be passed/used for the auth operations such as
     * obtaining the token while using `@azure/identity` and Azure AD credentials.
     */
    timeout?: number;
  };
};

/**
 * @internal
 */
export function getParentSpan(
  options?: OperationTracingOptions
): Span | SpanContext | null | undefined {
  return options?.spanOptions?.parent;
}

/**
 * @internal
 *
 */
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

/**
 * Runs the `fn` passed in and marks the span as completed with an error (and the
 * corresponding message) or as OK.
 *
 * @hidden
 * @internal
 */
export async function trace<T>(fn: () => Promise<T>, span: Span): Promise<T> {
  try {
    const ret = await fn();
    span.setStatus({ code: CanonicalCode.OK });
    return ret;
  } catch (err) {
    span.setStatus({
      code: CanonicalCode.UNKNOWN,
      message: err.message
    });
    throw err;
  } finally {
    span.end();
  }
}
