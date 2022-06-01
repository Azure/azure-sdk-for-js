// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { receiverLogger as logger } from "../log";
import {
  AmqpError,
  EventContext,
  OnAmqpEvent,
  ReceiverEvents,
  SessionEvents,
  Receiver as RheaPromiseReceiver,
  Session,
} from "rhea-promise";
import { ServiceBusMessageImpl } from "../serviceBusMessage";
import { MessageReceiver, OnAmqpEventAsPromise, ReceiveOptions } from "./messageReceiver";
import { ConnectionContext } from "../connectionContext";
import { throwErrorIfConnectionClosed } from "../util/errors";
import { AbortSignalLike } from "@azure/abort-controller";
import { checkAndRegisterWithAbortSignal } from "../util/utils";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { createAndEndProcessingSpan } from "../diagnostics/instrumentServiceBusMessage";
import { ReceiveMode } from "../models";
import { ServiceBusError, translateServiceBusError } from "../serviceBusError";

/**
 * Describes the batching receiver where the user can receive a specified number of messages for
 * a predefined time.
 * @internal
 */
export class BatchingReceiver extends MessageReceiver {
  /**
   * Instantiate a new BatchingReceiver.
   *
   * @param connectionContext - The client entity context.
   * @param options - Options for how you'd like to connect.
   */
  constructor(connectionContext: ConnectionContext, entityPath: string, options: ReceiveOptions) {
    super(connectionContext, entityPath, "batching", options);

    this._batchingReceiverLite = new BatchingReceiverLite(
      connectionContext,
      entityPath,
      async (abortSignal?: AbortSignalLike): Promise<MinimalReceiver | undefined> => {
        let lastError: Error | AmqpError | undefined;

        const rcvrOptions = this._createReceiverOptions(false, {
          onError: (context) => {
            lastError = context?.receiver?.error;
          },
          onSessionError: (context) => {
            lastError = context?.session?.error;
          },
          onClose: async () => {
            /** Nothing to do here - the next call will just fail so they'll get an appropriate error from somewhere else. */
          },
          onSessionClose: async () => {
            /** Nothing to do here - the next call will just fail so they'll get an appropriate error from somewhere else. */
          },
          onMessage: async () => {
            /** Nothing to do here -  we don't add credits initially so we don't need to worry about handling any messages.*/
          },
        });

        await this._init(rcvrOptions, abortSignal);

        if (lastError != null) {
          throw lastError;
        }

        return this.link;
      },
      this.receiveMode,
      options.skipParsingBodyAsJson ?? false
    );
  }

  private _batchingReceiverLite: BatchingReceiverLite;

  get isReceivingMessages(): boolean {
    return this._batchingReceiverLite.isReceivingMessages;
  }

  /**
   * To be called when connection is disconnected to gracefully close ongoing receive request.
   * @param connectionError - The connection error if any.
   */
  async onDetached(connectionError?: AmqpError | Error): Promise<void> {
    await this.closeLink();

    if (connectionError == null) {
      connectionError = new Error(
        "Unknown error occurred on the AMQP connection while receiving messages."
      );
    }

    this._batchingReceiverLite.terminate(connectionError);
  }

  /**
   * Receives a batch of messages from a ServiceBus Queue/Topic.
   * @param maxMessageCount - The maximum number of messages to receive.
   * In Peeklock mode, this number is capped at 2047 due to constraints of the underlying buffer.
   * @param maxWaitTimeInMs - The total wait time in milliseconds until which the receiver will attempt to receive specified number of messages.
   * @param maxTimeAfterFirstMessageInMs - The total amount of time to wait after the first message
   * has been received. Defaults to 1 second.
   * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
   * @returns A promise that resolves with an array of Message objects.
   */
  async receive(
    maxMessageCount: number,
    maxWaitTimeInMs: number,
    maxTimeAfterFirstMessageInMs: number,
    options: OperationOptionsBase
  ): Promise<ServiceBusMessageImpl[]> {
    throwErrorIfConnectionClosed(this._context);
    try {
      logger.verbose(
        "[%s] Receiver '%s', setting max concurrent calls to 0.",
        this.logPrefix,
        this.name
      );

      const messages = await this._batchingReceiverLite.receiveMessages({
        maxMessageCount,
        maxWaitTimeInMs,
        maxTimeAfterFirstMessageInMs,
        ...options,
      });

      if (this._lockRenewer) {
        for (const message of messages) {
          this._lockRenewer.start(this, message, (_error) => {
            // the auto lock renewer already logs this in a detailed way. So this hook is mainly here
            // to potentially forward the error to the user (which we're not doing yet)
          });
        }
      }

      return messages;
    } catch (error: any) {
      logger.logError(error, "[%s] Rejecting receiveMessages()", this.logPrefix);
      throw error;
    }
  }

