// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as log from "../log";
import { MessagingError, translate } from "@azure/core-amqp";
import {
  AmqpError,
  EventContext,
  OnAmqpEvent,
  ReceiverEvents,
  SessionEvents,
  Receiver,
  Session
} from "rhea-promise";
import { InternalReceiveMode, ServiceBusMessageImpl } from "../serviceBusMessage";
import {
  MessageReceiver,
  OnAmqpEventAsPromise,
  ReceiveOptions,
  ReceiverType
} from "./messageReceiver";
import { ClientEntityContext } from "../clientEntityContext";
import { throwErrorIfConnectionClosed } from "../util/errors";
import { AbortSignalLike } from "@azure/abort-controller";
import { checkAndRegisterWithAbortSignal } from "../util/utils";

/**
 * Describes the batching receiver where the user can receive a specified number of messages for
 * a predefined time.
 * @internal
 * @class BatchingReceiver
 * @extends MessageReceiver
 */
export class BatchingReceiver extends MessageReceiver {
  /**
   * Instantiate a new BatchingReceiver.
   *
   * @constructor
   * @param {ClientEntityContext} context The client entity context.
   * @param {ReceiveOptions} [options]  Options for how you'd like to connect.
   */
  constructor(context: ClientEntityContext, options?: ReceiveOptions) {
    super(context, ReceiverType.batching, options);

    this._batchingReceiverLite = new BatchingReceiverLite(
      context,
      async (abortSignal?: AbortSignalLike): Promise<MinimalReceiver | undefined> => {
        let lastError: Error | AmqpError | undefined;

        const rcvrOptions = this._createReceiverOptions(false, {
          onError: (context) => {
            lastError = context?.receiver?.error;
          },
          onSessionError: (context) => {
            lastError = context?.session?.error;
          },
          // ignored for now - the next call will just fail so they'll get an appropriate error from somewhere else.
          onClose: async () => {},
          onSessionClose: async () => {},
          // we don't add credits initially so we don't need to worry about handling any messages.
          onMessage: async () => {}
        });

        await this._init(rcvrOptions, abortSignal);

        if (lastError != null) {
          throw lastError;
        }

        return this._receiver;
      },
      this.receiveMode
    );
  }

  private _batchingReceiverLite: BatchingReceiverLite;

  get isReceivingMessages(): boolean {
    return this._batchingReceiverLite.isReceivingMessages;
  }

  /**
   * To be called when connection is disconnected to gracefully close ongoing receive request.
   * @param {AmqpError | Error} [connectionError] The connection error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async onDetached(connectionError?: AmqpError | Error): Promise<void> {
    // Clears the token renewal timer. Closes the link and its session if they are open.
    await this._closeLink(this._receiver);

    if (connectionError == null) {
      connectionError = new Error(
        "Unknown error occurred on the AMQP connection while receiving messages."
      );
    }

    await this._batchingReceiverLite.close(connectionError);
  }

  /**
   * Receives a batch of messages from a ServiceBus Queue/Topic.
   * @param maxMessageCount The maximum number of messages to receive.
   * In Peeklock mode, this number is capped at 2047 due to constraints of the underlying buffer.
   * @param maxWaitTimeInMs The total wait time in milliseconds until which the receiver will attempt to receive specified number of messages.
   * @param maxTimeAfterFirstMessageInMs The total amount of time to wait after the first message
   * has been received. Defaults to 1 second.
   * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
   * @returns {Promise<ServiceBusMessageImpl[]>} A promise that resolves with an array of Message objects.
   */
  async receive(
    maxMessageCount: number,
    maxWaitTimeInMs: number,
    maxTimeAfterFirstMessageInMs: number,
    userAbortSignal?: AbortSignalLike
  ): Promise<ServiceBusMessageImpl[]> {
    throwErrorIfConnectionClosed(this._context.namespace);

    try {
      log.batching(
        "[%s] Receiver '%s', setting max concurrent calls to 0.",
        this._context.namespace.connectionId,
        this.name
      );

      return await this._batchingReceiverLite.receiveMessages({
        maxMessageCount,
        maxWaitTimeInMs,
        maxTimeAfterFirstMessageInMs,
        userAbortSignal
      });
    } catch (error) {
      log.error(
        "[%s] Receiver '%s': Rejecting receiveMessages() with error %O: ",
        this._context.namespace.connectionId,
        this.name,
        error
      );
      throw error;
    }
  }

  /**
   * Creates a batching receiver.
   * @static
   *
   * @param {ClientEntityContext} context    The connection context.
   * @param {ReceiveOptions} [options]     Receive options.
   */
  static create(context: ClientEntityContext, options?: ReceiveOptions): BatchingReceiver {
    throwErrorIfConnectionClosed(context.namespace);
    const bReceiver = new BatchingReceiver(context, options);
    context.batchingReceiver = bReceiver;
    return bReceiver;
  }
}

