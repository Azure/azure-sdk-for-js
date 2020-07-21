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
import { ReceiveMode, ServiceBusMessageImpl } from "../serviceBusMessage";
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
import { sharedOnSettled, PromiseLike } from "./shared";

/**
 * Describes the batching receiver where the user can receive a specified number of messages for
 * a predefined time.
 * @internal
 * @class BatchingReceiver
 * @extends MessageReceiver
 */
export class BatchingReceiver extends MessageReceiver {
  /**
   * @property Indicates whether the batching receiver has
   * an ongoing receive request that has not been resolved/rejected yet.
   */
  isReceivingMessages: boolean = false;
  /**
   * Instantiate a new BatchingReceiver.
   *
   * @constructor
   * @param {ClientEntityContext} context The client entity context.
   * @param {ReceiveOptions} [options]  Options for how you'd like to connect.
   */
  constructor(context: ClientEntityContext, options?: ReceiveOptions) {
    super(context, ReceiverType.batching, options);
  }

  /**
   * To be called when connection is disconnected to gracefully close ongoing receive request.
   * @param {AmqpError | Error} [connectionError] The connection error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async onDetached(connectionError?: AmqpError | Error): Promise<void> {
    // TODO: connectionError needs to get propagated?
    // Clears the token renewal timer. Closes the link and its session if they are open.
    await this._closeLink(this._receiver);

    // TODO: not quite the same, but the sentiment is there.
    this._receiver?.emit(ReceiverEvents.receiverClose, { error: connectionError });
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
    this.isReceivingMessages = true;

    try {
      log.batching(
        "[%s] Receiver '%s', setting max concurrent calls to 0.",
        this._context.namespace.connectionId,
        this.name
      );
      // while creating the receiver link for batching receiver the max concurrent calls
      // i.e. the credit_window on the link is set to zero. After the link is created
      // successfully, we add credit which is the maxMessageCount specified by the user.
      this.maxConcurrentCalls = 0;

      // const rcvrOptions = this._createReceiverOptions(false, {
      //   onMessage: onReceiveMessage,
      //   onError: onReceiveError,
      //   onSessionError: onSessionError,
      //   onSettled: onSettled,
      //   onClose: onReceiveClose,
      //   onSessionClose: onSessionClose
      // });

      await this._init(undefined, userAbortSignal);

      if (!this._receiver) {
        return [];
      }

      // .then(() => {
      //   if (!this._receiver) {
      //     // there's a really small window here where the receiver can be closed
      //     // if that happens we'll just resolve to an empty array of messages.
      //     return resolve([]);
      //   }

      //   // TODO: long-term we probably need to split the code in this promise. This check
      //   // is just a band-aid for now.
      //   if (!abortSignal?.aborted) {
      //     this._receiver.on(ReceiverEvents.receiverDrained, onReceiveDrain);
      //     addCreditAndSetTimer();
      //   }
      //   return;
      // })
      // .catch(reject);

      return await receiveMessages(
        this._receiver!,
        this.receiveMode,
        this._deliveryDispositionMap,
        maxMessageCount,
        maxWaitTimeInMs,
        maxTimeAfterFirstMessageInMs,
        (maxWaitTimeInMs, maxTimeAfterFirstMessageInMs) =>
          this._getRemainingWaitTimeInMsFn(maxWaitTimeInMs, maxTimeAfterFirstMessageInMs),
        (context) => this._getServiceBusMessage(context),
        userAbortSignal
      );
    } catch (error) {
      log.error(
        "[%s] Receiver '%s': Rejecting receiveMessages() with error %O: ",
        this._context.namespace.connectionId,
        this.name,
        error
      );
      throw error;
    } finally {
      this.isReceivingMessages = false;

      // TODO: this is something I need to think about. Should we/could we trigger the receiver error function?
      // Should we link in an abortSignal?
    }
  }

  // private _receiveImpl(
  //   maxMessageCount: number,
  //   maxWaitTimeInMs: number,
  //   maxTimeAfterFirstMessageMs: number,
  //   abortSignal?: AbortSignalLike
  // ): Promise<ServiceBusMessageImpl[]> {
  //   const getRemainingWaitTimeInMs = this._getRemainingWaitTimeInMsFn(
  //     maxWaitTimeInMs,
  //     maxTimeAfterFirstMessageMs
  //   );

  //   const brokeredMessages: ServiceBusMessageImpl[] = [];

  //   this.isReceivingMessages = true;
  //   return new Promise<ServiceBusMessageImpl[]>((resolve, reject) => {
  //     let totalWaitTimer: NodeJS.Timer | undefined;

  //     // eslint-disable-next-line prefer-const
  //     let cleanupBeforeResolveOrReject: (
  //       receiver: Receiver | undefined,
  //       shouldRemoveDrain: "removeDrainHandler" | "leaveDrainHandler"
  //     ) => void;

  //     const onSessionError: OnAmqpEvent = (context: EventContext) => {
  //       cleanupBeforeResolveOrReject(this._receiver || context.receiver!, "removeDrainHandler");

  //       const sessionError = context.session && context.session.error;
  //       let error: Error | MessagingError;
  //       if (sessionError) {
  //         error = translate(sessionError);
  //         log.error(
  //           "[%s] 'session_close' event occurred for Receiver '%s' received an error:\n%O",
  //           this._context.namespace.connectionId,
  //           this.name,
  //           error
  //         );
  //       } else {
  //         error = new MessagingError("An error occurred while receiving messages.");
  //       }
  //       reject(error);
  //     };

  //     this._connectionErrorHandler = (error: AmqpError | Error): void => {
  //       cleanupBeforeResolveOrReject(this._receiver, "removeDrainHandler");

  //       // Return the collected messages if in ReceiveAndDelete mode because otherwise they are lost forever
  //       if (this.receiveMode === ReceiveMode.receiveAndDelete && brokeredMessages.length) {
  //         log.batching(
  //           "[%s] Receiver '%s': Connection disconnected. Resolving receiveMessages() with %d messages.",
  //           this._context.namespace.connectionId,
  //           this.name,
  //           brokeredMessages.length
  //         );
  //         return resolve(brokeredMessages);
  //       }

  //       reject(translate(error));
  //     };

  //     let removeAbortSignalListenersFn: (() => void) | undefined = undefined;

  //     // Final action to be performed after
  //     // - maxMessageCount is reached or
  //     // - maxWaitTime is passed or
  //     // - newMessageWaitTimeoutInSeconds is passed since the last message was received
  //     const finalAction = (): void => {
  //       cleanupBeforeResolveOrReject(this._receiver, "leaveDrainHandler");

  //       // Drain any pending credits.
  //       if (this._receiver && this._receiver.isOpen() && this._receiver.credit > 0) {
  //         log.batching(
  //           "[%s] Receiver '%s': Draining leftover credits(%d).",
  //           this._context.namespace.connectionId,
  //           this.name,
  //           this._receiver.credit
  //         );

  //         // Setting drain must be accompanied by a flow call (aliased to addCredit in this case).
  //         this._receiver.drain = true;
  //         this._receiver.addCredit(1);
  //       } else {
  //         if (this._receiver) {
  //           this._receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
  //         }

  //         log.batching(
  //           "[%s] Receiver '%s': Resolving receiveMessages() with %d messages.",
  //           this._context.namespace.connectionId,
  //           this.name,
  //           brokeredMessages.length
  //         );
  //         resolve(brokeredMessages);
  //       }
  //     };

  //     // Action to be performed on the "message" event.
  //     const onReceiveMessage: OnAmqpEventAsPromise = async (context: EventContext) => {
  //       // TODO: this appears to be aggravating a bug that we need to look into more deeply.
  //       // The same timeout+drain sequence should work fine for receiveAndDelete but it appears
  //       // to cause problems.
  //       if (this.receiveMode === ReceiveMode.peekLock) {
  //         if (brokeredMessages.length === 0) {
  //           // We'll now remove the old timer (which was the overall `maxWaitTimeMs` timer)
  //           // and replace it with another timer that is a (probably) much shorter interval.
  //           //
  //           // This allows the user to get access to received messages earlier and also gives us
  //           // a chance to have fewer messages internally that could get lost if the user's
  //           // app crashes in receiveAndDelete mode.
  //           if (totalWaitTimer) clearTimeout(totalWaitTimer);

  //           totalWaitTimer = setTimeout(actionAfterWaitTimeout, getRemainingWaitTimeInMs());
  //         }
  //       }

  //       try {
  //         const data: ServiceBusMessageImpl = this._getServiceBusMessage(context);
  //         if (brokeredMessages.length < maxMessageCount) {
  //           brokeredMessages.push(data);
  //         }
  //       } catch (err) {
  //         const errObj = err instanceof Error ? err : new Error(JSON.stringify(err));
  //         log.error(
  //           "[%s] Receiver '%s' received an error while converting AmqpMessage to ServiceBusMessage:\n%O",
  //           this._context.namespace.connectionId,
  //           this.name,
  //           errObj
  //         );
  //         reject(errObj);
  //       }
  //       if (brokeredMessages.length === maxMessageCount) {
  //         finalAction();
  //       }
  //     };

  //     const onSessionClose: OnAmqpEventAsPromise = async (context: EventContext) => {
  //       try {
  //         const sessionError = context.session && context.session.error;
  //         if (sessionError) {
  //           log.error(
  //             "[%s] 'session_close' event occurred for receiver '%s'. The associated error is: %O",
  //             this._context.namespace.connectionId,
  //             this.name,
  //             sessionError
  //           );
  //         }
  //       } catch (err) {
  //         log.error(
  //           "[%s] Receiver '%s' error in onSessionClose handler:\n%O",
  //           this._context.namespace.connectionId,
  //           this.name,
  //           translate(err)
  //         );
  //       }
  //     };

  //     // Action to be performed on the "receiver_drained" event.
  //     const onReceiveDrain: OnAmqpEvent = () => {
  //       if (this._receiver) {
  //         this._receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
  //         this._receiver.drain = false;
  //       }

  //       log.batching(
  //         "[%s] Receiver '%s' drained. Resolving receiveMessages() with %d messages.",
  //         this._context.namespace.connectionId,
  //         this.name,
  //         brokeredMessages.length
  //       );

  //       resolve(brokeredMessages);
  //     };

  //     const onReceiveClose: OnAmqpEventAsPromise = async (context: EventContext) => {
  //       try {
  //         const receiverError = context.receiver && context.receiver.error;
  //         if (receiverError) {
  //           log.error(
  //             "[%s] 'receiver_close' event occurred. The associated error is: %O",
  //             this._context.namespace.connectionId,
  //             receiverError
  //           );
  //         }
  //       } catch (err) {
  //         log.error(
  //           "[%s] Receiver '%s' error in onClose handler:\n%O",
  //           this._context.namespace.connectionId,
  //           this.name,
  //           translate(err)
  //         );
  //       }
  //     };

  //     // Action to be taken when an error is received.
  //     const onReceiveError: OnAmqpEvent = (context: Pick<EventContext, "receiver">) => {
  //       const receiver = this._receiver || context.receiver!;
  //       cleanupBeforeResolveOrReject(receiver, "removeDrainHandler");

  //       const receiverError = context.receiver && context.receiver.error;
  //       let error: Error | MessagingError;
  //       if (receiverError) {
  //         error = translate(receiverError);
  //         log.error(
  //           "[%s] Receiver '%s' received an error:\n%O",
  //           this._context.namespace.connectionId,
  //           this.name,
  //           error
  //         );
  //       } else {
  //         error = new MessagingError("An error occurred while receiving messages.");
  //       }
  //       reject(error);
  //     };

  //     cleanupBeforeResolveOrReject = (
  //       receiver: Receiver | undefined,
  //       shouldRemoveDrain:
  //         | "removeDrainHandler" // remove drain handler (not waiting or initiating a drain)
  //         | "leaveDrainHandler" // listener for drain is removed when it is determined we dont need to drain or when drain is completed
  //     ): void => {
  //       if (receiver != null) {
  //         receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
  //         receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
  //         receiver.session.removeListener(SessionEvents.sessionError, onSessionError);

  //         if (shouldRemoveDrain === "removeDrainHandler") {
  //           receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
  //         }
  //       }

  //       if (totalWaitTimer) {
  //         clearTimeout(totalWaitTimer);
  //       }

  //       if (removeAbortSignalListenersFn) {
  //         removeAbortSignalListenersFn();
  //         removeAbortSignalListenersFn = undefined;
  //       }
  //     };

  //     removeAbortSignalListenersFn = checkAndRegisterWithAbortSignal((err) => {
  //       cleanupBeforeResolveOrReject(this._receiver, "removeDrainHandler");
  //       reject(err);
  //     }, abortSignal);

  //     // Action to be performed after the max wait time is over.
  //     const actionAfterWaitTimeout = (): void => {
  //       log.batching(
  //         "[%s] Batching Receiver '%s'  max wait time in milliseconds %d over.",
  //         this._context.namespace.connectionId,
  //         this.name,
  //         maxWaitTimeInMs
  //       );
  //       return finalAction();
  //     };

  //     const onSettled: OnAmqpEvent = (context: EventContext) => {
  //       const connectionId = this._context.namespace.connectionId;
  //       const delivery = context.delivery;
  //       sharedOnSettled(connectionId, delivery, this._deliveryDispositionMap);
  //     };

  //     const addCreditAndSetTimer = (reuse?: boolean): void => {
  //       log.batching(
  //         "[%s] Receiver '%s', adding credit for receiving %d messages.",
  //         this._context.namespace.connectionId,
  //         this.name,
  //         maxMessageCount
  //       );
  //       // By adding credit here, we let the service know that at max we can handle `maxMessageCount`
  //       // number of messages concurrently. We will return the user an array of messages that can
  //       // be of size upto maxMessageCount. Then the user needs to accordingly dispose
  //       // (complete/abandon/defer/deadletter) the messages from the array.
  //       this._receiver!.addCredit(maxMessageCount);
  //       let msg: string = "[%s] Setting the wait timer for %d milliseconds for receiver '%s'.";
  //       if (reuse) msg += " Receiver link already present, hence reusing it.";
  //       log.batching(msg, this._context.namespace.connectionId, maxWaitTimeInMs, this.name);
  //       totalWaitTimer = setTimeout(actionAfterWaitTimeout, maxWaitTimeInMs);
  //     };

  //     if (!this.isOpen()) {
  //       log.batching(
  //         "[%s] Receiver '%s', setting max concurrent calls to 0.",
  //         this._context.namespace.connectionId,
  //         this.name
  //       );
  //       // while creating the receiver link for batching receiver the max concurrent calls
  //       // i.e. the credit_window on the link is set to zero. After the link is created
  //       // successfully, we add credit which is the maxMessageCount specified by the user.
  //       this.maxConcurrentCalls = 0;
  //       const rcvrOptions = this._createReceiverOptions(false, {
  //         onMessage: onReceiveMessage,
  //         onError: onReceiveError,
  //         onSessionError: onSessionError,
  //         onSettled: onSettled,
  //         onClose: onReceiveClose,
  //         onSessionClose: onSessionClose
  //       });
  //       this._init(rcvrOptions, abortSignal)
  //         .then(() => {
  //           if (!this._receiver) {
  //             // there's a really small window here where the receiver can be closed
  //             // if that happens we'll just resolve to an empty array of messages.
  //             return resolve([]);
  //           }

  //           // TODO: long-term we probably need to split the code in this promise. This check
  //           // is just a band-aid for now.
  //           if (!abortSignal?.aborted) {
  //             this._receiver.on(ReceiverEvents.receiverDrained, onReceiveDrain);
  //             addCreditAndSetTimer();
  //           }
  //           return;
  //         })
  //         .catch(reject);
  //     } else {
  //       addCreditAndSetTimer(true);
  //       this._receiver!.on(ReceiverEvents.message, onReceiveMessage);
  //       this._receiver!.on(ReceiverEvents.receiverError, onReceiveError);
  //       this._receiver!.on(ReceiverEvents.receiverDrained, onReceiveDrain);
  //       this._receiver!.session.on(SessionEvents.sessionError, onSessionError);
  //     }
  //   });
  // }

  private _getRemainingWaitTimeInMsFn(
    maxWaitTimeInMs: number,
    maxTimeAfterFirstMessageInMs: number
  ): () => number {
    return getRemainingWaitTimeInMsFn(maxWaitTimeInMs, maxTimeAfterFirstMessageInMs);
  }

  private _getServiceBusMessage(
    context: Pick<EventContext, "message" | "delivery">
  ): ServiceBusMessageImpl {
    return new ServiceBusMessageImpl(this._context, context.message!, context.delivery!, true);
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
 * @internal
 * @ignore
 *
 * @param maxMessageCount
 * @param maxWaitTimeInMs
 * @param maxTimeAfterFirstMessageMs
 * @param userAbortSignal
 */
export function receiveMessages(
  receiver: Pick<
    Receiver,
    "name" | "once" | "isOpen" | "credit" | "addCredit" | "drain" | "removeListener" | "on"
  > & {
    session: Pick<Session, "once" | "removeListener" | "on">;
  } & {
    connection: {
      id: string;
    };
  },
  receiveMode: ReceiveMode,
  // these are _purely_ logging parameters and should be pulled out another way.
  // connectionId: string,
  deliveryDispositionMap: Map<number, PromiseLike>,
  maxMessageCount: number,
  maxWaitTimeInMs: number,
  maxTimeAfterFirstMessageMs: number,
  _getRemainingWaitTimeInMsFn: typeof getRemainingWaitTimeInMsFn,
  _getServiceBusMessage: (
    context: Pick<EventContext, "message" | "delivery">
  ) => ServiceBusMessageImpl,
  userAbortSignal?: AbortSignalLike
): Promise<ServiceBusMessageImpl[]> {
  const getRemainingWaitTimeInMs = _getRemainingWaitTimeInMsFn(
    maxWaitTimeInMs,
    maxTimeAfterFirstMessageMs
  );

  const connectionId = receiver.connection.id;

  const brokeredMessages: ServiceBusMessageImpl[] = [];

  return new Promise<ServiceBusMessageImpl[]>((resolve, reject) => {
    let totalWaitTimer: NodeJS.Timer | undefined;

    // eslint-disable-next-line prefer-const
    let cleanupBeforeResolveOrReject: (
      shouldRemoveDrain: "removeDrainHandler" | "leaveDrainHandler"
    ) => void;

    const onSessionError: OnAmqpEvent = (context: EventContext) => {
      cleanupBeforeResolveOrReject("removeDrainHandler");

      const sessionError = context.session && context.session.error;
      let error: Error | MessagingError;
      if (sessionError) {
        error = translate(sessionError);
        log.error(
          "[%s] 'session_close' event occurred for Receiver '%s' received an error:\n%O",
          connectionId,
          receiver.name, // TODO: this.name === receiver.name? Most of the time?
          error
        );
      } else {
        error = new MessagingError("An error occurred while receiving messages.");
      }
      reject(error);
    };

    // TODO: I think we can not do this by simply adding in a ...something? I'm not sure. Can I just add
    // a single event handler to the receiver (for ReceiverClose) and not bother coordinating this anywhere?

    const connectionErrorHandler = (error: AmqpError | Error): void => {
      cleanupBeforeResolveOrReject("removeDrainHandler");

      // Return the collected messages if in ReceiveAndDelete mode because otherwise they are lost forever
      if (receiveMode === ReceiveMode.receiveAndDelete && brokeredMessages.length) {
        log.batching(
          "[%s] Receiver '%s': Connection disconnected. Resolving receiveMessages() with %d messages.",
          connectionId,
          receiver.name,
          brokeredMessages.length
        );
        return resolve(brokeredMessages);
      }

      reject(translate(error));
    };

    receiver.once(ReceiverEvents.receiverError, connectionErrorHandler);
    receiver.session.once(SessionEvents.sessionError, connectionErrorHandler);

    let abortSignalCleanupFunction: (() => void) | undefined = undefined;

    // Final action to be performed after
    // - maxMessageCount is reached or
    // - maxWaitTime is passed or
    // - newMessageWaitTimeoutInSeconds is passed since the last message was received
    const finalAction = (): void => {
      cleanupBeforeResolveOrReject("leaveDrainHandler");

      // Drain any pending credits.
      if (receiver.isOpen() && receiver.credit > 0) {
        log.batching(
          "[%s] Receiver '%s': Draining leftover credits(%d).",
          connectionId,
          receiver.name,
          receiver.credit
        );

        // Setting drain must be accompanied by a flow call (aliased to addCredit in this case).
        receiver.drain = true;
        receiver.addCredit(1);
      } else {
        receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);

        log.batching(
          "[%s] Receiver '%s': Resolving receiveMessages() with %d messages.",
          connectionId,
          receiver.name,
          brokeredMessages.length
        );
        resolve(brokeredMessages);
      }
    };

    // Action to be performed on the "message" event.
    const onReceiveMessage: OnAmqpEventAsPromise = async (context: EventContext) => {
      // TODO: this appears to be aggravating a bug that we need to look into more deeply.
      // The same timeout+drain sequence should work fine for receiveAndDelete but it appears
      // to cause problems.
      if (receiveMode === ReceiveMode.peekLock) {
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
        const data: ServiceBusMessageImpl = _getServiceBusMessage(context);
        if (brokeredMessages.length < maxMessageCount) {
          brokeredMessages.push(data);
        }
      } catch (err) {
        const errObj = err instanceof Error ? err : new Error(JSON.stringify(err));
        log.error(
          "[%s] Receiver '%s' received an error while converting AmqpMessage to ServiceBusMessage:\n%O",
          connectionId,
          receiver.name,
          errObj
        );
        reject(errObj);
      }
      if (brokeredMessages.length === maxMessageCount) {
        finalAction();
      }
    };

    const onSessionClose: OnAmqpEventAsPromise = async (context: EventContext) => {
      try {
        const sessionError = context.session && context.session.error;
        if (sessionError) {
          log.error(
            "[%s] 'session_close' event occurred for receiver '%s'. The associated error is: %O",
            connectionId,
            receiver.name,
            sessionError
          );
        }
      } catch (err) {
        log.error(
          "[%s] Receiver '%s' error in onSessionClose handler:\n%O",
          connectionId,
          receiver.name,
          translate(err)
        );
      }
    };

    // Action to be performed on the "receiver_drained" event.
    const onReceiveDrain: OnAmqpEvent = () => {
      receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
      receiver.drain = false;

      log.batching(
        "[%s] Receiver '%s' drained. Resolving receiveMessages() with %d messages.",
        connectionId,
        receiver.name,
        brokeredMessages.length
      );

      resolve(brokeredMessages);
    };

    const onReceiveClose: OnAmqpEventAsPromise = async (context: EventContext) => {
      try {
        const receiverError = context.receiver && context.receiver.error;
        if (receiverError) {
          log.error(
            "[%s] 'receiver_close' event occurred. The associated error is: %O",
            connectionId,
            receiverError
          );
        }
      } catch (err) {
        log.error(
          "[%s] Receiver '%s' error in onClose handler:\n%O",
          connectionId,
          receiver.name,
          translate(err)
        );
      }
    };

    // Action to be taken when an error is received.
    const onReceiveError: OnAmqpEvent = (context: Pick<EventContext, "receiver">) => {
      cleanupBeforeResolveOrReject("removeDrainHandler");

      const receiverError = context.receiver && context.receiver.error;
      let error: Error | MessagingError;
      if (receiverError) {
        error = translate(receiverError);
        log.error("[%s] Receiver '%s' received an error:\n%O", connectionId, receiver.name, error);
      } else {
        error = new MessagingError("An error occurred while receiving messages.");
      }
      reject(error);
    };

    cleanupBeforeResolveOrReject = (
      shouldRemoveDrain:
        | "removeDrainHandler" // remove drain handler (not waiting or initiating a drain)
        | "leaveDrainHandler" // listener for drain is removed when it is determined we dont need to drain or when drain is completed
    ): void => {
      if (receiver != null) {
        receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
        receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        receiver.session.removeListener(SessionEvents.sessionError, onSessionError);

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
    }, userAbortSignal);

    // Action to be performed after the max wait time is over.
    const actionAfterWaitTimeout = (): void => {
      log.batching(
        "[%s] Batching Receiver '%s'  max wait time in milliseconds %d over.",
        connectionId,
        receiver.name,
        maxWaitTimeInMs
      );
      return finalAction();
    };

    const onSettled: OnAmqpEvent = (context: EventContext) => {
      const delivery = context.delivery;
      sharedOnSettled(connectionId, delivery, deliveryDispositionMap);
    };

    const addCreditAndSetTimer = (reuse?: boolean): void => {
      log.batching(
        "[%s] Receiver '%s', adding credit for receiving %d messages.",
        connectionId,
        receiver.name,
        maxMessageCount
      );
      // By adding credit here, we let the service know that at max we can handle `maxMessageCount`
      // number of messages concurrently. We will return the user an array of messages that can
      // be of size upto maxMessageCount. Then the user needs to accordingly dispose
      // (complete/abandon/defer/deadletter) the messages from the array.
      receiver.addCredit(maxMessageCount);
      let msg: string = "[%s] Setting the wait timer for %d milliseconds for receiver '%s'.";
      if (reuse) msg += " Receiver link already present, hence reusing it.";
      log.batching(msg, connectionId, maxWaitTimeInMs, receiver.name);
      totalWaitTimer = setTimeout(actionAfterWaitTimeout, maxWaitTimeInMs);
    };

    // while creating the receiver link for batching receiver the max concurrent calls
    // i.e. the credit_window on the link is set to zero. After the link is created
    // successfully, we add credit which is the maxMessageCount specified by the user.

    // TODO: this was an artifact of being part of the shared MessageReceiver object
    // oddly enough I don't think it would have affected anything since we override every
    // event handler.
    // this.maxConcurrentCalls = 0;

    addCreditAndSetTimer(true);
    receiver.on(ReceiverEvents.message, onReceiveMessage);

    // TODO: should these be "once" only?
    receiver.on(ReceiverEvents.receiverError, onReceiveError);
    receiver.on(ReceiverEvents.receiverDrained, onReceiveDrain);
    receiver.on(ReceiverEvents.settled, onSettled);
    receiver.session.on(SessionEvents.sessionError, onSessionError);

    // TODO: could these be the same handler? They're basically the same.
    receiver.on(ReceiverEvents.receiverClose, onReceiveClose);
    receiver.session.on(SessionEvents.sessionClose, onSessionClose);
  });
}