  static create(
    context: ConnectionContext,
    entityPath: string,
    options: ReceiveOptions
  ): BatchingReceiver {
    throwErrorIfConnectionClosed(context);
    const bReceiver = new BatchingReceiver(context, entityPath, options);
    context.messageReceivers[bReceiver.name] = bReceiver;
    return bReceiver;
  }

  protected removeLinkFromContext(): void {
    delete this._context.messageReceivers[this.name];
  }
}

/**
 * Gets a function that returns the smaller of the two timeouts,
 * taking into account elapsed time from when getRemainingWaitTimeInMsFn
 * was called.
 *
 * @param maxWaitTimeInMs - Maximum time to wait for the first message
 * @param maxTimeAfterFirstMessageInMs - Maximum time to wait after the first message before completing the receive.
 *
 * @internal
 */
export function getRemainingWaitTimeInMsFn(
  maxWaitTimeInMs: number,
  maxTimeAfterFirstMessageInMs: number
): () => number {
  const startTimeMs = Date.now();

  return () => {
    const remainingTimeMs = maxWaitTimeInMs - (Date.now() - startTimeMs);

    if (remainingTimeMs < 0) {
      return 0;
    }

    return Math.min(remainingTimeMs, maxTimeAfterFirstMessageInMs);
  };
}

/**
 * Useful interface that mimics EventEmitter without requiring us to actually
 * import the events definition (which is annoying with browsers).
 *
 * @internal
 */
type EventEmitterLike<T extends RheaPromiseReceiver | Session> = Pick<
  T,
  "once" | "removeListener" | "on"
>;

/**
 * The bare minimum needed to receive messages for batched
 * message receiving.
 *
 * @internal
 */
export type MinimalReceiver = Pick<
  RheaPromiseReceiver,
  "name" | "isOpen" | "credit" | "addCredit" | "drain" | "drainCredit"
> &
  EventEmitterLike<RheaPromiseReceiver> & {
    session: EventEmitterLike<Session>;
  } & {
    connection: {
      id: string;
    };
  };

/**
 * @internal
 */
type MessageAndDelivery = Pick<EventContext, "message" | "delivery">;

/**
 * @internal
 */
interface ReceiveMessageArgs extends OperationOptionsBase {
  maxMessageCount: number;
  maxWaitTimeInMs: number;
  maxTimeAfterFirstMessageInMs: number;
}

/**
 * The internals of a batching receiver minus anything that would require us to hold onto a client entity context
 * or a receiver on a permanent basis.
 *
 * Usable with both session and non-session receivers.
 *
 * @internal
 */
export class BatchingReceiverLite {
  /**
   * NOTE: exists only to make unit testing possible.
   */
  private _createAndEndProcessingSpan: typeof createAndEndProcessingSpan;

  constructor(
    private _connectionContext: ConnectionContext,
    public entityPath: string,
    private _getCurrentReceiver: (
      abortSignal?: AbortSignalLike
    ) => Promise<MinimalReceiver | undefined>,
    private _receiveMode: ReceiveMode,
    _skipParsingBodyAsJson: boolean
  ) {
    this._createAndEndProcessingSpan = createAndEndProcessingSpan;

    this._createServiceBusMessage = (context: MessageAndDelivery) => {
      return new ServiceBusMessageImpl(
        context.message!,
        context.delivery!,
        true,
        this._receiveMode,
        _skipParsingBodyAsJson
      );
    };

    this._getRemainingWaitTimeInMsFn = (
      maxWaitTimeInMs: number,
      maxTimeAfterFirstMessageInMs: number
    ) => getRemainingWaitTimeInMsFn(maxWaitTimeInMs, maxTimeAfterFirstMessageInMs);

    this.isReceivingMessages = false;
  }

  private _createServiceBusMessage: (
    context: Pick<EventContext, "message" | "delivery">
  ) => ServiceBusMessageImpl;

  private _getRemainingWaitTimeInMsFn: typeof getRemainingWaitTimeInMsFn;
  private _closeHandler: ((connectionError?: AmqpError | Error) => void) | undefined;
  private _finalAction: (() => void) | undefined;

  isReceivingMessages: boolean;

