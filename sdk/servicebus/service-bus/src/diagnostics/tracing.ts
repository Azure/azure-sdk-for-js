// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import {
  createSpanFunction,
  extractSpanContextFromTraceParentHeader,
  getTraceParentHeader,
  SpanOptions,
  setSpan,
  Span,
  SpanContext,
  SpanKind,
  context as otContext,
  setSpanContext,
} from "@azure/core-tracing";
import { ServiceBusMessage } from "../serviceBusMessage";
import { TryAddOptions } from "../modelsToBeSharedWithEventHubs";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const createSpan = createSpanFunction({
  packagePrefix: "Azure.ServiceBus",
  namespace: "Microsoft.ServiceBus",
});

/**
 * @internal
 */
export function createMessageSpan(
  operationOptions: OperationOptions,
  entityPath: string,
  host: string
): ReturnType<typeof createServiceBusSpan> {
  return createServiceBusSpan("message", operationOptions, entityPath, host, {
    kind: SpanKind.PRODUCER,
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
        // By passing spanOptions if they exist at runtime, we're backwards compatible with @azure/core-tracing@preview.13 and earlier.
        ...(operationOptions?.tracingOptions as any)?.spanOptions,
        ...additionalSpanOptions,
      },
    },
  });

  span.setAttribute("message_bus.destination", entityPath);
  span.setAttribute("peer.address", host);

  return {
    span,
    updatedOptions,
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
  applicationProperties?: { [key: string]: number | boolean | string | Date | null };
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
      spanContext: undefined,
    };
  }

  const { span: messageSpan } = createMessageSpan(options, entityPath, host);

  try {
    if (!messageSpan.isRecording()) {
      return {
        message,
        spanContext: undefined,
      };
    }

    const traceParent = getTraceParentHeader(messageSpan.spanContext());

    if (traceParent) {
      // create a copy so the original isn't modified
      message = {
        ...message,
        applicationProperties: {
          ...message.applicationProperties,
          [TRACEPARENT_PROPERTY]: traceParent,
        },
      };
    }

    return {
      message,
      spanContext: messageSpan.spanContext(),
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

/**
 * Converts TryAddOptions into the modern shape (OperationOptions) when needed.
 * (this is something we can eliminate at the next major release of SB _or_ when
 * we release with the GA version of opentelemetry).
 *
 * @internal
 */
export function convertTryAddOptionsForCompatibility(tryAddOptions: TryAddOptions): TryAddOptions {
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore: parentSpan is deprecated and this is compat code to translate it until we can get rid of it.
  const legacyParentSpanOrSpanContext = tryAddOptions.parentSpan;

  /*
    Our goal here is to offer compatibility but there is a case where a user might accidentally pass
    _both_ sets of options. We'll assume they want the OperationTracingOptions code path in that case.

    Example of accidental span passing:

    const someOptionsPassedIntoTheirFunction = {
       parentSpan: span;      // set somewhere else in their code
    }

    function takeSomeOptionsFromSomewhere(someOptionsPassedIntoTheirFunction) {

      batch.tryAddMessage(message, {
        // "runtime" blend of options from some other part of their app
        ...someOptionsPassedIntoTheirFunction,      // parentSpan comes along for the ride...

        tracingOptions: {
          // thank goodness, I'm doing this right! (thinks the developer)
          spanOptions: {
            context: context
          }
        }
      });
    }

    And now they've accidentally been opted into the legacy code path even though they think
    they're using the modern code path.

    This does kick the can down the road a bit - at some point we will be putting them in this
    situation where things looked okay but their spans are becoming unparented but we can
    try to announce this (and other changes related to tracing) in our next big rev.
  */

  if (!legacyParentSpanOrSpanContext || tryAddOptions.tracingOptions) {
    // assume that the options are already in the modern shape even if (possibly)
    // they were still specifying `parentSpan`
    return tryAddOptions;
  }

  const convertedOptions: TryAddOptions = {
    ...tryAddOptions,
    tracingOptions: {
      tracingContext: isSpan(legacyParentSpanOrSpanContext)
        ? setSpan(otContext.active(), legacyParentSpanOrSpanContext)
        : setSpanContext(otContext.active(), legacyParentSpanOrSpanContext),
    },
  };

  return convertedOptions;
}

function isSpan(possibleSpan: Span | SpanContext | undefined): possibleSpan is Span {
  if (possibleSpan == null) {
    return false;
  }

  const x = possibleSpan as Span;
  return typeof x.spanContext === "function";
}