/**
 * Gets a function that returns the smaller of the two timeouts,
 * taking into account elapsed time from when getRemainingWaitTimeInMsFn
 * was called.
 *
 * @param maxWaitTimeInMs Maximum time to wait for the first message
 * @param maxTimeAfterFirstMessageInMs Maximum time to wait after the first message before completing the receive.
 *
 * @internal
 * @ignore
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
 * @ignore
 */
type EventEmitterLike<T extends Receiver | Session> = Pick<T, "once" | "removeListener" | "on">;

/**
 * The bare minimum needed to receive messages for batched
 * message receiving.
 *
 * @internal
 * @ignore
 */
export type MinimalReceiver = Pick<Receiver, "name" | "isOpen" | "credit" | "addCredit" | "drain"> &
  EventEmitterLike<Receiver> & {
    session: EventEmitterLike<Session>;
  } & {
    connection: {
      id: string;
    };
  };

/**
 * @internal
 * @ignore
 */
type MessageAndDelivery = Pick<EventContext, "message" | "delivery">;

/**
 * @internal
 * @ignore
 */
interface ReceiveMessageArgs {
  maxMessageCount: number;
  maxWaitTimeInMs: number;
  maxTimeAfterFirstMessageInMs: number;
  userAbortSignal?: AbortSignalLike;
}

/**
 * The internals of a batching receiver minus anything that would require us to hold onto a client entity context
 * or a receiver on a permanent basis.
 *
 * Usable with both session and non-session receivers.
 *
 * @internal
 * @ignore
 */
