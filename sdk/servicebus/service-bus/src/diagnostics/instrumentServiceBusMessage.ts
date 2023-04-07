// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TracingContext, TracingSpanLink, TracingSpanOptions } from "@azure/core-tracing";
import { ConnectionContext } from "../connectionContext";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { ServiceBusReceiver } from "../receivers/receiver";
import { ServiceBusMessage, ServiceBusReceivedMessage } from "../serviceBusMessage";
import { MessagingOperationNames, toSpanOptions, tracingClient } from "./tracing";

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
  options: OperationOptionsBase,
  entityPath: string,
  host: string,
  operation: MessagingOperationNames
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
  spanContext: TracingContext | undefined;
} {
  // check if the event has already been instrumented
  const previouslyInstrumented = Boolean(message.applicationProperties?.[TRACEPARENT_PROPERTY]);

  if (previouslyInstrumented) {
    return {
      message,
      spanContext: undefined,
    };
  }

  const { span: messageSpan, updatedOptions } = tracingClient.startSpan(
    "message",
    options,
    toSpanOptions({ entityPath, host }, operation, "producer")
  );

  try {
    if (!messageSpan.isRecording()) {
      return {
        message,
        spanContext: undefined,
      };
    }

    const traceParent = tracingClient.createRequestHeaders(
      updatedOptions.tracingOptions?.tracingContext
    )["traceparent"];

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
      spanContext: updatedOptions.tracingOptions?.tracingContext,
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
): TracingContext | undefined {
  if (!message.applicationProperties || !message.applicationProperties[TRACEPARENT_PROPERTY]) {
    return;
  }

  const diagnosticId = message.applicationProperties[TRACEPARENT_PROPERTY] as string;
  return tracingClient.parseTraceparentHeader(diagnosticId);
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
 * @internal
 */
export function toProcessingSpanOptions(
  receivedMessages: ServiceBusReceivedMessage | ServiceBusReceivedMessage[],
  receiver: Pick<ServiceBusReceiver, "entityPath">,
  connectionConfig: Pick<ConnectionContext["config"], "host">,
  operation: MessagingOperationNames
): TracingSpanOptions {
  const spanLinks: TracingSpanLink[] = [];
  for (const receivedMessage of getReceivedMessages(receivedMessages)) {
    const tracingContext = extractSpanContextFromServiceBusMessage(receivedMessage);
    if (tracingContext) {
      spanLinks.push({
        tracingContext,
        attributes: {
          enqueuedTime: receivedMessage.enqueuedTimeUtc?.getTime(),
        },
      });
    }
  }
  return {
    spanLinks,
    spanKind: "consumer",
    ...toSpanOptions({ host: connectionConfig.host, entityPath: receiver.entityPath }, operation),
  };
}
