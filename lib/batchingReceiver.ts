// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import { Func, Constants, translate } from "./amqp-common";
import { ReceiverEvents, EventContext, OnAmqpEvent } from "./rhea-promise";
import { Message } from "./message";
import { MessageReceiver, ReceiveOptions, ReceiverType } from "./messageReceiver";
import { ClientEntityContext } from "./clientEntityContext";

const debug = debugModule("azure:service-bus:receiverbatching");

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
   * @returns {Promise<Message[]>} A promise that resolves with an array of Message objects.
   */
  receive(maxMessageCount: number, maxWaitTimeInSeconds?: number): Promise<Message[]> {
    if (!maxMessageCount || (maxMessageCount && typeof maxMessageCount !== 'number')) {
      throw new Error("'maxMessageCount' is a required parameter of type number with a value " +
        "greater than 0.");
    }

    if (maxWaitTimeInSeconds == undefined) {
      maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
    }

    const brokeredMessages: Message[] = [];
    let timeOver = false;
    this.isReceivingMessages = true;
    return new Promise<Message[]>((resolve, reject) => {
      let onReceiveMessage: OnAmqpEvent;
      let onReceiveError: OnAmqpEvent;
      let waitTimer: any;
      let actionAfterWaitTimeout: Func<void, void>;
      const resetCreditWindow = () => {
        this._receiver!.setCreditWindow(0);
        this._receiver!.addCredit(0);
      };
      // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
      const finalAction = (timeOver: boolean, data?: Message) => {
        // Resetting the mode. Now anyone can call start() or receive() again.
        this._receiver!.removeHandler(ReceiverEvents.receiverError, onReceiveError);
        this._receiver!.removeHandler(ReceiverEvents.message, onReceiveMessage);
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
        return finalAction(timeOver);
      };

      // Action to be performed on the "message" event.
      onReceiveMessage = (context: EventContext) => {
        const data: Message = new Message(context.message!, context.delivery!);
        data.body = this._context.namespace.dataTransformer.decode(context.message!.body);
        if (brokeredMessages.length <= maxMessageCount) {
          brokeredMessages.push(data);
        }
        if (brokeredMessages.length === maxMessageCount) {
          finalAction(timeOver, data);
        }
      };

      // Action to be taken when an error is received.
      onReceiveError = (context: EventContext) => {
        this._receiver!.removeHandler(ReceiverEvents.receiverError, onReceiveError);
        this._receiver!.removeHandler(ReceiverEvents.message, onReceiveMessage);
        const error = translate(context.receiver!.error!);
        debug("[%s] Receiver '%s' received an error:\n%O",
          this._context.namespace.connectionId, this.id, error);
        if (waitTimer) {
          clearTimeout(waitTimer);
        }
        resetCreditWindow();
        this.isReceivingMessages = false;
        reject(error);
      };

      const addCreditAndSetTimer = (reuse?: boolean) => {
        debug("[%s] Receiver '%s', adding credit for receiving %d messages.",
          this._context.namespace.connectionId, this.id, maxMessageCount);
        this._receiver!.addCredit(maxMessageCount);
        let msg: string = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
        if (reuse) msg += " Receiver link already present, hence reusing it.";
        debug(msg, this._context.namespace.connectionId, maxWaitTimeInSeconds, this.id);
        waitTimer = setTimeout(actionAfterWaitTimeout, (maxWaitTimeInSeconds as number) * 1000);
      };

      if (!this.isOpen()) {
        debug("[%s] Receiver '%s', setting the prefetch count to 0.",
          this._context.namespace.connectionId, this.id);
        this.maxConcurrentCalls = 0;
        this._init(onReceiveMessage, onReceiveError).then(() => addCreditAndSetTimer()).catch(reject);
      } else {
        addCreditAndSetTimer(true);
        this._receiver!.registerHandler(ReceiverEvents.message, onReceiveMessage);
        this._receiver!.registerHandler(ReceiverEvents.receiverError, onReceiveError);
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
