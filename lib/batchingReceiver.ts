// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "./log";
import { Func, Constants, translate, MessagingError } from "@azure/amqp-common";
import { ReceiverEvents, EventContext, OnAmqpEvent, SessionEvents } from "rhea-promise";
import { ServiceBusMessage } from "./serviceBusMessage";
import { MessageReceiver, ReceiveOptions, ReceiverType, PromiseLike } from "./messageReceiver";
import { ClientEntityContext } from "./clientEntityContext";

/**
 * Describes the batching receiver where the user can receive a specified number of messages for
 * a predefined time.
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
   * Receive a batch of Message objects from a ServiceBus Queue/Topic for a given count and
   * a given max wait time in seconds, whichever happens first. This method can be used directly
   * after creating the receiver object and **MUST NOT** be used along with the `start()` method.
   *
   * @param {number} maxMessageCount The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds] The maximum wait time in seconds for which the Receiver
   * should wait to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @returns {Promise<ServiceBusMessage[]>} A promise that resolves with an array of Message objects.
   */
  receive(maxMessageCount: number, maxWaitTimeInSeconds?: number): Promise<ServiceBusMessage[]> {
    if (!maxMessageCount || (maxMessageCount && typeof maxMessageCount !== 'number')) {
      throw new Error("'maxMessageCount' is a required parameter of type number with a value " +
        "greater than 0.");
    }

    if (maxWaitTimeInSeconds == undefined) {
      maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
    }

    const brokeredMessages: ServiceBusMessage[] = [];
    let timeOver = false;
    this.isReceivingMessages = true;
    return new Promise<ServiceBusMessage[]>((resolve, reject) => {
      let onReceiveMessage: OnAmqpEvent;
      let onReceiveError: OnAmqpEvent;
      let onReceiveClose: OnAmqpEvent;
      let onSessionError: OnAmqpEvent;
      let onSessionClose: OnAmqpEvent;
      let onSettled: OnAmqpEvent;
      let waitTimer: any;
      let actionAfterWaitTimeout: Func<void, void>;
      const resetCreditWindow = () => {
        this._receiver!.setCreditWindow(0);
        this._receiver!.addCredit(0);
      };
      // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
      const finalAction = (timeOver: boolean, data?: ServiceBusMessage) => {
        // Resetting the mode. Now anyone can call start() or receive() again.
        if (this._receiver) {
          this._receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
          this._receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        }
        if (!data) {
          data = brokeredMessages.length ? brokeredMessages[brokeredMessages.length - 1] : undefined;
        }
        if (!timeOver) {
          clearTimeout(waitTimer);
        }
        resetCreditWindow();
        this.isReceivingMessages = false;
        resolve(brokeredMessages);
      };

      // Action to be performed after the max wait time is over.
      actionAfterWaitTimeout = () => {
        timeOver = true;
        log.batching("[%s] Batching Receiver '%s'  max wait time in seconds %d over.",
          this._context.namespace.connectionId, this.name, maxWaitTimeInSeconds);
        return finalAction(timeOver);
      };

      // Action to be performed on the "message" event.
      onReceiveMessage = (context: EventContext) => {
        const data: ServiceBusMessage = new ServiceBusMessage(this._context,
          context.message!, context.delivery!);
        if (brokeredMessages.length <= maxMessageCount) {
          brokeredMessages.push(data);
        }
        if (brokeredMessages.length === maxMessageCount) {
          finalAction(timeOver, data);
        }
      };

      // Action to be taken when an error is received.
      onReceiveError = (context: EventContext) => {
        this.isReceivingMessages = false;
        const receiver = this._receiver || context.receiver!;
        receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
        receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        receiver.session.removeListener(SessionEvents.sessionError, onSessionError);

        const receiverError = context.receiver && context.receiver.error;
        let error = new MessagingError("An error occuured while receiving messages.");
        if (receiverError) {
          error = translate(receiverError);
          log.error("[%s] Receiver '%s' received an error:\n%O",
            this._context.namespace.connectionId, this.name, error);
        }
        if (waitTimer) {
          clearTimeout(waitTimer);
        }
        reject(error);
      };

      onReceiveClose = async (context: EventContext) => {
        this.isReceivingMessages = false;
        const receiverError = context.receiver && context.receiver.error;
        if (receiverError) {
          log.error("[%s] 'receiver_close' event occurred. The associated error is: %O",
            this._context.namespace.connectionId, receiverError);
        }
      };

      onSessionClose = async (context: EventContext) => {
        this.isReceivingMessages = false;
        const sessionError = context.session && context.session.error;
        if (sessionError) {
          log.error("[%s] 'session_close' event occurred for receiver '%s'. The associated error is: %O",
            this._context.namespace.connectionId, this.name, sessionError);
        }
      };

      onSessionError = (context: EventContext) => {
        this.isReceivingMessages = false;
        const receiver = this._receiver || context.receiver!;
        receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
        receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        receiver.session.removeListener(SessionEvents.sessionError, onReceiveError);
        const sessionError = context.session && context.session.error;
        let error = new MessagingError("An error occuured while receiving messages.");
        if (sessionError) {
          error = translate(sessionError);
          log.error("[%s] 'session_close' event occurred for Receiver '%s' received an error:\n%O",
            this._context.namespace.connectionId, this.name, error);
        }
        if (waitTimer) {
          clearTimeout(waitTimer);
        }
        reject(error);
      };

      onSettled = async (context: EventContext) => {
        const connectionId = this._context.namespace.connectionId;
        const delivery = context.delivery;
        if (delivery) {
          const id = delivery.id;
          const state = delivery.remote_state;
          const settled = delivery.remote_settled;
          log.receiver("[%s] Delivery with id %d, remote_settled: %s, remote_state: %o has been " +
            "received.", connectionId, id, settled, state && state.error ? state.error : state);
          if (settled && this._deliveryDispositionMap.has(id)) {
            const promise = this._deliveryDispositionMap.get(id) as PromiseLike;
            log.receiver("[%s] Found the delivery with id %d in the map.", connectionId, id);
            const deleteResult = this._deliveryDispositionMap.delete(id);
            log.receiver("[%s] Successfully deleted the delivery with id %d from the map.",
              connectionId, id, deleteResult);
            if (state && state.error && (state.error.condition || state.error.description)) {
              const error = translate(state.error);
              return promise.reject(error);
            }

            return promise.resolve();
          }
        }
      };

      const addCreditAndSetTimer = (reuse?: boolean) => {
        log.batching("[%s] Receiver '%s', adding credit for receiving %d messages.",
          this._context.namespace.connectionId, this.name, maxMessageCount);
        // By adding credit here, we let the service know that at max we can handle `maxMessageCount`
        // number of messages concurrently. We will return the user an array of messages that can
        // be of size upto maxMessageCount. Then the user needs to accordingly dispose
        // (complete,/abandon/defer/deadletter) the messages from the array.
        this._receiver!.addCredit(maxMessageCount);
        let msg: string = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
        if (reuse) msg += " Receiver link already present, hence reusing it.";
        log.batching(msg, this._context.namespace.connectionId, maxWaitTimeInSeconds, this.name);
        waitTimer = setTimeout(actionAfterWaitTimeout, (maxWaitTimeInSeconds as number) * 1000);
      };

      if (!this.isOpen()) {
        log.batching("[%s] Receiver '%s', setting max concurrent calls to 0.",
          this._context.namespace.connectionId, this.name);
        // while creating the receiver link for batching receiver the max concurrent calls
        // i.e. the credit_window on the link is set to zero. After the link is created
        // successfully, we add credit which is the maxMessageCount specified by the user.
        this.maxConcurrentCalls = 0;
        const rcvrOptions = this._createReceiverOptions({
          onMessage: onReceiveMessage,
          onError: onReceiveError,
          onClose: onReceiveClose,
          onSessionError: onSessionError,
          onSessionClose: onSessionClose,
          onSettled: onSettled
        });
        this._init(rcvrOptions).then(() => addCreditAndSetTimer()).catch(reject);
      } else {
        addCreditAndSetTimer(true);
        this._receiver!.on(ReceiverEvents.message, onReceiveMessage);
        this._receiver!.on(ReceiverEvents.receiverError, onReceiveError);
        this._receiver!.session.on(SessionEvents.sessionError, onReceiveError);
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
    const bReceiver = new BatchingReceiver(context, options);
    context.batchingReceiver = bReceiver;
    return bReceiver;
  }
}
