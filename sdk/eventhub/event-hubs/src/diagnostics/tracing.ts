// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction, SpanContext, SpanOptions } from "@azure/core-tracing";
import { Span, SpanKind } from "@opentelemetry/api";
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
        ...operationOptions?.tracingOptions?.spanOptions,
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
  // @ts-ignore parentSpan is deprecated and this is compat code to translate it until we can get rid of it.
  const possibleParentSpan = tryAddOptions.parentSpan;

  if (!possibleParentSpan) {
    // assume that the options are already in the modern shape.
    return tryAddOptions;
  }

  const convertedOptions: TryAddOptions = {
    ...tryAddOptions,
    tracingOptions: {
      spanOptions: {
        parent: isSpan(possibleParentSpan) ? possibleParentSpan.context() : possibleParentSpan
      }
    }
  };

  return convertedOptions;
}

function isSpan(possibleSpan: Span | SpanContext | undefined): possibleSpan is Span {
  if (possibleSpan == null) {
    return false;
  }

  const x = possibleSpan as Span;
  return typeof x.context === "function";
}
