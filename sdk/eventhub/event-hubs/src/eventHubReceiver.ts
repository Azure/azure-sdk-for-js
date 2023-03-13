// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortError, AbortSignalLike } from "@azure/abort-controller";
import {
  Constants,
  MessagingError,
  RetryOperationType,
  StandardAbortMessage,
  retry,
  translate,
  RetryConfig,
} from "@azure/core-amqp";
import {
  EventContext,
  Receiver,
  ReceiverOptions as RheaReceiverOptions,
  Source,
  types,
} from "rhea-promise";
import { EventDataInternal, ReceivedEventData, fromRheaMessage } from "./eventData";
import { EventPosition, getEventPositionFilter } from "./eventPosition";
import { logErrorStackTrace, logger } from "./log";
import { ConnectionContext } from "./connectionContext";
import { EventHubConsumerOptions } from "./models/private";
import { LinkEntity } from "./linkEntity";
import { getRetryAttemptTimeoutInMs } from "./util/retries";
import { createAbortablePromise } from "@azure/core-util";

/**
 * A set of information about the last enqueued event of a partition, as observed by the consumer as
 * events are received from the Event Hubs service
 */
export interface LastEnqueuedEventProperties {
  /**
   * The sequence number of the event that was last enqueued into the Event Hub partition from which
   * this event was received.
   */
  sequenceNumber?: number;
  /**
   * The date and time, in UTC, that the last event was enqueued into the Event Hub partition from
   * which this event was received.
   */
  enqueuedOn?: Date;
  /**
   * The offset of the event that was last enqueued into the Event Hub partition from which
   * this event was received.
   */
  offset?: string;
  /**
   * The date and time, in UTC, that the last event was retrieved from the Event Hub partition.
   */
  retrievedOn?: Date;
}

/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @internal
 */
export class EventHubReceiver extends LinkEntity {
  /**
   * The Receiver ownerLevel.
   */
  private readonly ownerLevel?: number;
  /**
   * The event position in the partition at which to start receiving messages.
   */
  private readonly eventPosition: EventPosition;
  /**
   * Optional properties that can be set while creating
   * the EventHubConsumer.
   */
  private readonly options: EventHubConsumerOptions;
  /**
   * The RHEA AMQP-based receiver link.
   */
  private _receiver?: Receiver;
  /**
   * A callback to be called on errors.
   */
  private _onError?: (error: MessagingError | Error) => void;
  /**
   * The queue of received messages that have not yet been returned to the customer.
   */
  private readonly queue: ReceivedEventData[] = [];
  /**
   * Indicates whether the link is in the process of connecting
   * (establishing) itself. Default value: `false`.
   */
  private isConnecting: boolean = false;
  /**
   * Returns sequenceNumber of the last event received from the service. This will not match the
   * last event received by `EventHubConsumer` when the `queue` is not empty
   */
  checkpoint: number = -1;
  /**
   * Indicates if the receiver has been closed.
   */
  isClosed: boolean = false;
  /**
   * The last enqueued event information. This property will only
   * be enabled when `trackLastEnqueuedEventProperties` option is set to true
   */
  readonly lastEnqueuedEventProperties: LastEnqueuedEventProperties;

  /**
   * Instantiates a receiver that can be used to receive events over an AMQP receiver link in
   * either batching or streaming mode.
   * @param context -        The connection context corresponding to the EventHubClient instance
   * @param consumerGroup -  The consumer group from which the receiver should receive events from.
   * @param partitionId -    The Partition ID from which to receive.
   * @param eventPosition -  The position in the stream from where to start receiving events.
   * @param options -      Receiver options.
   */
  constructor(
    context: ConnectionContext,
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options: EventHubConsumerOptions = {}
  ) {
    super(
      context,
      context.config.getReceiverAddress(partitionId, consumerGroup),
      context.config.getReceiverAddress(partitionId, consumerGroup),
      context.config.getReceiverAudience(partitionId, consumerGroup)
    );
    this.ownerLevel = options.ownerLevel;
    this.eventPosition = eventPosition;
    this.options = options;
    this.lastEnqueuedEventProperties = {};
  }

