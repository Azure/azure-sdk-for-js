// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import { ReceiverEvents, EventContext, OnAmqpEvent, SessionEvents } from "./rhea-promise";
import { EventData } from "./eventData";
import { ReceiveOptions } from "./eventHubClient";
import { EventHubReceiver } from "./eventHubReceiver";
import { ConnectionContext } from "./connectionContext";
import { translate, Func, Constants, MessagingError } from "./amqp-common";

const debug = debugModule("azure:event-hubs:receiverbatching");


/**
 * Describes the batching receiver where the user can receive a specified number of messages for a predefined time.
 * @class BatchingReceiver
 * @extends EventHubReceiver
 */
export class BatchingReceiver extends EventHubReceiver {

  /**
   * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
   *
   * @constructor
   * @param {ConnectionContext} context                        The connection context.
   * @param {string} partitionId                               Partition ID from which to receive.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
   * @param {string} [options.consumerGroup]                   Consumer group from which to receive.
   * @param {number} [options.prefetchCount]                   The upper limit of events this receiver will
   * actively receive regardless of whether a receive operation is pending.
   * @param {boolean} [options.enableReceiverRuntimeMetric]    Provides the approximate receiver runtime information
   * for a logical partition of an Event Hub if the value is true. Default false.
   * @param {number} [options.epoch]                           The epoch value that this receiver is currently
   * using for partition ownership. A value of undefined means this receiver is not an epoch-based receiver.
   * @param {EventPosition} [options.eventPosition]            The position of EventData in the EventHub parition from
   * where the receiver should start receiving. Only one of offset, sequenceNumber, enqueuedTime, customFilter can be specified.
   * `EventPosition.withCustomFilter()` should be used if you want more fine-grained control of the filtering.
   * See https://github.com/Azure/amqpnetlite/wiki/Azure%20Service%20Bus%20Event%20Hubs for details.
   */
  constructor(context: ConnectionContext, partitionId: string | number, options?: ReceiveOptions) {
    super(context, partitionId, options);
  }