export class BatchingReceiverLite {
  constructor(
    clientEntityContext: ClientEntityContext,
    private _getCurrentReceiver: (
      abortSignal?: AbortSignalLike
    ) => Promise<MinimalReceiver | undefined>,
    private _receiveMode: InternalReceiveMode
  ) {
    this._createServiceBusMessage = (context: MessageAndDelivery) => {
      return new ServiceBusMessageImpl(
        clientEntityContext,
        context.message!,
        context.delivery!,
        true,
        this._receiveMode
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

  isReceivingMessages: boolean;

  /**
   * Receives a set of messages,
   *
   * @internal
   * @ignore
   */
  public async receiveMessages(args: ReceiveMessageArgs): Promise<ServiceBusMessageImpl[]> {
    try {
      this.isReceivingMessages = true;
      const receiver = await this._getCurrentReceiver(args.userAbortSignal);

      if (receiver == null) {
        // (was somehow closed in between the init() and the return)
        return [];
      }

      return await this._receiveMessagesImpl(receiver, args);
    } finally {
      this._closeHandler = undefined;
      this.isReceivingMessages = false;
    }
  }

  /**
   * Closes the receiver (optionally with an error), cancelling any current operations.
   *
   * @param connectionError An optional error (rhea doesn't always deliver one for certain disconnection events)
   */
  close(connectionError?: Error | AmqpError) {
    if (this._closeHandler) {
      this._closeHandler(connectionError);
      this._closeHandler = undefined;
    }
  }

  private _receiveMessagesImpl(
    receiver: MinimalReceiver,
    args: ReceiveMessageArgs
  ): Promise<ServiceBusMessageImpl[]> {
    const getRemainingWaitTimeInMs = this._getRemainingWaitTimeInMsFn(
      args.maxWaitTimeInMs,
      args.maxTimeAfterFirstMessageInMs
    );

    const brokeredMessages: ServiceBusMessageImpl[] = [];
    const loggingPrefix = `[${receiver.connection.id}|r:${receiver.name}]`;

    return new Promise<ServiceBusMessageImpl[]>((resolve, reject) => {
      let totalWaitTimer: NodeJS.Timer | undefined;

      // eslint-disable-next-line prefer-const
      let cleanupBeforeResolveOrReject: (
        shouldRemoveDrain: "removeDrainHandler" | "leaveDrainHandler"
      ) => void;

      const onError: OnAmqpEvent = (context: EventContext) => {
        cleanupBeforeResolveOrReject("removeDrainHandler");

        const eventType = context.session?.error != null ? "session_error" : "receiver_error";
        let error = context.session?.error || context.receiver?.error;

        if (error) {
          error = translate(error);
          log.error(
            `${loggingPrefix} '${eventType}' event occurred. Received an error:\n%O`,
            error
          );
        } else {
          error = new MessagingError("An error occurred while receiving messages.");
        }
        reject(error);
      };

      this._closeHandler = (error?: AmqpError | Error): void => {
        cleanupBeforeResolveOrReject("removeDrainHandler");

        if (
          // no error, just closing. Go ahead and return what we have.
          error == null ||
          // Return the collected messages if in ReceiveAndDelete mode because otherwise they are lost forever
          (this._receiveMode === InternalReceiveMode.receiveAndDelete && brokeredMessages.length)
        ) {
          log.batching(
            `${loggingPrefix} Closing. Resolving with ${brokeredMessages.length} messages.`
          );
          return resolve(brokeredMessages);
        }

        reject(translate(error));
      };

      let abortSignalCleanupFunction: (() => void) | undefined = undefined;

      // Final action to be performed after
      // - maxMessageCount is reached or
      // - maxWaitTime is passed or
      // - newMessageWaitTimeoutInSeconds is passed since the last message was received
      const finalAction = (): void => {
        cleanupBeforeResolveOrReject("leaveDrainHandler");

        // Drain any pending credits.
        if (receiver.isOpen() && receiver.credit > 0) {
          log.batching(`${loggingPrefix} Draining leftover credits(${receiver.credit}).`);

          // Setting drain must be accompanied by a flow call (aliased to addCredit in this case).
          receiver.drain = true;
          receiver.addCredit(1);
        } else {
          receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);

          log.batching(
            `${loggingPrefix} Resolving receiveMessages() with ${brokeredMessages.length} messages.`
          );
          resolve(brokeredMessages);
        }
      };

      // Action to be performed on the "message" event.
      const onReceiveMessage: OnAmqpEventAsPromise = async (context: EventContext) => {
        // TODO: this appears to be aggravating a bug that we need to look into more deeply.
        // The same timeout+drain sequence should work fine for receiveAndDelete but it appears
        // to cause problems.
        if (this._receiveMode === InternalReceiveMode.peekLock) {
          if (brokeredMessages.length === 0) {
            // We'll now remove the old timer (which was the overall `maxWaitTimeMs` timer)
            // and replace it with another timer that is a (probably) much shorter interval.
            //
            // This allows the user to get access to received messages earlier and also gives us
            // a chance to have fewer messages internally that could get lost if the user's
            // app crashes in receiveAndDelete mode.
            if (totalWaitTimer) clearTimeout(totalWaitTimer);

            totalWaitTimer = setTimeout(actionAfterWaitTimeout, getRemainingWaitTimeInMs());
          }
        }

        try {
          const data: ServiceBusMessageImpl = this._createServiceBusMessage(context);
          if (brokeredMessages.length < args.maxMessageCount) {
            brokeredMessages.push(data);
          }
        } catch (err) {
          const errObj = err instanceof Error ? err : new Error(JSON.stringify(err));
          log.error(
            `${loggingPrefix} Received an error while converting AmqpMessage to ServiceBusMessage:\n%O`,
            errObj
          );
          reject(errObj);
        }
        if (brokeredMessages.length === args.maxMessageCount) {
          finalAction();
        }
      };

      const onClose: OnAmqpEventAsPromise = async (context: EventContext) => {
        const type = context.session?.error != null ? "session_closed" : "receiver_closed";
        const error = context.session?.error || context.receiver?.error;

        if (error) {
          log.error(
            `${loggingPrefix} '${type}' event occurred. The associated error is: %O`,
            error
          );
        }
      };

      // Action to be performed on the "receiver_drained" event.
      const onReceiveDrain: OnAmqpEvent = () => {
        receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
        receiver.drain = false;

        log.batching(
          `${loggingPrefix} Drained, resolving receiveMessages() with ${brokeredMessages.length} messages.`
        );

        resolve(brokeredMessages);
      };

      cleanupBeforeResolveOrReject = (
        shouldRemoveDrain:
          | "removeDrainHandler" // remove drain handler (not waiting or initiating a drain)
          | "leaveDrainHandler" // listener for drain is removed when it is determined we dont need to drain or when drain is completed
      ): void => {
        if (receiver != null) {
          receiver.removeListener(ReceiverEvents.receiverError, onError);
          receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
          receiver.session.removeListener(SessionEvents.sessionError, onError);
          receiver.removeListener(ReceiverEvents.receiverClose, onClose);
          receiver.session.removeListener(SessionEvents.sessionClose, onClose);

          if (shouldRemoveDrain === "removeDrainHandler") {
            receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
          }
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
        cleanupBeforeResolveOrReject("removeDrainHandler");
        reject(err);
      }, args.userAbortSignal);

      // Action to be performed after the max wait time is over.
      const actionAfterWaitTimeout = (): void => {
        log.batching(
          `${loggingPrefix}  Batching, max wait time in milliseconds ${args.maxWaitTimeInMs} over.`
        );
        return finalAction();
      };

      log.batching(
        `${loggingPrefix} Adding credit for receiving ${args.maxMessageCount} messages.`
      );

      // By adding credit here, we let the service know that at max we can handle `maxMessageCount`
      // number of messages concurrently. We will return the user an array of messages that can
      // be of size upto maxMessageCount. Then the user needs to accordingly dispose
      // (complete/abandon/defer/deadletter) the messages from the array.
      receiver.addCredit(args.maxMessageCount);

      log.batching(
        `${loggingPrefix} Setting the wait timer for ${args.maxWaitTimeInMs} milliseconds.`
      );

      totalWaitTimer = setTimeout(actionAfterWaitTimeout, args.maxWaitTimeInMs);

      receiver.on(ReceiverEvents.message, onReceiveMessage);
      receiver.on(ReceiverEvents.receiverError, onError);
      receiver.on(ReceiverEvents.receiverClose, onClose);
      receiver.on(ReceiverEvents.receiverDrained, onReceiveDrain);

      receiver.session.on(SessionEvents.sessionError, onError);
      receiver.session.on(SessionEvents.sessionClose, onClose);
    });
  }
}