  private _onAmqpMessage(context: EventContext): void {
    if (!context.message) {
      return;
    }
    const data: EventDataInternal = fromRheaMessage(
      context.message,
      !!this.options.skipParsingBodyAsJson
    );
    const rawMessage = data.getRawAmqpMessage();
    const receivedEventData: ReceivedEventData = {
      body: data.body,
      properties: data.properties,
      offset: data.offset!,
      sequenceNumber: data.sequenceNumber!,
      enqueuedTimeUtc: data.enqueuedTimeUtc!,
      partitionKey: data.partitionKey!,
      systemProperties: data.systemProperties,
      getRawAmqpMessage() {
        return rawMessage;
      },
    };
    if (data.correlationId != null) {
      receivedEventData.correlationId = data.correlationId;
    }
    if (data.contentType != null) {
      receivedEventData.contentType = data.contentType;
    }
    if (data.messageId != null) {
      receivedEventData.messageId = data.messageId;
    }

    this.checkpoint = receivedEventData.sequenceNumber;

    if (this.options.trackLastEnqueuedEventProperties && data) {
      this.lastEnqueuedEventProperties.sequenceNumber = data.lastSequenceNumber;
      this.lastEnqueuedEventProperties.enqueuedOn = data.lastEnqueuedTime;
      this.lastEnqueuedEventProperties.offset = data.lastEnqueuedOffset;
      this.lastEnqueuedEventProperties.retrievedOn = data.retrievalTime;
    }

    this.queue.push(receivedEventData);
  }

  private _onAmqpError(context: EventContext): void {
    const rheaReceiver = this._receiver || context.receiver;
    const amqpError = rheaReceiver && rheaReceiver.error;
    logger.verbose(
      "[%s] 'receiver_error' event occurred on the receiver '%s' with address '%s'. " +
        "The associated error is: %O",
      this._context.connectionId,
      this.name,
      this.address,
      amqpError
    );

    if (this._onError && amqpError) {
      const error = translate(amqpError);
      logErrorStackTrace(error);
      this._onError(error);
    }
  }

  private _onAmqpSessionError(context: EventContext): void {
    const sessionError = context.session && context.session.error;
    logger.verbose(
      "[%s] 'session_error' event occurred on the session of receiver '%s' with address '%s'. " +
        "The associated error is: %O",
      this._context.connectionId,
      this.name,
      this.address,
      sessionError
    );

    if (this._onError && sessionError) {
      const error = translate(sessionError);
      logErrorStackTrace(error);
      this._onError(error);
    }
  }

  private async _onAmqpClose(context: EventContext): Promise<void> {
    const rheaReceiver = this._receiver || context.receiver;
    logger.verbose(
      "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s'. " +
        "Value for isItselfClosed on the receiver is: '%s' " +
        "Value for isConnecting on the session is: '%s'.",
      this._context.connectionId,
      this.name,
      this.address,
      rheaReceiver ? rheaReceiver.isItselfClosed().toString() : undefined,
      this.isConnecting
    );
    if (rheaReceiver && !this.isConnecting) {
      // Call close to clean up timers & other resources
      await rheaReceiver.close().catch((err) => {
        logger.verbose(
          "[%s] Error when closing receiver [%s] after 'receiver_close' event: %O",
          this._context.connectionId,
          this.name,
          err
        );
      });
    }
  }

  private async _onAmqpSessionClose(context: EventContext): Promise<void> {
    const rheaReceiver = this._receiver || context.receiver;
    logger.verbose(
      "[%s] 'session_close' event occurred on the session of receiver '%s' with address '%s'. " +
        "Value for isSessionItselfClosed on the session is: '%s' " +
        "Value for isConnecting on the session is: '%s'.",
      this._context.connectionId,
      this.name,
      this.address,
      rheaReceiver?.isSessionItselfClosed().toString(),
      this.isConnecting
    );
    if (rheaReceiver && !this.isConnecting) {
      // Call close to clean up timers & other resources
      await rheaReceiver.close().catch((err) => {
        logger.verbose(
          "[%s] Error when closing receiver [%s] after 'session_close' event: %O",
          this._context.connectionId,
          this.name,
          err
        );
      });
    }
  }

