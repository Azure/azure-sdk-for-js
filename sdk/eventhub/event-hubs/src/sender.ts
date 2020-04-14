// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventData } from "./eventData";
import { EventHubSender } from "./eventHubSender";
import { EventHubProducerOptions } from "../src/models/private";
import { SendOptions, CreateBatchOptions } from "../src/models/public";
import { ConnectionContext } from "./connectionContext";
import { logger, logErrorStackTrace } from "./log";
import { throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing } from "./util/error";
import { EventDataBatch, isEventDataBatch, EventDataBatchImpl } from "./eventDataBatch";
import { getTracer } from "@azure/core-tracing";
import { SpanContext, Span, SpanKind, CanonicalCode, Link } from "@opentelemetry/types";
import { instrumentEventData, TRACEPARENT_PROPERTY } from "./diagnostics/instrumentEventData";
import { createMessageSpan } from "./diagnostics/messageSpan";
import { getParentSpan } from "./util/operationOptions";

/**
 * A producer responsible for sending events to an Event Hub.
 * To create a producer use the `createProducer()` method on your `EventHubClient`.
 * You can pass the below in the `options` when creating a producer.
 * - `partitionId`  : The identifier of the partition that the producer can be bound to.
 * - `retryOptions` : The retry options used to govern retry attempts when an issue is encountered while sending events.
 * A simple usage can be `{ "maxRetries": 4 }`.
 *
 * If `partitionId` is specified when creating a producer, all event data sent using the producer
 * will be sent to the specified partition.
 * Otherwise, they are automatically routed to an available partition by the Event Hubs service.
 *
 * Automatic routing of partitions is recommended because:
 *  - The sending of events will be highly available.
 *  - The event data will be evenly distributed among all available partitions.
 *
 * @class
 * @internal
 * @ignore
 */
export class EventHubProducer {
  /**
   * @property Describes the amqp connection context for the Client.
   */
  private _context: ConnectionContext;
  /**
   * @property Denotes if close() was called on this sender
   */
  private _isClosed: boolean = false;

  private _senderOptions: EventHubProducerOptions;

  private _eventHubSender: EventHubSender | undefined;

  private _eventHubName: string;
  private _endpoint: string;

  /**
   * @property Returns `true` if either the producer or the client that created it has been closed.
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed || this._context.wasConnectionCloseCalled;
  }

  /**
   * EventHubProducer should not be constructed using `new EventHubProduer()`
   * Use the `createProducer()` method on your `EventHubClient` instead.
   * @constructor
   * @internal
   * @ignore
   */
  constructor(
    eventHubName: string,
    endpoint: string,
    context: ConnectionContext,
    options?: EventHubProducerOptions
  ) {
    this._context = context;
    this._senderOptions = options || {};
    const partitionId =
      this._senderOptions.partitionId != undefined
        ? String(this._senderOptions.partitionId)
        : undefined;
    this._eventHubSender = EventHubSender.create(this._context, partitionId);
    this._eventHubName = eventHubName;
    this._endpoint = endpoint;
  }

  /**
   * Creates an instance of `EventDataBatch` to which one can add events until the maximum supported size is reached.
   * The batch can be passed to the `send()` method of the `EventHubProducer` to be sent to Azure Event Hubs.
   * @param options  A set of options to configure the behavior of the batch.
   * - `partitionKey`  : A value that is hashed to produce a partition assignment.
   * Not applicable if the `EventHubProducer` was created using a `partitionId`.
   * - `maxSizeInBytes`: The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   * - `abortSignal`   : A signal the request to cancel the send operation.
   * @returns Promise<EventDataBatch>
   */
  async createBatch(options?: CreateBatchOptions): Promise<EventDataBatch> {
    this._throwIfSenderOrConnectionClosed();
    if (!options) {
      options = {};
    }
    // throw an error if partition key and partition id are both defined
    if (
      typeof options.partitionKey === "string" &&
      typeof this._senderOptions.partitionId === "string"
    ) {
      const error = new Error(
        "Creating a batch with partition key is not supported when using producers that were created using a partition id."
      );
      logger.warning(
        "[%s] Creating a batch with partition key is not supported when using producers that were created using a partition id. %O",
        this._context.connectionId,
        error
      );
      logErrorStackTrace(error);
      throw error;
    }

    let maxMessageSize = await this._eventHubSender!.getMaxMessageSize({
      retryOptions: this._senderOptions.retryOptions,
      abortSignal: options.abortSignal
    });
    if (options.maxSizeInBytes) {
      if (options.maxSizeInBytes > maxMessageSize) {
        const error = new Error(
          `Max message size (${options.maxSizeInBytes} bytes) is greater than maximum message size (${maxMessageSize} bytes) on the AMQP sender link.`
        );
        logger.warning(
          `[${this._context.connectionId}] Max message size (${options.maxSizeInBytes} bytes) is greater than maximum message size (${maxMessageSize} bytes) on the AMQP sender link. ${error}`
        );
        logErrorStackTrace(error);
        throw error;
      }
      maxMessageSize = options.maxSizeInBytes;
    }
    return new EventDataBatchImpl(
      this._context,
      maxMessageSize,
      options.partitionKey,
      options.partitionId
    );
  }

