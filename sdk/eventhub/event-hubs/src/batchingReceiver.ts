// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReceiverEvents, EventContext, OnAmqpEvent, SessionEvents } from "rhea-promise";
import { translate, Func, Constants, MessagingError } from "@azure/amqp-common";
import { ReceivedEventData, EventDataInternal, fromAmqpMessage } from "./eventData";
import { ReceiverOptions } from "./eventHubClient";
import { EventHubReceiver } from "./eventHubReceiver";
import { ConnectionContext } from "./connectionContext";
import { Aborter } from "./aborter";
import * as log from "./log";

/**
 * Describes the batching receiver where the user can receive a specified number of messages for a predefined time.
 * @class BatchingReceiver
 * @extends EventHubReceiver
 * @ignore
 */
export class BatchingReceiver extends EventHubReceiver {
  /**
   * @property {boolean} isReceivingMessages Indicates whether the link is actively receiving
   * messages. Default: false.
   */
  isReceivingMessages: boolean = false;
  /**
   * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
   * @ignore
   * @constructor
   * @param {ConnectionContext} context                        The connection context.
   * @param {string} partitionId                               Partition ID from which to receive.
   * @param {ReceiverOptions} [options]                         Options for how you'd like to connect.
   */
  constructor(context: ConnectionContext, partitionId: string | number, options?: ReceiverOptions) {
    super(context, partitionId, options);
  }

