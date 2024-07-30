// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
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
  Receiver as Link,
  ReceiverOptions as RheaReceiverOptions,
  Source,
  types,
} from "rhea-promise";
import { EventDataInternal, ReceivedEventData, fromRheaMessage } from "./eventData.js";
import { EventPosition, getEventPositionFilter } from "./eventPosition.js";
import {
  createSimpleLogger,
  logErrorStackTrace,
  logObj,
  logger as azureLogger,
  SimpleLogger,
  createReceiverLogPrefix,
} from "./logger.js";
import { ConnectionContext } from "./connectionContext.js";
import { PartitionReceiverOptions } from "./models/private.js";
import { getRetryAttemptTimeoutInMs } from "./util/retries.js";
import { createAbortablePromise } from "@azure/core-util";
import { TimerLoop } from "./util/timerLoop.js";
import { getRandomName } from "./util/utils.js";
import { withAuth } from "./withAuth.js";
import { receiverIdPropertyName } from "./util/constants.js";

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};
/** @internal */
export type WritableReceiver = Writable<PartitionReceiver>;

const abortLogMessage = "operation has been cancelled by the user";
/** The time to wait in ms before attempting to read from the queue */
const qReadIntervalInMs = 20;

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

/** @internal */
export interface PartitionReceiver {
  readonly checkpoint: number;
  readonly lastEnqueuedEventProperties: LastEnqueuedEventProperties;
  readonly isClosed: boolean;
  readonly close: () => Promise<void>;
  readonly abort: () => Promise<void>;
  readonly isOpen: () => boolean;
  readonly receiveBatch: (
    maxMessageCount: number,
    maxWaitTimeInSeconds?: number,
    abortSignal?: AbortSignalLike,
  ) => Promise<ReceivedEventData[]>;
  /** Needed for tests only */
  readonly _onError?: (error: MessagingError | Error) => void;
  readonly connect: (options: ConnectOptions) => Promise<void>;
}

interface ConnectOptions {
  abortSignal: AbortSignalLike | undefined;
  timeoutInMs: number;
}

interface ReceiverState {
  link?: Link;
  authLoop?: TimerLoop;
  isConnecting: boolean;
}

