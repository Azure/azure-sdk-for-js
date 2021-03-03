// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, RestError } from "@azure/core-http";
import { CanonicalCode, Span, SpanContext, SpanKind } from "@opentelemetry/api";
import {
  createSpanFunction,
  extractSpanContextFromTraceParentHeader,
  getTraceParentHeader,
  SpanOptions
} from "@azure/core-tracing";
import { ServiceBusMessage } from "../serviceBusMessage";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const createSpan = createSpanFunction({
  packagePrefix: "Azure.ServiceBus",
  namespace: "Microsoft.ServiceBus"
});

/**
 * @internal
 */
export function getCanonicalCode(err: Error): CanonicalCode {
  if (err instanceof RestError) {
    switch (err.statusCode) {
      case 401:
        return CanonicalCode.PERMISSION_DENIED;
      case 404:
        return CanonicalCode.NOT_FOUND;
      case 412:
        return CanonicalCode.FAILED_PRECONDITION;
    }
  }

  return CanonicalCode.UNKNOWN;
}

/**
 * @internal
 */
export function createMessageSpan(
  operationOptions: OperationOptions,
  entityPath: string,
  host: string
): ReturnType<typeof createServiceBusSpan> {
  return createServiceBusSpan("message", operationOptions, entityPath, host, {
    kind: SpanKind.PRODUCER
  });
}

/**
 * Creates an EventHubs specific span, with peer.address and message_bus.destination filled out.
 * @internal
 */
export function createServiceBusSpan(
  operationName: string,
  operationOptions: OperationOptions | undefined,
  entityPath: string,
  host: string,
  additionalSpanOptions?: SpanOptions
): { span: Span; updatedOptions: OperationOptions } {
  const { span, updatedOptions } = createSpan(operationName, {
    ...operationOptions,
    tracingOptions: {
      ...operationOptions?.tracingOptions,
      spanOptions: {
        ...operationOptions?.tracingOptions?.spanOptions,
        ...additionalSpanOptions
      }
    }
  });

  span.setAttribute("message_bus.destination", entityPath);
  span.setAttribute("peer.address", host);

  return {
    span,
    updatedOptions
  };
}

/**
 * @internal
 */
export const TRACEPARENT_PROPERTY = "Diagnostic-Id";

/**
 * @hidden
 */
export interface InstrumentableMessage {
  /**
   * The application specific properties which can be
   * used for custom message metadata.
   */
  applicationProperties?: { [key: string]: number | boolean | string | Date };
}

/**
 * Instruments an AMQP message with a proper `Diagnostic-Id` for tracing.
 *
 * @hidden
 */
export function instrumentMessage<T extends InstrumentableMessage>(
  message: T,
  options: OperationOptions,
  entityPath: string,
  host: string
): {
  /**
   * If instrumentation was done, a copy of the message with
   * message.applicationProperties['Diagnostic-Id'] filled
   * out appropriately.
   */
  message: T;

  /**
   * A valid SpanContext if this message should be linked to a parent span, or undefined otherwise.
   */
  spanContext: SpanContext | undefined;
} {
  const previouslyInstrumented = Boolean(
    message.applicationProperties && message.applicationProperties[TRACEPARENT_PROPERTY]
  );

  if (previouslyInstrumented) {
    return {
      message,
      spanContext: undefined
    };
  }

  const { span: messageSpan } = createMessageSpan(options, entityPath, host);

  try {
    if (!messageSpan.isRecording()) {
      return {
        message,
        spanContext: undefined
      };
    }

    const traceParent = getTraceParentHeader(messageSpan.context());

    if (traceParent) {
      // create a copy so the original isn't modified
      message = {
        ...message,
        applicationProperties: {
          ...message.applicationProperties,
          [TRACEPARENT_PROPERTY]: traceParent
        }
      };
    }

    return {
      message,
      spanContext: messageSpan.context()
    };
  } finally {
    messageSpan.end();
  }
}

/**
 * Extracts the `SpanContext` from an `ServiceBusMessage` if the context exists.
 * @param message - An individual `ServiceBusMessage` object.
 * @internal
 */
export function extractSpanContextFromServiceBusMessage(
  message: ServiceBusMessage
): SpanContext | undefined {
  if (!message.applicationProperties || !message.applicationProperties[TRACEPARENT_PROPERTY]) {
    return;
  }

  const diagnosticId = message.applicationProperties[TRACEPARENT_PROPERTY] as string;
  return extractSpanContextFromTraceParentHeader(diagnosticId);
}
