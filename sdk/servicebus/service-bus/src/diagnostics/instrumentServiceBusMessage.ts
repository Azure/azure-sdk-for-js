// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  extractSpanContextFromTraceParentHeader,
  SpanStatusCode,
  Link,
  Span,
  SpanContext,
  SpanKind,
} from "@azure/core-tracing";
import { ConnectionContext } from "../connectionContext";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { ServiceBusReceiver } from "../receivers/receiver";
import { ServiceBusMessage, ServiceBusReceivedMessage } from "../serviceBusMessage";
import { createServiceBusSpan } from "./tracing";

/**
 * @hidden
 */
export const TRACEPARENT_PROPERTY = "Diagnostic-Id";

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
        enqueuedTime: receivedMessage.enqueuedTimeUtc?.getTime(),
      },
    });
  }

  const { span } = createServiceBusSpan(
    "process",
    options,
    receiver.entityPath,
    connectionConfig.host,
    {
      kind: SpanKind.CONSUMER,
      links,
    }
  );

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
  span.setStatus({ code: SpanStatusCode.OK });
  span.end();
}
