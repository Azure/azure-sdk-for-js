// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "../log";
import { Constants, translate, MessagingError } from "@azure/amqp-common";
import { ReceiverEvents, EventContext, OnAmqpEvent, SessionEvents, AmqpError } from "rhea-promise";
import { ServiceBusMessage, ReceiveMode } from "../serviceBusMessage";
import {
  MessageReceiver,
  ReceiveOptions,
  ReceiverType,
  PromiseLike,
  OnAmqpEventAsPromise
} from "./messageReceiver";
import { ClientEntityContext } from "../clientEntityContext";
import { throwErrorIfConnectionClosed } from "../util/errors";

/**
 * Describes the batching receiver where the user can receive a specified number of messages for
 * a predefined time.
 * @internal
 * @class BatchingReceiver
 * @extends MessageReceiver
 */
export class BatchingReceiver extends MessageReceiver {
  /**
   * @property {boolean} isReceivingMessages Indicates whether the link is actively receiving
   * messages. Default: false.
   */
  isReceivingMessages: boolean = false;

  /**
   * @property {AmqpError | Error | undefined} detachedError Error that occured when receiver
   * got detached. Not applicable when onReceiveError is called.
   *  Default: undefined.
   */
  private detachedError: AmqpError | Error | undefined = undefined;

  private _finalActionHandler: (() => void) | undefined = undefined;

  /**
   * Instantiate a new BatchingReceiver.
   *
   * @constructor
   * @param {ClientEntityContext} context The client entity context.
   * @param {ReceiveOptions} [options]  Options for how you'd like to connect.
   */
  constructor(context: ClientEntityContext, options?: ReceiveOptions) {
    super(context, ReceiverType.batching, options);
    this.newMessageWaitTimeoutInSeconds = 1;
  }