  /**
   * Receives a set of messages,
   *
   * @internal
   * @hidden
   */
  public async receiveMessages(args: ReceiveMessageArgs): Promise<ServiceBusMessageImpl[]> {
    try {
      this.isReceivingMessages = true;
      const receiver = await this._getCurrentReceiver(args.abortSignal);

      if (receiver == null) {
        // (was somehow closed in between the init() and the return)
        throw new ServiceBusError("Link closed before receiving messages.", "GeneralError");
      }

      const messages = await new Promise<ServiceBusMessageImpl[]>((resolve, reject) =>
        this._receiveMessagesImpl(receiver, args, resolve, reject)
      );
      this._createAndEndProcessingSpan(messages, this, this._connectionContext.config, args);
      return messages;
    } finally {
      this._closeHandler = undefined;
      this.isReceivingMessages = false;
    }
  }

  /**
   * Closes the receiver (optionally with an error), cancelling any current operations.
   *
   * @param connectionError - An optional error (rhea doesn't always deliver one for certain disconnection events)
   */
  terminate(connectionError?: Error | AmqpError): void {
    if (this._closeHandler) {
      this._closeHandler(connectionError);
      this._closeHandler = undefined;
    }
  }

  private _receiveMessagesImpl(
    receiver: MinimalReceiver,
    args: ReceiveMessageArgs,
    origResolve: (messages: ServiceBusMessageImpl[]) => void,
    origReject: (err: Error | AmqpError) => void
  ): void {
    const getRemainingWaitTimeInMs = this._getRemainingWaitTimeInMsFn(
      args.maxWaitTimeInMs,
      args.maxTimeAfterFirstMessageInMs
    );

    const brokeredMessages: ServiceBusMessageImpl[] = [];
    const loggingPrefix = `[${receiver.connection.id}|r:${receiver.name}]`;

    let totalWaitTimer: NodeJS.Timer | undefined;

    // eslint-disable-next-line prefer-const
    let cleanupBeforeResolveOrReject: () => void;

    const reject = (err: Error | AmqpError): void => {
      cleanupBeforeResolveOrReject();
      origReject(err);
    };

    const resolveImmediately = (result: ServiceBusMessageImpl[]): void => {
      cleanupBeforeResolveOrReject();
      origResolve(result);
    };

    const resolveAfterPendingMessageCallbacks = (result: ServiceBusMessageImpl[]): void => {
      // NOTE: through rhea-promise, most of our event handlers are made asynchronous by calling setTimeout(emit).
      // However, a small set (*error and drain) execute immediately. This can lead to a situation where the logical
      // ordering of events is correct but the execution order is incorrect because the events are not all getting
      // put into the task queue the same way.
      // setTimeout() ensures that we resolve _after_ any already-queued onMessage handlers that may
      // be waiting in the task queue.
      setTimeout(() => {
        cleanupBeforeResolveOrReject();
        origResolve(result);
      });
    };

    const onError: OnAmqpEvent = (context: EventContext) => {
      const eventType = context.session?.error != null ? "session_error" : "receiver_error";
      let error = context.session?.error || context.receiver?.error;

      if (error) {
        error = translateServiceBusError(error);
        logger.logError(error, `${loggingPrefix} '${eventType}' event occurred. Received an error`);
      } else {
        error = new ServiceBusError("An error occurred while receiving messages.", "GeneralError");
      }
      reject(error);
    };

    this._closeHandler = (error?: AmqpError | Error): void => {
      if (
        // no error, just closing. Go ahead and return what we have.
        error == null ||
        // Return the collected messages if in ReceiveAndDelete mode because otherwise they are lost forever
        (this._receiveMode === "receiveAndDelete" && brokeredMessages.length)
      ) {
        logger.verbose(
          `${loggingPrefix} Closing. Resolving with ${brokeredMessages.length} messages.`
        );

        return resolveAfterPendingMessageCallbacks(brokeredMessages);
      }

      reject(translateServiceBusError(error));
    };

    let abortSignalCleanupFunction: (() => void) | undefined = undefined;

    // Final action to be performed after
    // - maxMessageCount is reached or
    // - maxWaitTime is passed or
    // - newMessageWaitTimeoutInSeconds is passed since the last message was received
    this._finalAction = (): void => {
      if (receiver.drain) {
        // If a drain is already in process then we should let it complete. Some messages might still be in flight, but they will
        // arrive before the drain completes.
        return;
      }

      // Drain any pending credits.
      if (receiver.isOpen() && receiver.credit > 0) {
        logger.verbose(`${loggingPrefix} Draining leftover credits(${receiver.credit}).`);
        receiver.drainCredit();
      } else {
        logger.verbose(
          `${loggingPrefix} Resolving receiveMessages() with ${brokeredMessages.length} messages.`
        );

        // we can resolve immediately (ie, no setTimeout call) because we have no
        // remaining messages (thus nothing to wait for)
        resolveImmediately(brokeredMessages);
      }
    };

    // Action to be performed on the "message" event.
    const onReceiveMessage: OnAmqpEventAsPromise = async (context: EventContext) => {
      // TODO: this appears to be aggravating a bug that we need to look into more deeply.
      // The same timeout+drain sequence should work fine for receiveAndDelete but it appears
      // to cause problems.
      if (this._receiveMode === "peekLock") {
        if (brokeredMessages.length === 0) {
          // We'll now remove the old timer (which was the overall `maxWaitTimeMs` timer)
          // and replace it with another timer that is a (probably) much shorter interval.
          //
          // This allows the user to get access to received messages earlier and also gives us
          // a chance to have fewer messages internally that could get lost if the user's
          // app crashes.
          if (totalWaitTimer) clearTimeout(totalWaitTimer);
          const remainingWaitTimeInMs = getRemainingWaitTimeInMs();
          totalWaitTimer = setTimeout(() => {
            logger.verbose(
              `${loggingPrefix} Batching, waited for ${remainingWaitTimeInMs} milliseconds after receiving the first message.`
            );
            this._finalAction!();
          }, remainingWaitTimeInMs);
        }
      }

      try {
        const data: ServiceBusMessageImpl = this._createServiceBusMessage(context);
        brokeredMessages.push(data);

        // NOTE: we used to actually "lose" any extra messages. At this point I've fixed the areas that were causing us to receive
        // extra messages but if this bug arises in some other way it's better to return the message than it would be to let it be
        // silently dropped on the floor.
        if (brokeredMessages.length > args.maxMessageCount) {
          logger.warning(
            `More messages arrived than were expected: ${args.maxMessageCount} vs ${
              brokeredMessages.length + 1
            }`
          );
        }
      } catch (err: any) {
        const errObj = err instanceof Error ? err : new Error(JSON.stringify(err));
        logger.logError(
          err,
          `${loggingPrefix} Received an error while converting AmqpMessage to ServiceBusMessage`
        );
        reject(errObj);
      }
      if (brokeredMessages.length === args.maxMessageCount) {
        this._finalAction!();
      }
    };

    const onClose: OnAmqpEventAsPromise = async (context: EventContext) => {
      const type = context.session?.error != null ? "session_closed" : "receiver_closed";
      const error = context.session?.error || context.receiver?.error;

      if (error) {
        logger.logError(error, `${loggingPrefix} '${type}' event occurred. The associated error`);
      }
    };

    // Action to be performed on the "receiver_drained" event.
    const onReceiveDrain: OnAmqpEvent = () => {
      receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
      receiver.drain = false;

      logger.verbose(
        `${loggingPrefix} Drained, resolving receiveMessages() with ${brokeredMessages.length} messages.`
      );

      resolveAfterPendingMessageCallbacks(brokeredMessages);
    };

    cleanupBeforeResolveOrReject = (): void => {
      if (receiver != null) {
        receiver.removeListener(ReceiverEvents.receiverError, onError);
        receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        receiver.session.removeListener(SessionEvents.sessionError, onError);
        receiver.removeListener(ReceiverEvents.receiverClose, onClose);
        receiver.session.removeListener(SessionEvents.sessionClose, onClose);
        receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
      }

      if (totalWaitTimer) {
        clearTimeout(totalWaitTimer);
      }

      if (abortSignalCleanupFunction) {
        abortSignalCleanupFunction();
      }
      abortSignalCleanupFunction = undefined;
    };

    abortSignalCleanupFunction = checkAndRegisterWithAbortSignal((err) => {
      reject(err);
    }, args.abortSignal);

    logger.verbose(
      `${loggingPrefix} Adding credit for receiving ${args.maxMessageCount} messages.`
    );

    // By adding credit here, we let the service know that at max we can handle `maxMessageCount`
    // number of messages concurrently. We will return the user an array of messages that can
    // be of size upto maxMessageCount. Then the user needs to accordingly dispose
    // (complete/abandon/defer/deadletter) the messages from the array.
    receiver.addCredit(args.maxMessageCount);

    logger.verbose(
      `${loggingPrefix} Setting the wait timer for ${args.maxWaitTimeInMs} milliseconds.`
    );

    totalWaitTimer = setTimeout(() => {
      logger.verbose(
        `${loggingPrefix} Batching, waited for max wait time ${args.maxWaitTimeInMs} milliseconds.`
      );
      this._finalAction!();
    }, args.maxWaitTimeInMs);

    receiver.on(ReceiverEvents.message, onReceiveMessage);
    receiver.on(ReceiverEvents.receiverError, onError);
    receiver.on(ReceiverEvents.receiverClose, onClose);
    receiver.on(ReceiverEvents.receiverDrained, onReceiveDrain);

    receiver.session.on(SessionEvents.sessionError, onError);
    receiver.session.on(SessionEvents.sessionClose, onClose);
  }
}
