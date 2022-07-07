// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TracingContext,
  TracingSpan,
  TracingSpanLink,
  TracingSpanOptions,
} from "@azure/core-tracing";
import { ConnectionContext } from "../connectionContext";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { ServiceBusReceiver } from "../receivers/receiver";
import { ServiceBusMessage, ServiceBusReceivedMessage } from "../serviceBusMessage";
import { toSpanOptions, tracingClient } from "./tracing";

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
    toSpanOptions({ entityPath, host }, "producer")
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
 * Creates a Service Bus specific span, with peer.address and message_bus.destination filled out.
 * @internal
 */
export function createServiceBusSpan(
  operationName: string,
  options: OperationOptionsBase | undefined,
  entityPath: string,
  host: string,
  additionalSpanOptions?: TracingSpanOptions
): { span: TracingSpan; updatedOptions: OperationOptionsBase } {
  const { span, updatedOptions } = tracingClient.startSpan(operationName, options, {
    ...toSpanOptions({ entityPath, host }, additionalSpanOptions?.spanKind),
    ...additionalSpanOptions,
  });

  return {
    span,
    updatedOptions,
  };
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
): TracingSpan {
  const spanLinks: TracingSpanLink[] = [];

  for (const receivedMessage of getReceivedMessages(receivedMessages)) {
    const spanContext = extractSpanContextFromServiceBusMessage(receivedMessage);

    if (spanContext == null) {
      continue;
    }

    spanLinks.push({
      tracingContext: spanContext,
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
      spanKind: "consumer",
      spanLinks,
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
  span.setStatus({ status: "success" });
  span.end();
}