  /**
   * Receive a batch of EventData objects from an EventHub partition for a given count and
   * a given max wait time in seconds, whichever happens first. This method can be used directly
   * after creating the receiver object.
   * @ignore
   * @param {number} maxMessageCount The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds] The maximum wait time in seconds for which the Receiver
   * should wait to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @param {Aborter} cancellationToken Cancel current operation.
   * @returns {Promise<ReceivedEventData[]>} A promise that resolves with an array of ReceivedEventData objects.
   */
  receive(
    maxMessageCount: number,
    maxWaitTimeInSeconds?: number,
    cancellationToken?: Aborter
  ): Promise<ReceivedEventData[]> {
    if (!maxMessageCount || (maxMessageCount && typeof maxMessageCount !== "number")) {
      throw new Error("'maxMessageCount' is a required parameter of type number with a value greater than 0.");
    }

    if (maxWaitTimeInSeconds == undefined) {
      maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
    }

    this.isReceivingMessages = true;

    const eventDatas: ReceivedEventData[] = [];
    let timeOver = false;
    return new Promise<ReceivedEventData[]>((resolve, reject) => {
      let onReceiveMessage: OnAmqpEvent;
      let onReceiveError: OnAmqpEvent;
      let onReceiveClose: OnAmqpEvent;
      let onSessionError: OnAmqpEvent;
      let onSessionClose: OnAmqpEvent;
      let waitTimer: any;
      let actionAfterWaitTimeout: Func<void, void>;
      // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
      const finalAction = (timeOver: boolean) => {
        if (this._aborter) {
          this._aborter.removeEventListener("abort", this._onAbort);
        }
        // Resetting the mode. Now anyone can call start() or receive() again.
        if (this._receiver) {
          this._receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
          this._receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        }

        this.isReceivingMessages = false;
        if (!timeOver) {
          clearTimeout(waitTimer);
        }
        resolve(eventDatas);
      };

      // Action to be performed after the max wait time is over.
      actionAfterWaitTimeout = () => {
        timeOver = true;
        log.batching(
          "[%s] Batching Receiver '%s', %d messages received when max wait time in seconds %d is over.",
          this._context.connectionId,
          this.name,
          eventDatas.length,
          maxWaitTimeInSeconds
        );
        return finalAction(timeOver);
      };

      // Action to be performed on the "message" event.
      onReceiveMessage = (context: EventContext) => {
        const data: EventDataInternal = fromAmqpMessage(context.message!);
        if (this.receiverRuntimeMetricEnabled) {
          this.runtimeInfo.lastEnqueuedSequenceNumber = data.lastSequenceNumber;
          this.runtimeInfo.lastEnqueuedTimeUtc = data.lastEnqueuedTime;
          this.runtimeInfo.lastEnqueuedOffset = data.lastEnqueuedOffset;
          this.runtimeInfo.retrievalTime = data.retrievalTime;
        }

        const receivedEventData: ReceivedEventData = {
          body: this._context.dataTransformer.decode(context.message!.body),
          properties: data.properties,
          offset: data.offset,
          sequenceNumber: data.sequenceNumber,
          enqueuedTimeUtc: data.enqueuedTimeUtc,
          partitionKey: data.partitionKey
        };
        this._checkpoint = receivedEventData.sequenceNumber!;
        if (eventDatas.length <= maxMessageCount) {
          eventDatas.push(receivedEventData);
        }
        if (eventDatas.length === maxMessageCount) {
          log.batching(
            "[%s] Batching Receiver '%s', %d messages received within %d seconds.",
            this._context.connectionId,
            this.name,
            eventDatas.length,
            maxWaitTimeInSeconds
          );
          finalAction(timeOver);
        }
      };

      this._onAbort = () => {
        this.isReceivingMessages = false;
        if (this._receiver) {
          this._receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
          this._receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        }
        if (waitTimer) {
          clearTimeout(waitTimer);
        }
        if (this._aborter) {
          this._aborter.removeEventListener("abort", this._onAbort);
        }
        const desc: string =
          `[${this._context.connectionId}] The receive operation on the Receiver "${this.name}" with ` +
          `address "${this.address}" has been cancelled by the user.`;
        log.error(desc);
        throw new Error(desc);
      };

      // Action to be taken when an error is received.
      onReceiveError = (context: EventContext) => {
        const receiver = this._receiver || context.receiver!;
        receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
        receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        receiver.session.removeListener(SessionEvents.sessionError, onSessionError);

        if (this._aborter) {
          this._aborter.removeEventListener("abort", this._onAbort);
        }

        this.isReceivingMessages = false;
        const receiverError = context.receiver && context.receiver.error;
        let error = new MessagingError("An error occuured while receiving messages.");
        if (receiverError) {
          error = translate(receiverError);
          log.error("[%s] Receiver '%s' received an error:\n%O", this._context.connectionId, this.name, error);
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
          log.error(
            "[%s] 'receiver_close' event occurred. The associated error is: %O",
            this._context.connectionId,
            receiverError
          );
        }
      };

      onSessionClose = async (context: EventContext) => {
        this.isReceivingMessages = false;
        const sessionError = context.session && context.session.error;
        if (sessionError) {
          log.error(
            "[%s] 'session_close' event occurred for receiver '%s'. The associated error is: %O",
            this._context.connectionId,
            this.name,
            sessionError
          );
        }
      };

      onSessionError = (context: EventContext) => {
        const receiver = this._receiver || context.receiver!;
        receiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
        receiver.removeListener(ReceiverEvents.message, onReceiveMessage);
        receiver.session.removeListener(SessionEvents.sessionError, onReceiveError);
        if (this._aborter) {
          this._aborter.removeEventListener("abort", this._onAbort);
        }
        this.isReceivingMessages = false;
        const sessionError = context.session && context.session.error;
        let error = new MessagingError("An error occuured while receiving messages.");
        if (sessionError) {
          error = translate(sessionError);
          log.error(
            "[%s] 'session_close' event occurred for Receiver '%s' received an error:\n%O",
            this._context.connectionId,
            this.name,
            error
          );
        }
        if (waitTimer) {
          clearTimeout(waitTimer);
        }
        reject(error);
      };

      const addCreditAndSetTimer = (reuse?: boolean) => {
        log.batching(
          "[%s] Receiver '%s', adding credit for receiving %d messages.",
          this._context.connectionId,
          this.name,
          maxMessageCount
        );
        this._receiver!.addCredit(maxMessageCount);
        let msg: string = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
        if (reuse) msg += " Receiver link already present, hence reusing it.";
        log.batching(msg, this._context.connectionId, maxWaitTimeInSeconds, this.name);
        waitTimer = setTimeout(actionAfterWaitTimeout, (maxWaitTimeInSeconds as number) * 1000);
      };

      if (cancellationToken) {
        this._aborter = cancellationToken;
        this._aborter.addEventListener("abort", this._onAbort);
      }

      if (!this.isOpen()) {
        log.batching("[%s] Receiver '%s', setting the prefetch count to 0.", this._context.connectionId, this.name);
        this.prefetchCount = 0;
        const rcvrOptions = this._createReceiverOptions({
          onMessage: onReceiveMessage,
          onError: onReceiveError,
          onClose: onReceiveClose,
          onSessionError: onSessionError,
          onSessionClose: onSessionClose
        });
        this._init(rcvrOptions)
          .then(() => addCreditAndSetTimer())
          .catch(reject);
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
   * @ignore
   * @param {ConnectionContext} context    The connection context.
   * @param {string | number} partitionId  The partitionId to receive events from.
   * @param {ReceiverOptions} [options]     Receive options.
   */
  static create(context: ConnectionContext, partitionId: string | number, options?: ReceiverOptions): BatchingReceiver {
    const bReceiver = new BatchingReceiver(context, partitionId, options);
    context.receivers[bReceiver.name] = bReceiver;
    return bReceiver;
  }
}