/** @internal */
export function createReceiver(
  ctx: ConnectionContext,
  consumerGroup: string,
  consumerId: string,
  partitionId: string,
  eventPosition: EventPosition,
  options: PartitionReceiverOptions = {},
): PartitionReceiver {
  const address = ctx.config.getReceiverAddress(partitionId, consumerGroup);
  const name = getRandomName(address);
  const audience = ctx.config.getReceiverAudience(partitionId, consumerGroup);
  const logPrefix = createReceiverLogPrefix(consumerId, ctx.connectionId, partitionId);
  const logger = createSimpleLogger(azureLogger, logPrefix);
  const queue: ReceivedEventData[] = [];
  const state: ReceiverState = {
    isConnecting: false,
  };

  const obj: WritableReceiver = {
    _onError: undefined,
    checkpoint: -1,
    lastEnqueuedEventProperties: {},
    isClosed: false,
    close: async () => {
      clearHandlers(obj);
      delete ctx.receivers[name];
      logger.verbose("deleted the receiver from the client cache");
      state.authLoop?.stop();
      return state.link
        ?.close()
        .catch((err) => {
          logger.warning(`an error occurred while closing: ${err?.name}: ${err?.message}`);
          logErrorStackTrace(err);
          throw err;
        })
        .finally(() => {
          obj.isClosed = true;
          logger.verbose("is closed");
          state.link = undefined;
          state.authLoop = undefined;
        });
    },
    abort: () => {
      obj._onError?.(new AbortError(StandardAbortMessage));
      logger.info(abortLogMessage);
      return obj.close();
    },
    isOpen: () => {
      const isOpen = !!state.link?.isOpen();
      logger.verbose(`is open? -> ${isOpen}`);
      return isOpen;
    },
    async connect({ abortSignal, timeoutInMs }: ConnectOptions): Promise<void> {
      if (state.isConnecting || obj.isOpen()) {
        return;
      }
      state.isConnecting = true;
      logger.verbose("is trying to connect");
      try {
        await ctx.readyToOpenLink({ abortSignal });
        state.authLoop = await withAuth(
          () =>
            setupLink(
              consumerId,
              ctx,
              name,
              address,
              obj,
              state,
              queue,
              eventPosition,
              logger,
              options,
              abortSignal,
            ),
          ctx,
          audience,
          timeoutInMs,
          logger,
          {
            abortSignal,
          },
        );
      } catch (err) {
        state.isConnecting = false;
        const error = translate(err);
        logger.error(
          `an error occurred while creating the receiver: ${error?.name}: ${error?.message}`,
        );
        logErrorStackTrace(err);
        throw error;
      }
    },
    receiveBatch: (
      maxMessageCount: number,
      maxWaitTimeInSeconds: number = 60,
      abortSignal?: AbortSignalLike,
    ) => {
      const prefetchCount = options.prefetchCount ?? maxMessageCount * 3;
      const cleanupBeforeAbort = (): Promise<void> => {
        logger.info(abortLogMessage);
        return obj.close();
      };
      const retrieveEvents = (): Promise<ReceivedEventData[]> => {
        const eventsToRetrieveCount = Math.max(maxMessageCount - queue.length, 0);
        logger.verbose(
          `already has ${queue.length} events and wants to receive ${eventsToRetrieveCount} more events`,
        );
        if (abortSignal?.aborted) {
          cleanupBeforeAbort();
          return Promise.reject(new AbortError(StandardAbortMessage));
        }
        return obj.isClosed || ctx.wasConnectionCloseCalled || eventsToRetrieveCount === 0
          ? Promise.resolve(queue.splice(0, maxMessageCount))
          : new Promise<void>((resolve, reject) => {
              obj._onError = reject;
              obj // eslint-disable-line promise/catch-or-return
                .connect({
                  abortSignal,
                  timeoutInMs: getRetryAttemptTimeoutInMs(options.retryOptions),
                })
                .then(() => {
                  addCredits(state.link, Math.max(prefetchCount, maxMessageCount) - queue.length);
                  logger.verbose(`setting the max wait time to ${maxWaitTimeInSeconds} seconds`);
                  return waitForEvents(
                    maxMessageCount,
                    maxWaitTimeInSeconds * 1000,
                    qReadIntervalInMs,
                    queue,
                    {
                      abortSignal,
                      cleanupBeforeAbort,
                      receivedAfterWait: () =>
                        logger.info(
                          `${Math.min(
                            maxMessageCount,
                            queue.length,
                          )} messages received within ${maxWaitTimeInSeconds} seconds`,
                        ),
                      receivedAlready: () =>
                        logger.info(`${maxMessageCount} messages already received`),
                      receivedNone: () =>
                        logger.info(
                          `no messages received when max wait time in seconds ${maxWaitTimeInSeconds} is over`,
                        ),
                    },
                  );
                })
                .catch(reject)
                .then(resolve);
            })
              .then(() => queue.splice(0, maxMessageCount))
              .finally(() => clearHandlers(obj));
      };
      return retry(
        Object.defineProperties(
          {
            operation: retrieveEvents,
            operationType: RetryOperationType.receiveMessage,
            abortSignal: abortSignal,
            retryOptions: options.retryOptions ?? {},
          },
          {
            connectionId: {
              enumerable: true,
              get: () => ctx.connectionId,
            },
            connectionHost: {
              enumerable: true,
              get: () => ctx.config.host,
            },
          },
        ) as RetryConfig<ReceivedEventData[]>,
      );
    },
  };
  return obj;
}