  /**
   * Receive a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
   * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
   *
   * @param {number} maxMessageCount                 The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds]          The maximum wait time in seconds for which the Receiver should wait
   * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @returns {Promise<EventData[]>} A promise that resolves with an array of EventData objects.
   */
  receive(maxMessageCount: number, maxWaitTimeInSeconds?: number): Promise<EventData[]> {
    if (!maxMessageCount || (maxMessageCount && typeof maxMessageCount !== 'number')) {
      throw new Error("'maxMessageCount' is a required parameter of type number with a value greater than 0.");
    }

    if (maxWaitTimeInSeconds == undefined) {
      maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
    }

    const eventDatas: EventData[] = [];
    let timeOver = false;
    return new Promise<EventData[]>((resolve, reject) => {
      let onReceiveMessage: OnAmqpEvent;
      let onReceiveError: OnAmqpEvent;
      let onReceiveClose: OnAmqpEvent;
      let onSessionError: OnAmqpEvent;
      let onSessionClose: OnAmqpEvent;
      let waitTimer: any;
      let actionAfterWaitTimeout: Func<void, void>;
      // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
      const finalAction = (timeOver: boolean, data?: EventData) => {
        // Resetting the mode. Now anyone can call start() or receive() again.
        this._receiver!.removeHandler(ReceiverEvents.receiverError, onReceiveError);
        this._receiver!.removeHandler(ReceiverEvents.message, onReceiveMessage);
        if (!data) {
          data = eventDatas.length ? eventDatas[eventDatas.length - 1] : undefined;
        }
        if (!timeOver) {
          clearTimeout(waitTimer);
        }
        if (this.receiverRuntimeMetricEnabled && data) {
          this.runtimeInfo.lastSequenceNumber = data.lastSequenceNumber;
          this.runtimeInfo.lastEnqueuedTimeUtc = data.lastEnqueuedTime;
          this.runtimeInfo.lastEnqueuedOffset = data.lastEnqueuedOffset;
          this.runtimeInfo.retrievalTime = data.retrievalTime;
        }
        resolve(eventDatas);
      };

      // Action to be performed after the max wait time is over.
      actionAfterWaitTimeout = () => {
        timeOver = true;
        debug("[%s] Batching Receiver '%s'  max wait time in seconds %d over.",
          this._context.connectionId, this.name, maxWaitTimeInSeconds);
        return finalAction(timeOver);
      };

      // Action to be performed on the "message" event.
      onReceiveMessage = (context: EventContext) => {
        const data: EventData = EventData.fromAmqpMessage(context.message!);
        data.body = this._context.dataTransformer.decode(context.message!.body);
        if (eventDatas.length <= maxMessageCount) {
          eventDatas.push(data);
        }
        if (eventDatas.length === maxMessageCount) {
          finalAction(timeOver, data);
        }
      };

      // Action to be taken when an error is received.
      onReceiveError = (context: EventContext) => {
        this._receiver!.removeHandler(ReceiverEvents.receiverError, onReceiveError);
        this._receiver!.removeHandler(ReceiverEvents.message, onReceiveMessage);
        this._receiver!.removeSessionHandler(SessionEvents.sessionError, onSessionError);
        const receiverError = context.receiver && context.receiver.error;
        let error = new MessagingError("An error occuured while receiving messages.");
        if (receiverError) {
          error = translate(receiverError);
          debug("[%s] Receiver '%s' received an error:\n%O", this._context.connectionId,
            this.name, error);
        }
        if (waitTimer) {
          clearTimeout(waitTimer);
        }
        reject(error);
      };

      onReceiveClose = async (context: EventContext) => {
        const receiverError = context.receiver && context.receiver.error;
        if (receiverError) {
          debug("[%s] 'receiver_close' event occurred. The associated error is: %O",
            this._context.connectionId, receiverError);
        }
      };

      onSessionClose = async (context: EventContext) => {
        const sessionError = context.session && context.session.error;
        if (sessionError) {
          debug("[%s] 'session_close' event occurred for receiver '%s'. The associated error is: %O",
            this._context.connectionId, this.name, sessionError);
        }
      };

      onSessionError = (context: EventContext) => {
        this._receiver!.removeHandler(ReceiverEvents.receiverError, onReceiveError);
        this._receiver!.removeHandler(ReceiverEvents.message, onReceiveMessage);
        this._receiver!.removeSessionHandler(SessionEvents.sessionError, onReceiveError);
        const sessionError = context.session && context.session.error;
        let error = new MessagingError("An error occuured while receiving messages.");
        if (sessionError) {
          error = translate(sessionError);
          debug("[%s] 'session_close' event occurred for Receiver '%s' received an error:\n%O",
            this._context.connectionId, this.name, error);
        }
        if (waitTimer) {
          clearTimeout(waitTimer);
        }
        reject(error);
      };

      const addCreditAndSetTimer = (reuse?: boolean) => {
        debug("[%s] Receiver '%s', adding credit for receiving %d messages.",
          this._context.connectionId, this.name, maxMessageCount);
        this._receiver!.addCredit(maxMessageCount);
        let msg: string = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
        if (reuse) msg += " Receiver link already present, hence reusing it.";
        debug(msg, this._context.connectionId, maxWaitTimeInSeconds, this.name);
        waitTimer = setTimeout(actionAfterWaitTimeout, (maxWaitTimeInSeconds as number) * 1000);
      };

      if (!this.isOpen()) {
        debug("[%s] Receiver '%s', setting the prefetch count to 0.", this._context.connectionId, this.name);
        this.prefetchCount = 0;
        const rcvrOptions = this._createReceiverOptions({
          onMessage: onReceiveMessage,
          onError: onReceiveError,
          onClose: onReceiveClose,
          onSessionError: onSessionError,
          onSessionClose: onSessionClose
        });
        this._init(rcvrOptions).then(() => addCreditAndSetTimer()).catch(reject);
      } else {
        addCreditAndSetTimer(true);
        this._receiver!.registerHandler(ReceiverEvents.message, onReceiveMessage);
        this._receiver!.registerHandler(ReceiverEvents.receiverError, onReceiveError);
        this._receiver!.registerSessionHandler(SessionEvents.sessionError, onReceiveError);
      }
    });
  }

  /**
   * Creates a batching receiver.
   * @static
   *
   * @param {ConnectionContext} context    The connection context.
   * @param {string | number} partitionId  The partitionId to receive events from.
   * @param {ReceiveOptions} [options]     Receive options.
   */
  static create(context: ConnectionContext, partitionId: string | number, options?: ReceiveOptions): BatchingReceiver {
    const bReceiver = new BatchingReceiver(context, partitionId, options);
    context.receivers[bReceiver.name] = bReceiver;
    return bReceiver;
  }
}
