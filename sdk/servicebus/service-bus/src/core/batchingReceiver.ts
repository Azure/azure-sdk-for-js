// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as log from "../log";
import { Constants, MessagingError, translate } from "@azure/core-amqp";
import {
  AmqpError,
  EventContext,
  OnAmqpEvent,
  ReceiverEvents,
  SessionEvents,
  Receiver
} from "rhea-promise";
import { ReceiveMode, ServiceBusMessageImpl } from "../serviceBusMessage";
import {
  MessageReceiver,
  OnAmqpEventAsPromise,
  PromiseLike,
  ReceiveOptions,
  ReceiverType
} from "./messageReceiver";
import { ClientEntityContext } from "../clientEntityContext";
import { throwErrorIfConnectionClosed } from "../util/errors";
import { AbortSignalLike } from "@azure/core-http";
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
   * @property Indicates whether the batching receiver has
   * an ongoing receive request that has not been resolved/rejected yet.
   */
  isReceivingMessages: boolean = false;

  /**
   * A function to resolve/reject the ongoing receive request when
   * encountering an error on the AMQP connection.
   * Will be undefined if there is no ongoing receive request.
   * @param error The error on the AMQP connection.
   */
  private _connectionErrorHandler: ((error: AmqpError | Error) => void) | undefined;

  /**
   * Instantiate a new BatchingReceiver.
   *
   * @constructor
   * @param {ClientEntityContext} context The client entity context.
   * @param {ReceiveOptions} [options]  Options for how you'd like to connect.
   */
  constructor(context: ClientEntityContext, options?: ReceiveOptions) {
    super(context, ReceiverType.batching, options);
    this.newMessageWaitTimeoutInMs = 1000;
  }

  /**
   * To be called when connection is disconnected to gracefully close ongoing receive request.
   * @param {AmqpError | Error} [connectionError] The connection error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async onDetached(connectionError?: AmqpError | Error): Promise<void> {
    // Clears the token renewal timer. Closes the link and its session if they are open.
    await this._closeLink(this._receiver);

    if (typeof this._connectionErrorHandler !== "function") {
      // There is no ongoing receive request, so nothing to do here.
      return;
    }

    // There are times when rhea fires the `disconnect` event without any error asscoiated with it.
    // Make up the error for such cases, as we have to report an error to the user.
    if (!connectionError) {
      connectionError = new Error(
        "Unknown error occurred on the AMQP connection while receiving messages."
      );
    }

    this._connectionErrorHandler(connectionError);
  }

  /**
   * Receives a batch of messages from a ServiceBus Queue/Topic.
   * @param maxMessageCount The maximum number of messages to receive.
   * In Peeklock mode, this number is capped at 2047 due to constraints of the underlying buffer.
   * @param maxWaitTimeInMs The total wait time in milliseconds until which the receiver will attempt to receive specified number of messages.
   * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
   * @returns {Promise<ServiceBusMessageImpl[]>} A promise that resolves with an array of Message objects.
   */
  async receive(
    maxMessageCount: number,
    maxWaitTimeInMs?: number,
    abortSignal?: AbortSignalLike
  ): Promise<ServiceBusMessageImpl[]> {
    throwErrorIfConnectionClosed(this._context.namespace);

    if (maxWaitTimeInMs == null) {
      maxWaitTimeInMs = Constants.defaultOperationTimeoutInMs;
    }

    this.isReceivingMessages = true;

    try {
      return await this._receiveImpl(maxMessageCount, maxWaitTimeInMs, abortSignal);
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
      this._connectionErrorHandler = undefined;
    }
  }

  private _receiveImpl(
    maxMessageCount: number,
    maxWaitTimeInMs: number,
    abortSignal?: AbortSignalLike
  ): Promise<ServiceBusMessageImpl[]> {
    const brokeredMessages: ServiceBusMessageImpl[] = [];

    this.isReceivingMessages = true;
    return new Promise<ServiceBusMessageImpl[]>((resolve, reject) => {
      let totalWaitTimer: NodeJS.Timer | undefined;

      // eslint-disable-next-line prefer-const
      let cleanupBeforeResolveOrReject: (
        receiver: Receiver | undefined,
        shouldRemoveDrain: "removeDrainHandler" | "leaveDrainHandler"
      ) => void;

      const onSessionError: OnAmqpEvent = (context: EventContext) => {
        cleanupBeforeResolveOrReject(this._receiver || context.receiver!, "removeDrainHandler");

        const sessionError = context.session && context.session.error;
        let error: Error | MessagingError;
        if (sessionError) {
          error = translate(sessionError);
          log.error(
            "[%s] 'session_close' event occurred for Receiver '%s' received an error:\n%O",
            this._context.namespace.connectionId,
            this.name,
            error
          );
        } else {
          error = new MessagingError("An error occurred while receiving messages.");
        }
        reject(error);
      };

      this._connectionErrorHandler = (error: AmqpError | Error): void => {
        cleanupBeforeResolveOrReject(this._receiver, "removeDrainHandler");

        // Return the collected messages if in ReceiveAndDelete mode because otherwise they are lost forever
        if (this.receiveMode === ReceiveMode.receiveAndDelete && brokeredMessages.length) {
          log.batching(
            "[%s] Receiver '%s': Connection disconnected. Resolving receiveMessages() with %d messages.",
            this._context.namespace.connectionId,
            this.name,
            brokeredMessages.length
          );
          return resolve(brokeredMessages);
        }

        reject(translate(error));
      };

      let removeAbortSignalListenersFn: (() => void) | undefined = undefined;

      // Final action to be performed after
      // - maxMessageCount is reached or
      // - maxWaitTime is passed or
      // - newMessageWaitTimeoutInSeconds is passed since the last message was received
      const finalAction = (): void => {
        cleanupBeforeResolveOrReject(this._receiver, "leaveDrainHandler");

        // Drain any pending credits.
        if (this._receiver && this._receiver.isOpen() && this._receiver.credit > 0) {
          log.batching(
            "[%s] Receiver '%s': Draining leftover credits(%d).",
            this._context.namespace.connectionId,
            this.name,
            this._receiver.credit
          );

          // Setting drain must be accompanied by a flow call (aliased to addCredit in this case).
          this._receiver.drain = true;
          this._receiver.addCredit(1);
        } else {
          if (this._receiver) {
            this._receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
          }

          log.batching(
            "[%s] Receiver '%s': Resolving receiveMessages() with %d messages.",
            this._context.namespace.connectionId,
            this.name,
            brokeredMessages.length
          );
          resolve(brokeredMessages);
        }
      };

      // Action to be performed on the "message" event.
      const onReceiveMessage: OnAmqpEventAsPromise = async (context: EventContext) => {
        this.resetTimerOnNewMessageReceived();
        try {
          const data: ServiceBusMessageImpl = new ServiceBusMessageImpl(
            this._context,
            context.message!,
            context.delivery!,
            true
          );
          if (brokeredMessages.length < maxMessageCount) {
            brokeredMessages.push(data);
          }
        } catch (err) {
          const errObj = err instanceof Error ? err : new Error(JSON.stringify(err));
          log.error(
            "[%s] Receiver '%s' received an error while converting AmqpMessage to ServiceBusMessage:\n%O",
            this._context.namespace.connectionId,
            this.name,
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
              this._context.namespace.connectionId,
              this.name,
              sessionError
            );
          }
        } catch (err) {
          log.error(
            "[%s] Receiver '%s' error in onSessionClose handler:\n%O",
            this._context.namespace.connectionId,
            this.name,
            translate(err)
          );
        }
      };

      // Action to be performed on the "receiver_drained" event.
      const onReceiveDrain: OnAmqpEvent = () => {
        if (this._receiver) {
          this._receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
          this._receiver.drain = false;
        }

        log.batching(
          "[%s] Receiver '%s' drained. Resolving receiveMessages() with %d messages.",
          this._context.namespace.connectionId,
          this.name,
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
              this._context.namespace.connectionId,
              receiverError
            );
          }
        } catch (err) {
          log.error(
            "[%s] Receiver '%s' error in onClose handler:\n%O",
            this._context.namespace.connectionId,
            this.name,
            translate(err)
          );
        }
      };

      // Action to be taken when an error is received.
      const onReceiveError: OnAmqpEvent = (context: Pick<EventContext, "receiver">) => {
        const receiver = this._receiver || context.receiver!;
        cleanupBeforeResolveOrReject(receiver, "removeDrainHandler");

        const receiverError = context.receiver && context.receiver.error;
        let error: Error | MessagingError;
        if (receiverError) {
          error = translate(receiverError);
          log.error(
            "[%s] Receiver '%s' received an error:\n%O",
            this._context.namespace.connectionId,
            this.name,
            error
          );
        } else {
          error = new MessagingError("An error occurred while receiving messages.");
        }
        reject(error);
      };

      cleanupBeforeResolveOrReject = (
        receiver: Receiver | undefined,
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
        if (this._newMessageReceivedTimer) {
          clearTimeout(this._newMessageReceivedTimer);
        }

        if (removeAbortSignalListenersFn) {
          removeAbortSignalListenersFn();
          removeAbortSignalListenersFn = undefined;
        }
      };

      removeAbortSignalListenersFn = checkAndRegisterWithAbortSignal((err) => {
        cleanupBeforeResolveOrReject(this._receiver, "removeDrainHandler");
        reject(err);
      }, abortSignal);

      // Use new message wait timer only in peekLock mode
      if (this.receiveMode === ReceiveMode.peekLock) {
        /**
         * Resets the timer when a new message is received. If no messages were received for
         * `newMessageWaitTimeoutInMs`, the messages received till now are returned. The
         * receiver link stays open for the next receive call, but doesn't receive messages until then.
         */
        this.resetTimerOnNewMessageReceived = () => {
          if (this._newMessageReceivedTimer) clearTimeout(this._newMessageReceivedTimer);
          if (this.newMessageWaitTimeoutInMs) {
            this._newMessageReceivedTimer = setTimeout(async () => {
              const msg =
                `BatchingReceiver '${this.name}' did not receive any messages in the last ` +
                `${this.newMessageWaitTimeoutInMs} milliseconds. ` +
                `Hence ending this batch receive operation.`;
              log.error("[%s] %s", this._context.namespace.connectionId, msg);
              finalAction();
            }, this.newMessageWaitTimeoutInMs);
          }
        };
      }

      // Action to be performed after the max wait time is over.
      const actionAfterWaitTimeout = (): void => {
        log.batching(
          "[%s] Batching Receiver '%s'  max wait time in milliseconds %d over.",
          this._context.namespace.connectionId,
          this.name,
          maxWaitTimeInMs
        );
        return finalAction();
      };

      const onSettled: OnAmqpEvent = (context: EventContext) => {
        const connectionId = this._context.namespace.connectionId;
        const delivery = context.delivery;
        if (delivery) {
          const id = delivery.id;
          const state = delivery.remote_state;
          const settled = delivery.remote_settled;
          log.receiver(
            "[%s] Delivery with id %d, remote_settled: %s, remote_state: %o has been " +
              "received.",
            connectionId,
            id,
            settled,
            state && state.error ? state.error : state
          );
          if (settled && this._deliveryDispositionMap.has(id)) {
            const promise = this._deliveryDispositionMap.get(id) as PromiseLike;
            clearTimeout(promise.timer);
            log.receiver(
              "[%s] Found the delivery with id %d in the map and cleared the timer.",
              connectionId,
              id
            );
            const deleteResult = this._deliveryDispositionMap.delete(id);
            log.receiver(
              "[%s] Successfully deleted the delivery with id %d from the map.",
              connectionId,
              id,
              deleteResult
            );
            if (state && state.error && (state.error.condition || state.error.description)) {
              const error = translate(state.error);
              return promise.reject(error);
            }

            return promise.resolve();
          }
        }
      };

      const addCreditAndSetTimer = (reuse?: boolean): void => {
        log.batching(
          "[%s] Receiver '%s', adding credit for receiving %d messages.",
          this._context.namespace.connectionId,
          this.name,
          maxMessageCount
        );
        // By adding credit here, we let the service know that at max we can handle `maxMessageCount`
        // number of messages concurrently. We will return the user an array of messages that can
        // be of size upto maxMessageCount. Then the user needs to accordingly dispose
        // (complete/abandon/defer/deadletter) the messages from the array.
        this._receiver!.addCredit(maxMessageCount);
        let msg: string = "[%s] Setting the wait timer for %d milliseconds for receiver '%s'.";
        if (reuse) msg += " Receiver link already present, hence reusing it.";
        log.batching(msg, this._context.namespace.connectionId, maxWaitTimeInMs, this.name);
        totalWaitTimer = setTimeout(actionAfterWaitTimeout, maxWaitTimeInMs);
        // TODO: Disabling this for now. We would want to give the user a decent chance to receive
        // the first message and only timeout faster if successive messages from there onwards are
        // not received quickly. However, it may be possible that there are no pending messages
        // currently on the queue. In that case waiting for idleTimeoutInMs would be
        // unnecessary.
        // There is a management plane API to get runtimeInfo of the Queue which provides
        // information about active messages on the Queue and it's sub Queues. However, this adds
        // a little complexity. If the first message was delayed due to network latency then there
        // are bright chances that the management plane api would receive the same fate.
        // It would be better to weigh all the options before making a decision.
        // resetTimerOnNewMessageReceived();
      };

      if (!this.isOpen()) {
        log.batching(
          "[%s] Receiver '%s', setting max concurrent calls to 0.",
          this._context.namespace.connectionId,
          this.name
        );
        // while creating the receiver link for batching receiver the max concurrent calls
        // i.e. the credit_window on the link is set to zero. After the link is created
        // successfully, we add credit which is the maxMessageCount specified by the user.
        this.maxConcurrentCalls = 0;
        const rcvrOptions = this._createReceiverOptions(false, {
          onMessage: onReceiveMessage,
          onError: onReceiveError,
          onSessionError: onSessionError,
          onSettled: onSettled,
          onClose: onReceiveClose,
          onSessionClose: onSessionClose
        });
        this._init(rcvrOptions, abortSignal)
          .then(() => {
            if (!this._receiver) {
              // there's a really small window here where the receiver can be closed
              // if that happens we'll just resolve to an empty array of messages.
              return resolve([]);
            }

            // TODO: long-term we probably need to split the code in this promise. This check
            // is just a band-aid for now.
            if (!abortSignal?.aborted) {
              this._receiver.on(ReceiverEvents.receiverDrained, onReceiveDrain);
              addCreditAndSetTimer();
            }
            return;
          })
          .catch(reject);
      } else {
        addCreditAndSetTimer(true);
        this._receiver!.on(ReceiverEvents.message, onReceiveMessage);
        this._receiver!.on(ReceiverEvents.receiverError, onReceiveError);
        this._receiver!.on(ReceiverEvents.receiverDrained, onReceiveDrain);
        this._receiver!.session.on(SessionEvents.sessionError, onSessionError);
      }
    });
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
