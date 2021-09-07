// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createSpanFunction,
  SpanContext,
  SpanOptions,
  setSpan,
  setSpanContext,
  Span,
  SpanKind,
  context
} from "@azure/core-tracing";
import { TryAddOptions } from "../eventDataBatch";
import { EventHubConnectionConfig } from "../eventhubConnectionConfig";
import { OperationOptions } from "../util/operationOptions";

const _createSpan = createSpanFunction({
  namespace: "Microsoft.EventHub",
  packagePrefix: "Azure.EventHubs"
});

/**
 * Creates an EventHubs specific span, with peer.address and message_bus.destination filled out.
 * @internal
 */
export function createEventHubSpan(
  operationName: string,
  operationOptions: OperationOptions | undefined,
  connectionConfig: Pick<EventHubConnectionConfig, "entityPath" | "host">,
  additionalSpanOptions?: SpanOptions
): { span: Span; updatedOptions: OperationOptions } {
  const { span, updatedOptions } = _createSpan(operationName, {
    ...operationOptions,
    tracingOptions: {
      ...operationOptions?.tracingOptions,
      spanOptions: {
        // By passing spanOptions if they exist at runtime, we're backwards compatible with @azure/core-tracing@preview.13 and earlier.
        ...(operationOptions?.tracingOptions as any)?.spanOptions,
        ...additionalSpanOptions
      }
    }
  });

  span.setAttribute("message_bus.destination", connectionConfig.entityPath);
  span.setAttribute("peer.address", connectionConfig.host);

  return {
    span,
    updatedOptions
  };
}

/**
 * @internal
 */
export function createMessageSpan(
  operationOptions: OperationOptions,
  eventHubConfig: Pick<EventHubConnectionConfig, "entityPath" | "host">
): ReturnType<typeof createEventHubSpan> {
  return createEventHubSpan("message", operationOptions, eventHubConfig, {
    kind: SpanKind.PRODUCER
  });
}

/**
 * Converts TryAddOptions into the modern shape (OperationOptions) when needed.
 * (this is something we can eliminate at the next major release of EH _or_ when
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
        ? setSpan(context.active(), legacyParentSpanOrSpanContext)
        : setSpanContext(context.active(), legacyParentSpanOrSpanContext)
    }
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