  /**
   * Clear the token renewal timer and set the `detachedError` property.
   * @param {AmqpError | Error} [receiverError] The receiver error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async onDetached(receiverError?: AmqpError | Error): Promise<void> {
    // Clears the token renewal timer. Closes the link and its session if they are open.
    await this._closeLink(this._receiver);
    this.detachedError = receiverError;
    if (this.isReceivingMessages && typeof this._finalActionHandler === "function") {
      this._finalActionHandler();
    }
  }

  /**
   * Receives a batch of messages from a ServiceBus Queue/Topic.
   * @param maxMessageCount The maximum number of messages to receive.
   * In Peeklock mode, this number is capped at 2047 due to constraints of the underlying buffer.
   * @param maxWaitTimeInSeconds The total wait time in seconds until which the receiver will attempt to receive specified number of messages.
   * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
   * - **Default**: `60` seconds.
   * @returns {Promise<ServiceBusMessage[]>} A promise that resolves with an array of Message objects.
   */
  receive(maxMessageCount: number, maxWaitTimeInSeconds?: number): Promise<ServiceBusMessage[]> {
    throwErrorIfConnectionClosed(this._context.namespace);

    if (maxWaitTimeInSeconds == null) {
      maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
    }

    const brokeredMessages: ServiceBusMessage[] = [];

    this.isReceivingMessages = true;
    return new Promise<ServiceBusMessage[]>((resolve, reject) => {
      let totalWaitTimer: NodeJS.Timer | undefined;

      const onSessionError: OnAmqpEvent = (context: EventContext) => {
        this.isReceivingMessages = false;
        const receiver = this._receiver || context.receiver!;
        receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
        receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
        receiver.session.removeListener(SessionEvents.sessionError, onSessionError);

        const sessionError = context.session && context.session.error;
        let error = new MessagingError("An error occurred while receiving messages.");
        if (sessionError) {
          error = translate(sessionError);
          log.error(
            "[%s] 'session_close' event occurred for Receiver '%s' received an error:\n%O",
            this._context.namespace.connectionId,
            this.name,
            error
          );
        }
        if (totalWaitTimer) {
          clearTimeout(totalWaitTimer);
        }
        if (this._newMessageReceivedTimer) {
          clearTimeout(this._newMessageReceivedTimer);
        }
        reject(error);
      };

      // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
      const finalAction = (this._finalActionHandler = (): void => {
        // clear finalActionHandler so that it can't be called multiple times.
        this._finalActionHandler = undefined;
        if (this._newMessageReceivedTimer) {
          clearTimeout(this._newMessageReceivedTimer);
        }
        if (totalWaitTimer) {
          clearTimeout(totalWaitTimer);
        }

        // Removing listeners, so that the next receiveMessages() call can set them again.
        if (this._receiver) {
          this._receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
          this._receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
          this._receiver.session.removeListener(SessionEvents.sessionError, onSessionError);
        }

        // When receiveMode is in receiveAndDelete mode, we should return those messages to the user
        // because they have already been removed from service bus and are safe to handle.
        // If there haven't been any received messages, then it's safe to reject the promise
        // so that the user knows there was an underlying issue that prevented receiving messages.
        if (
          this.detachedError &&
          (this.receiveMode !== ReceiveMode.receiveAndDelete || brokeredMessages.length === 0)
        ) {
          if (this._receiver) {
            this._receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
          }
          this.isReceivingMessages = false;
          const err = translate(this.detachedError);
          return reject(err);
        }

        // If the receiver has been detached, there is no need to drain.
        if (this._receiver && this._receiver.credit > 0 && !this.detachedError) {
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

          this.isReceivingMessages = false;
          log.batching(
            "[%s] Receiver '%s': Resolving receiveMessages() with %d messages.",
            this._context.namespace.connectionId,
            this.name,
            brokeredMessages.length
          );
          resolve(brokeredMessages);
        }
      });

      // Action to be performed on the "message" event.
      const onReceiveMessage: OnAmqpEventAsPromise = async (context: EventContext) => {
        this.resetTimerOnNewMessageReceived();
        try {
          const data: ServiceBusMessage = new ServiceBusMessage(
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
          this.isReceivingMessages = false;
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

        this.isReceivingMessages = false;

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
          this.isReceivingMessages = false;
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
      const onReceiveError: OnAmqpEvent = (context: EventContext) => {
        this.isReceivingMessages = false;
        const receiver = this._receiver || context.receiver!;
        receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
        receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        receiver.removeListener(ReceiverEvents.receiverDrained, onReceiveDrain);
        receiver.session.removeListener(SessionEvents.sessionError, onSessionError);

        const receiverError = context.receiver && context.receiver.error;
        let error = new MessagingError("An error occurred while receiving messages.");
        if (receiverError) {
          error = translate(receiverError);
          log.error(
            "[%s] Receiver '%s' received an error:\n%O",
            this._context.namespace.connectionId,
            this.name,
            error
          );
        }
        if (totalWaitTimer) {
          clearTimeout(totalWaitTimer);
        }
        if (this._newMessageReceivedTimer) {
          clearTimeout(this._newMessageReceivedTimer);
        }
        reject(error);
      };

      // Use new message wait timer only in peekLock mode
      if (this.receiveMode === ReceiveMode.peekLock) {
        /**
         * Resets the timer when a new message is received. If no messages were received for
         * `newMessageWaitTimeoutInSeconds`, the messages received till now are returned. The
         * receiver link stays open for the next receive call, but doesnt receive messages until then.
         */
        this.resetTimerOnNewMessageReceived = () => {
          if (this._newMessageReceivedTimer) clearTimeout(this._newMessageReceivedTimer);
          if (this.newMessageWaitTimeoutInSeconds) {
            this._newMessageReceivedTimer = setTimeout(async () => {
              const msg =
                `BatchingReceiver '${this.name}' did not receive any messages in the last ` +
                `${this.newMessageWaitTimeoutInSeconds} seconds. ` +
                `Hence ending this batch receive operation.`;
              log.error("[%s] %s", this._context.namespace.connectionId, msg);
              finalAction();
            }, this.newMessageWaitTimeoutInSeconds * 1000);
          }
        };
      }

      // Action to be performed after the max wait time is over.
      const actionAfterWaitTimeout = (): void => {
        log.batching(
          "[%s] Batching Receiver '%s'  max wait time in seconds %d over.",
          this._context.namespace.connectionId,
          this.name,
          maxWaitTimeInSeconds
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
        let msg: string = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
        if (reuse) msg += " Receiver link already present, hence reusing it.";
        log.batching(msg, this._context.namespace.connectionId, maxWaitTimeInSeconds, this.name);
        totalWaitTimer = setTimeout(
          actionAfterWaitTimeout,
          (maxWaitTimeInSeconds as number) * 1000
        );
        // TODO: Disabling this for now. We would want to give the user a decent chance to receive
        // the first message and only timeout faster if successive messages from there onwards are
        // not received quickly. However, it may be possible that there are no pending messages
        // currently on the queue. In that case waiting for idleTimeoutInSeconds would be
        // unnecessary.
        // There is a management plane API to get runtimeInfo of the Queue which provides
        // information about active messages on the Queue and it's sub Queues. However, this adds
        // a little complexity. If the first message was delayed due to network latency then there
        // are bright chances that the management plane api would receive the same fate.
        // It would be better to weigh all the options before making a decision.
        // resetTimerOnNewMessageReceived();
      };

      if (!this.isOpen()) {
        // clear detachedError since we are reconnecting.
        this.detachedError = undefined;
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
        this._init(rcvrOptions)
          .then(() => {
            this._receiver!.on(ReceiverEvents.receiverDrained, onReceiveDrain);
            addCreditAndSetTimer();
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