  /**
   * Send one or more of events to the associated Event Hub.
   *
   * @param eventData  An individual `EventData` object, or an array of `EventData` objects or an
   * instance of `EventDataBatch`.
   * @param options The set of options that can be specified to influence the way in which
   * events are sent to the associated Event Hub.
   * - `partitionKey` : A value that is hashed to produce a partition assignment.
   * Not applicable if the `EventHubProducer` was created using a `partitionId`.
   * - `abortSignal`  : A signal the request to cancel the send operation.
   *
   * @returns Promise<void>
   * @throws AbortError if the operation is cancelled via the abortSignal.
   * @throws MessagingError if an error is encountered while sending a message.
   * @throws TypeError if a required parameter is missing.
   * @throws Error if the underlying connection or sender has been closed.
   * @throws Error if a partitionKey is provided when the producer was created with a partitionId.
   * @throws Error if batch was created with partitionKey different than the one provided in the options.
   * Create a new producer using the EventHubClient createProducer method.
   */
  async send(
    eventData: EventData | EventData[] | EventDataBatch,
    options: SendOptions = {}
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(this._context.connectionId, "send", "eventData", eventData);
    if (Array.isArray(eventData) && eventData.length === 0) {
      logger.info(`[${this._context.connectionId}] Empty array was passed. No events to send.`);
      return;
    }
    if (isEventDataBatch(eventData) && eventData.count === 0) {
      logger.info(`[${this._context.connectionId}] Empty batch was passsed. No events to send.`);
      return;
    }
    if (!Array.isArray(eventData) && !isEventDataBatch(eventData)) {
      eventData = [eventData];
    }

    // link message span contexts
    let spanContextsToLink: SpanContext[] = [];
    if (Array.isArray(eventData)) {
      for (let i = 0; i < eventData.length; i++) {
        const event = eventData[i];
        if (!event.properties || !event.properties[TRACEPARENT_PROPERTY]) {
          const messageSpan = createMessageSpan(getParentSpan(options));
          // since these message spans are created from same context as the send span,
          // these message spans don't need to be linked.
          // replace the original event with the instrumented one
          eventData[i] = instrumentEventData(eventData[i], messageSpan);
          messageSpan.end();
        }
      }
    } else if (isEventDataBatch(eventData)) {
      spanContextsToLink = eventData._messageSpanContexts;
    }

    const sendSpan = this._createSendSpan(getParentSpan(options), spanContextsToLink);

    try {
      const result = await this._eventHubSender!.send(eventData, {
        ...this._senderOptions,
        ...options
      });
      sendSpan.setStatus({ code: CanonicalCode.OK });
      return result;
    } catch (err) {
      sendSpan.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: err.message
      });
      throw err;
    } finally {
      sendSpan.end();
    }
  }

  /**
   * Closes the underlying AMQP sender link.
   * Once closed, the producer cannot be used for any further operations.
   * Use the `createProducer` function on the EventHubClient to instantiate a new EventHubProducer.
   *
   * @returns
   * @throws Error if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    try {
      if (this._context.connection && this._context.connection.isOpen() && this._eventHubSender) {
        await this._eventHubSender.close();
        this._eventHubSender = undefined;
      }
      this._isClosed = true;
    } catch (err) {
      logger.warning(
        "[%s] An error occurred while closing the Sender for %s: %O",
        this._context.connectionId,
        this._context.config.entityPath,
        err
      );
      logErrorStackTrace(err);
      throw err;
    }
  }

  private _createSendSpan(
    parentSpan?: Span | SpanContext,
    spanContextsToLink: SpanContext[] = []
  ): Span {
    const links: Link[] = spanContextsToLink.map((spanContext) => {
      return {
        spanContext
      };
    });
    const tracer = getTracer();
    const span = tracer.startSpan("Azure.EventHubs.send", {
      kind: SpanKind.CLIENT,
      parent: parentSpan,
      links
    });

    span.setAttribute("az.namespace", "Microsoft.EventHub");
    span.setAttribute("message_bus.destination", this._eventHubName);
    span.setAttribute("peer.address", this._endpoint);

    return span;
  }

  private _throwIfSenderOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context);
    if (this.isClosed) {
      const errorMessage =
        `The EventHubProducer for "${this._context.config.entityPath}" has been closed and can no longer be used. ` +
        `Please create a new EventHubProducer using the "createProducer" function on the EventHubClient.`;
      const error = new Error(errorMessage);
      logger.warning(`[${this._context.connectionId}] %O`, error);
      logErrorStackTrace(error);
      throw error;
    }
  }
}