function delay(
  waitTimeInMs: number,
  options?: {
    abortSignal?: AbortSignalLike;
    cleanupBeforeAbort?: () => void;
    abortErrorMsg?: string;
  },
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
  },
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
  options: {
    abortSignal?: AbortSignalLike;
    cleanupBeforeAbort?: () => void;
    receivedAfterWait?: () => void;
    receivedAlready?: () => void;
    receivedNone?: () => void;
  } = {},
): Promise<void> {
  const {
    abortSignal: clientAbortSignal,
    cleanupBeforeAbort,
    receivedNone,
    receivedAfterWait,
    receivedAlready,
  } = options;

  if (queue.length >= maxEventCount) {
    return Promise.resolve().then(receivedAlready);
  }

  const aborter = new AbortController();
  const abortListener = () => {
    aborter.abort();
  };
  clientAbortSignal?.addEventListener("abort", abortListener);
  let cleanupBeforeAbortCalled = false;

  const updatedOptions = {
    abortSignal: aborter.signal,
    abortErrorMsg: StandardAbortMessage,
    cleanupBeforeAbort: () => {
      if (clientAbortSignal?.aborted && !cleanupBeforeAbortCalled) {
        cleanupBeforeAbort?.();
        cleanupBeforeAbortCalled = true;
      }
    },
  };
  return Promise.race([
    checkOnInterval(readIntervalWaitTimeInMs, () => queue.length > 0, updatedOptions)
      .then(() => delay(readIntervalWaitTimeInMs, updatedOptions))
      .then(receivedAfterWait),
    delay(maxWaitTimeInMs, updatedOptions).then(receivedNone),
  ]).finally(() => {
    aborter.abort();
    clientAbortSignal?.removeEventListener("abort", abortListener);
  });
}

function convertAMQPMesage(data: EventDataInternal): ReceivedEventData {
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
  return receivedEventData;
}

function setEventProps(eventProps: LastEnqueuedEventProperties, data: EventDataInternal): void {
  eventProps.sequenceNumber = data.lastSequenceNumber;
  eventProps.enqueuedOn = data.lastEnqueuedTime;
  eventProps.offset = data.lastEnqueuedOffset;
  eventProps.retrievedOn = data.retrievalTime;
}

function clearHandlers(obj: WritableReceiver): void {
  obj._onError = undefined;
}

function onMessage(
  context: EventContext,
  obj: WritableReceiver,
  queue: ReceivedEventData[],
  options: PartitionReceiverOptions,
): void {
  if (!context.message) {
    return;
  }
  const data = fromRheaMessage(context.message, !!options.skipParsingBodyAsJson);
  const receivedEventData = convertAMQPMesage(data);
  obj.checkpoint = receivedEventData.sequenceNumber;
  if (options.trackLastEnqueuedEventProperties) {
    setEventProps(obj.lastEnqueuedEventProperties, data);
  }
  queue.push(receivedEventData);
}

function onError(
  context: EventContext,
  obj: PartitionReceiver,
  receiver: Link | undefined,
  logger: SimpleLogger,
): void {
  const rheaReceiver = receiver || context.receiver;
  const amqpError = rheaReceiver?.error;
  logger.verbose(`'receiver_error' event occurred: ${logObj(amqpError)}`);
  if (obj._onError && amqpError) {
    const error = translate(amqpError);
    logErrorStackTrace(error);
    obj._onError(error);
  }
}

function onSessionError(context: EventContext, obj: PartitionReceiver, logger: SimpleLogger): void {
  const sessionError = context.session?.error;
  logger.verbose(`'session_error' event occurred: ${logObj(sessionError)}`);
  if (obj._onError && sessionError) {
    const error = translate(sessionError);
    logErrorStackTrace(error);
    obj._onError(error);
  }
}