  abort(): Promise<void> {
    this._onError?.(new AbortError(StandardAbortMessage));
    logAbort(this._context.connectionId, this.name, this.address);
    return this.close();
  }

  /**
   * Clears the _onError callback.
   */
  clearHandlers(): void {
    if (!this) return;
    this._onError = undefined;
  }

  /**
   * Closes the underlying AMQP receiver.
   */
  async close(): Promise<void> {
    this.clearHandlers();
    if (!this._receiver) {
      return;
    }
    const receiverLink = this._receiver;
    this._receiver = undefined;
    delete this._context.receivers[this.name];
    logger.verbose(
      "[%s] Deleted the receiver '%s' from the client cache.",
      this._context.connectionId,
      this.name
    );
    return this._closeLink(receiverLink)
      .catch((err) => {
        logger.warning(
          `[${this._context.connectionId}] An error occurred while closing receiver ${this.name}: ${err?.name}: ${err?.message}`
        );
        logErrorStackTrace(err);
        throw err;
      })
      .finally(() => {
        this.isClosed = true;
      });
  }

  /**
   * Returns whether the AMQP receiver link is open.
   */
  isOpen(): boolean {
    const result = Boolean(this._receiver && this._receiver.isOpen());
    logger.verbose(
      "[%s] Receiver '%s' with address '%s' is open? -> %s",
      this._context.connectionId,
      this.name,
      this.address,
      result
    );
    return result;
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   */
  async initialize({
    abortSignal,
    timeoutInMs,
  }: {
    abortSignal: AbortSignalLike | undefined;
    timeoutInMs: number;
  }): Promise<void> {
    try {
      const isOpen = this.isOpen();
      if (this.isConnecting || isOpen) {
        logger.verbose(
          "[%s] The receiver '%s' with address '%s' is open -> %s and is connecting -> %s. Hence not reconnecting.",
          this._context.connectionId,
          this.name,
          this.address,
          isOpen,
          this.isConnecting
        );
        return;
      }
      this.isConnecting = true;

      logger.verbose(
        "[%s] The receiver '%s' with address '%s' is trying to connect",
        this._context.connectionId,
        this.name,
        this.address
      );

      // Wait for the connectionContext to be ready to open the link.
      await this._context.readyToOpenLink({ abortSignal });
      await this._negotiateClaim({ setTokenRenewal: false, abortSignal, timeoutInMs });

      const options: RheaReceiverOptions = {
        name: this.name,
        autoaccept: true,
        source: {
          address: this.address,
        },
        credit_window: 0,
        onClose: (context) => this._onAmqpClose(context),
        onError: (context) => this._onAmqpError(context),
        onMessage: (context) => this._onAmqpMessage(context),
        onSessionClose: (context) => this._onAmqpSessionClose(context),
        onSessionError: (context) => this._onAmqpSessionError(context),
      };

      if (typeof this.ownerLevel === "number") {
        options.properties = {
          [Constants.attachEpoch]: types.wrap_long(this.ownerLevel),
        };
      }

      if (this.options.trackLastEnqueuedEventProperties) {
        options.desired_capabilities = Constants.enableReceiverRuntimeMetricName;
      }

      const eventPosition =
        this.checkpoint > -1 ? { sequenceNumber: this.checkpoint } : this.eventPosition;
      // Set filter on the receiver if event position is specified.
      const filterClause = getEventPositionFilter(eventPosition);
      (options.source as Source).filter = {
        "apache.org:selector-filter:string": types.wrap_described(filterClause, 0x468c00000004),
      };

      logger.verbose(
        "[%s] Trying to create receiver '%s' with options %O",
        this._context.connectionId,
        this.name,
        options
      );
      this._receiver = await this._context.connection.createReceiver({ ...options, abortSignal });
      this.isConnecting = false;
      logger.verbose(
        "[%s] Receiver '%s' was created successfully",
        this._context.connectionId,
        this.name
      );
      // store the underlying link in a cache
      this._context.receivers[this.name] = this;

      this._ensureTokenRenewal();
    } catch (err) {
      this.isConnecting = false;
      const error = translate(err);
      logger.error(
        "[%s] An error occurred while creating the receiver '%s': %s",
        this._context.connectionId,
        this.name,
        `${error?.name}: ${error?.message}`
      );
      logErrorStackTrace(err);
      throw error;
    }
  }

  /**
   * Returns a promise that resolves to an array of events received from the service.
   *
   * @param maxMessageCount - The maximum number of messages to receive.
   * @param maxWaitTimeInSeconds - The maximum amount of time to wait to build up the requested message count;
   * If not provided, it defaults to 60 seconds.
   * @param abortSignal - An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @throws AbortError if the operation is cancelled via the abortSignal.
   * @throws MessagingError if an error is encountered while receiving a message.
   * @throws Error if the underlying connection or receiver has been closed.
   * Create a new EventHubConsumer using the EventHubClient createConsumer method.
   * @throws Error if the receiver is already receiving messages.
   */
  async receiveBatch(
    maxMessageCount: number,
    maxWaitTimeInSeconds: number = 60,
    abortSignal?: AbortSignalLike
  ): Promise<ReceivedEventData[]> {
    const cleanupBeforeAbort = (): Promise<void> => {
      logAbort(this._context.connectionId, this.name, this.address);
      return this.close();
    };

    /** The time to wait in ms before attempting to read from the queue */
    const readIntervalWaitTimeInMs = 20;

    const retrieveEvents = (): Promise<ReceivedEventData[]> => {
      const eventsToRetrieveCount = Math.max(maxMessageCount - this.queue.length, 0);
      logger.verbose(
        "[%s] Receiver '%s' already has %d events and wants to receive %d more events.",
        this._context.connectionId,
        this.name,
        this.queue.length,
        eventsToRetrieveCount
      );
      if (abortSignal?.aborted) {
        cleanupBeforeAbort();
        return Promise.reject(new AbortError(StandardAbortMessage));
      }
      return this.isClosed || this._context.wasConnectionCloseCalled
        ? Promise.resolve(this.queue.splice(0))
        : eventsToRetrieveCount === 0
        ? Promise.resolve(this.queue.splice(0, maxMessageCount))
        : new Promise<void>((resolve, reject) => {
            this._onError = reject;

            // eslint-disable-next-line promise/catch-or-return
            this.initialize({
              abortSignal,
              timeoutInMs: getRetryAttemptTimeoutInMs(this.options.retryOptions),
            })
              .then(() => {
                // add credits
                const existingCredits = this._receiver?.credit ?? 0;
                const creditsToAdd = Math.max(eventsToRetrieveCount - existingCredits, 0);
                this._receiver?.addCredit(creditsToAdd);
                logger.verbose(
                  "[%s] Setting the wait timer for %d seconds for receiver '%s'.",
                  this._context.connectionId,
                  maxWaitTimeInSeconds,
                  this.name
                );
                return; // to make eslint happy
              })
              .then(() =>
                waitForEvents(
                  maxMessageCount,
                  maxWaitTimeInSeconds * 1000,
                  readIntervalWaitTimeInMs,
                  this.queue,
                  {
                    abortSignal,
                    cleanupBeforeAbort,
                    receivedAfterWait: () =>
                      logger.info(
                        "[%s] Batching Receiver '%s', %d messages received within %d seconds.",
                        this._context.connectionId,
                        this.name,
                        Math.min(maxMessageCount, this.queue.length),
                        maxWaitTimeInSeconds
                      ),
                    receivedAlready: () =>
                      logger.info(
                        "[%s] Batching Receiver '%s', %d messages already received.",
                        this._context.connectionId,
                        this.name,
                        maxMessageCount,
                        maxWaitTimeInSeconds
                      ),
                    receivedNone: () =>
                      logger.info(
                        "[%s] Batching Receiver '%s', no messages received when max wait time in seconds %d is over.",
                        this._context.connectionId,
                        this.name,
                        maxWaitTimeInSeconds
                      ),
                  }
                )
              )
              .catch(reject)
              .then(resolve);
          })
            .then(() => this.queue.splice(0, maxMessageCount))
            .finally(this.clearHandlers);
    };

    return retry(
      Object.defineProperties(
        {
          operation: retrieveEvents,
          operationType: RetryOperationType.receiveMessage,
          abortSignal: abortSignal,
          retryOptions: this.options.retryOptions ?? {},
        },
        {
          connectionId: {
            enumerable: true,
            get: () => this._context.connectionId,
          },
          connectionHost: {
            enumerable: true,
            get: () => this._context.config.host,
          },
        }
      ) as RetryConfig<ReceivedEventData[]>
    );
  }
}

function delay(
  waitTimeInMs: number,
  options?: {
    abortSignal?: AbortSignalLike;
    cleanupBeforeAbort?: () => void;
    abortErrorMsg?: string;
  }
): Promise<void> {
  let token: ReturnType<typeof setTimeout>;
  return createAbortablePromise<void>((resolve) => {
    token = setTimeout(resolve, waitTimeInMs);
  }, options).finally(() => clearTimeout(token));
}

/**
 * @internal
 */
export function checkOnInterval(
  waitTimeInMs: number,
  check: () => boolean,
  options?: {
    abortSignal?: AbortSignalLike;
    cleanupBeforeAbort?: () => void;
    abortErrorMsg?: string;
  }
): Promise<void> {
  let token: ReturnType<typeof setInterval>;
  return createAbortablePromise<void>((resolve) => {
    token = setInterval(() => {
      if (check()) {
        resolve();
      }
    }, waitTimeInMs);
  }, options).finally(() => clearInterval(token));
}

/**
 * Returns a promise that will resolve when it is time to read from the queue
 * @param maxEventCount - The maximum number of events to receive.
 * @param maxWaitTimeInMs - The maximum time to wait in ms for the queue to contain any events.
 * @param readIntervalWaitTimeInMs - The time interval to wait in ms before checking the queue.
 * @param queue - The queue to read from.
 * @param options - The options bag.
 * @returns a promise that will resolve when it is time to read from the queue
 * @internal
 */
export function waitForEvents(
  maxEventCount: number,
  maxWaitTimeInMs: number,
  readIntervalWaitTimeInMs: number,
  queue: unknown[],
  options?: {
    abortSignal?: AbortSignalLike;
    cleanupBeforeAbort?: () => void;
    receivedAfterWait?: () => void;
    receivedAlready?: () => void;
    receivedNone?: () => void;
  }
): Promise<void> {
  const {
    abortSignal: clientAbortSignal,
    cleanupBeforeAbort,
    receivedNone,
    receivedAfterWait,
    receivedAlready,
  } = options ?? {};
  const aborter = new AbortController();
  const { signal: abortSignal } = new AbortController([
    aborter.signal,
    ...(clientAbortSignal ? [clientAbortSignal] : []),
  ]);
  const updatedOptions = {
    abortSignal,
    abortErrorMsg: StandardAbortMessage,
    cleanupBeforeAbort: () => {
      if (clientAbortSignal?.aborted) {
        cleanupBeforeAbort?.();
      }
    },
  };
  return queue.length >= maxEventCount
    ? Promise.resolve().then(receivedAlready)
    : Promise.race([
        checkOnInterval(readIntervalWaitTimeInMs, () => queue.length > 0, updatedOptions)
          .then(() => delay(readIntervalWaitTimeInMs, updatedOptions))
          .then(receivedAfterWait),
        delay(maxWaitTimeInMs, updatedOptions).then(receivedNone),
      ]).finally(() => aborter.abort());
}

function logAbort(connectionId: string, name: string, address: string): void {
  logger.info(
    `[${connectionId}] The request operation on the Receiver "${name}" with address "${address}" has been cancelled by the user.`
  );
}
