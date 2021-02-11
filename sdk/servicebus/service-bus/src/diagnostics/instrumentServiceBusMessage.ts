// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  extractSpanContextFromTraceParentHeader,
  getTraceParentHeader,
  getTracer
} from "@azure/core-tracing";
import { CanonicalCode, Link, Span, SpanContext, SpanKind } from "@opentelemetry/api";
import { ConnectionContext } from "../connectionContext";
import { getParentSpan, OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { ServiceBusReceiver } from "../receivers/receiver";
import { ServiceBusMessage, ServiceBusReceivedMessage } from "../serviceBusMessage";

/**
 * @hidden
 */
export const TRACEPARENT_PROPERTY = "Diagnostic-Id";

/**
 * Populates the `ServiceBusMessage` with `SpanContext` info to support trace propagation.
 * Creates and returns a copy of the passed in `ServiceBusMessage` unless the `ServiceBusMessage`
 * has already been instrumented.
 * @param message - The `ServiceBusMessage` to instrument.
 * @param span - The `Span` containing the context to propagate tracing information.
 * @hidden
 * @internal
 */
export function instrumentServiceBusMessage(
  message: ServiceBusMessage,
  span: Span
): ServiceBusMessage {
  if (message.applicationProperties && message.applicationProperties[TRACEPARENT_PROPERTY]) {
    return message;
  }

  // create a copy so the original isn't modified
  message = { ...message, applicationProperties: { ...message.applicationProperties } };

  const traceParent = getTraceParentHeader(span.context());
  if (traceParent) {
    message.applicationProperties![TRACEPARENT_PROPERTY] = traceParent;
  }

  return message;
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
 * Provides an iterable over messages, whether it is a single message or multiple
 * messages.
 *
 * @param receivedMessages - A single message or a set of messages
 * @internal
 */
function* getReceivedMessages(
  receivedMessages: ServiceBusReceivedMessage | ServiceBusReceivedMessage[]
): Iterable<ServiceBusReceivedMessage> {
  if (!Array.isArray(receivedMessages)) {
    yield receivedMessages;
  } else {
    for (const message of receivedMessages) {
      yield message;
    }
  }
}

/**
 * A span that encompasses the period when the message has been received and
 * is being processed.
 *
 * NOTE: The amount of time the user would be considered processing the message is
 * not always clear - in that case the span will have a very short lifetime
 * since we'll start the span when we receive the message and end it when we
 * give the message to the user.
 *
 * @internal
 */
export function createProcessingSpan(
  receivedMessages: ServiceBusReceivedMessage | ServiceBusReceivedMessage[],
  // NOTE: the connectionConfig also has an entityPath property but that only
  // represents the optional entityPath in their connection string which is NOT
  // what we want for tracing.
  receiver: Pick<ServiceBusReceiver, "entityPath">,
  connectionConfig: Pick<ConnectionContext["config"], "host">,
  options?: OperationOptionsBase
): Span {
  const links: Link[] = [];

  for (const receivedMessage of getReceivedMessages(receivedMessages)) {
    const spanContext = extractSpanContextFromServiceBusMessage(receivedMessage);

    if (spanContext == null) {
      continue;
    }

    links.push({
      context: spanContext,
      attributes: {
        enqueuedTime: receivedMessage.enqueuedTimeUtc?.getTime()
      }
    });
  }

  const span = getTracer().startSpan("Azure.ServiceBus.process", {
    kind: SpanKind.CONSUMER,
    links,
    parent: getParentSpan(options?.tracingOptions)
  });

  span.setAttributes({
    "az.namespace": "Microsoft.ServiceBus",
    "message_bus.destination": receiver.entityPath,
    "peer.address": connectionConfig.host
  });

  return span;
}

/**
 * Creates and immediately ends a processing span. Used when
 * the 'processing' occurs outside of our control so we don't
 * know the scope.
 *
 * @internal
 */
export function createAndEndProcessingSpan(
  receivedMessages: ServiceBusReceivedMessage | ServiceBusReceivedMessage[],
  receiver: Pick<ServiceBusReceiver, "entityPath">,
  connectionConfig: Pick<ConnectionContext["config"], "host">,
  options?: OperationOptionsBase
): void {
  const span = createProcessingSpan(receivedMessages, receiver, connectionConfig, options);
  span.setStatus({ code: CanonicalCode.OK });
  span.end();
}