async function onClose(
  context: EventContext,
  state: ReceiverState,
  logger: SimpleLogger,
): Promise<void> {
  const rheaReceiver = state.link || context.receiver;
  logger.verbose(
    `'receiver_close' event occurred. Value for isItselfClosed on the receiver is: '${rheaReceiver
      ?.isItselfClosed()
      .toString()}' Value for isConnecting on the session is: '${state.isConnecting}'`,
  );
  if (rheaReceiver && !state.isConnecting) {
    return rheaReceiver.close().catch((err) => {
      logger.verbose(`error when closing after 'receiver_close' event: ${logObj(err)}`);
    });
  }
}

async function onSessionClose(
  context: EventContext,
  state: ReceiverState,
  logger: SimpleLogger,
): Promise<void> {
  const rheaReceiver = state.link || context.receiver;
  logger.verbose(
    `'session_close' event occurred. Value for isSessionItselfClosed on the session is: '${rheaReceiver
      ?.isSessionItselfClosed()
      .toString()}' Value for isConnecting on the session is: '${state.isConnecting}'`,
  );
  if (rheaReceiver && !state.isConnecting) {
    return rheaReceiver.close().catch((err) => {
      logger.verbose(`error when closing after 'session_close' event: ${logObj(err)}`);
    });
  }
}

function createRheaOptions(
  consumerId: string,
  name: string,
  address: string,
  obj: PartitionReceiver,
  state: ReceiverState,
  queue: ReceivedEventData[],
  eventPosition: EventPosition,
  logger: SimpleLogger,
  options: PartitionReceiverOptions,
): RheaReceiverOptions {
  const rheaOptions: RheaReceiverOptions & { source: Source; properties: Record<string, any> } = {
    name,
    autoaccept: true,
    target: consumerId,
    source: {
      address,
    },
    credit_window: 0,
    properties: {
      [receiverIdPropertyName]: consumerId,
    },
    onClose: (context) => onClose(context, state, logger),
    onSessionClose: (context) => onSessionClose(context, state, logger),
    onError: (context) => onError(context, obj, state.link, logger),
    onMessage: (context) => onMessage(context, obj, queue, options),
    onSessionError: (context) => onSessionError(context, obj, logger),
  };
  const ownerLevel = options.ownerLevel;
  if (typeof ownerLevel === "number") {
    rheaOptions.properties[Constants.attachEpoch] = types.wrap_long(ownerLevel);
  }
  rheaOptions.desired_capabilities = [Constants.geoReplication];
  if (options.trackLastEnqueuedEventProperties) {
    rheaOptions.desired_capabilities.push(Constants.enableReceiverRuntimeMetricName);
  }
  const filterClause = getEventPositionFilter(
    obj.checkpoint > -1 ? { sequenceNumber: obj.checkpoint } : eventPosition,
  );
  rheaOptions.source.filter = {
    "apache.org:selector-filter:string": types.wrap_described(filterClause, 0x468c00000004),
  };
  return rheaOptions;
}

async function setupLink(
  consumerId: string,
  ctx: ConnectionContext,
  name: string,
  address: string,
  obj: PartitionReceiver,
  state: ReceiverState,
  queue: ReceivedEventData[],
  eventPosition: EventPosition,
  logger: SimpleLogger,
  options: PartitionReceiverOptions,
  abortSignal?: AbortSignalLike,
): Promise<void> {
  const rheaOptions = createRheaOptions(
    consumerId,
    name,
    address,
    obj,
    state,
    queue,
    eventPosition,
    logger,
    options,
  );
  logger.verbose(`trying to be created with options ${logObj(rheaOptions)}`);
  state.link = await ctx.connection.createReceiver({
    ...rheaOptions,
    abortSignal,
  });
  state.isConnecting = false;
  logger.verbose("is created successfully");
  ctx.receivers[name] = obj;
}

function addCredits(receiver: Link | undefined, creditsToAdd: number): void {
  if (creditsToAdd > 0) {
    receiver?.addCredit(creditsToAdd);
  }
}
