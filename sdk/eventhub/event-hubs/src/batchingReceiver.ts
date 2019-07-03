// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReceiverEvents, EventContext, OnAmqpEvent, SessionEvents, Receiver as RheaReceiver } from "rhea-promise";
import {
  translate,
  Func,
  Constants,
  MessagingError,
  randomNumberFromInterval,
  RetryOperationType,
  RetryConfig,
  retry
} from "@azure/core-amqp";
import { ReceivedEventData, EventDataInternal, fromAmqpMessage } from "./eventData";
import { EventHubConsumerOptions, RetryOptions } from "./eventHubClient";
import { EventHubReceiver } from "./eventHubReceiver";
import { ConnectionContext } from "./connectionContext";
import { AbortSignalLike, AbortError } from "@azure/abort-controller";
import * as log from "./log";
import { EventPosition } from "./eventPosition";

/**
 * Describes the batching receiver where the user can receive a specified number of messages for a predefined time.
 * @class BatchingReceiver
 * @extends EventHubReceiver
 * @internal
 * @ignore
 */
export class BatchingReceiver extends EventHubReceiver {
  /**
   * @property isReceivingMessages Indicates whether the link is actively receiving
   * messages. Default: false.
   */
  isReceivingMessages: boolean = false;
  /**
   * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
   * @ignore
   * @constructor
   * @param context                        The connection context.
   * @param consumerGroup The consumer group from which the receiver should receive events from.
   * @param partitionId                               Partition ID from which to receive.
   * @param eventPosition The event position in the partition at which to start receiving messages.
   * @param [options]                         Options for how you'd like to connect.
   */
  constructor(
    context: ConnectionContext,
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ) {
    super(context, consumerGroup, partitionId, eventPosition, options);
  }

  /**
   * Receive a batch of EventData objects from an EventHub partition for a given count and
   * a given max wait time in seconds, whichever happens first. This method can be used directly
   * after creating the receiver object.
   * @ignore
   * @param maxMessageCount The maximum message count. Must be a value greater than 0.
   * @param [maxWaitTimeInSeconds] The maximum wait time in seconds for which the Receiver
   * should wait to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @param [retryOptions] Retry options for the receive operation
   * @param abortSignal Signal to cancel current operation.
   * @returns A promise that resolves with an array of ReceivedEventData objects.
   */
  receive(
    maxMessageCount: number,
    maxWaitTimeInSeconds?: number,
    retryOptions?: RetryOptions,
    abortSignal?: AbortSignalLike
  ): Promise<ReceivedEventData[]> {
    if (maxWaitTimeInSeconds == undefined) {
      maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
    }

    this.isReceivingMessages = true;
    const eventDatas: ReceivedEventData[] = [];

    const receiveEventPromise = () =>
      new Promise<ReceivedEventData[]>(async (resolve, reject) => {
        let onReceiveMessage: OnAmqpEvent;
        let onReceiveError: OnAmqpEvent;
        let onReceiveClose: OnAmqpEvent;
        let onSessionError: OnAmqpEvent;
        let onSessionClose: OnAmqpEvent;
        let waitTimer: any;
        let actionAfterWaitTimeout: Func<void, void>;

        const rejectOnAbort = () => {
          const desc: string =
            `[${this._context.connectionId}] The request operation on the Receiver "${this.name}" with ` +
            `address "${this.address}" has been cancelled by the user.`;
          log.error(desc);
          reject(new AbortError("The receive operation has been cancelled by the user."));
        };

        // operation has been cancelled, so exit quickly
        if (abortSignal && abortSignal.aborted) {
          return rejectOnAbort();
        }

        const cleanUpBeforeReturn = (rheaReceiver?: RheaReceiver) => {
          if (!rheaReceiver) {
            rheaReceiver = this._receiver;
          }
          if (this._abortSignal) {
            this._abortSignal.removeEventListener("abort", this._onAbort);
          }
          // Resetting the mode. Now anyone can call start() or receive() again.
          if (rheaReceiver) {
            rheaReceiver.removeListener(ReceiverEvents.receiverError, onReceiveError);
            rheaReceiver.removeListener(ReceiverEvents.message, onReceiveMessage);
            rheaReceiver.session.removeListener(SessionEvents.sessionError, onSessionError);
          }

          this.isReceivingMessages = false;
          clearTimeout(waitTimer);
        };

        // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
        const finalAction = () => {
          cleanUpBeforeReturn();
          resolve(eventDatas);
        };

        // Action to be performed after the max wait time is over.
        actionAfterWaitTimeout = () => {
          log.batching(
            "[%s] Batching Receiver '%s', %d messages received when max wait time in seconds %d is over.",
            this._context.connectionId,
            this.name,
            eventDatas.length,
            maxWaitTimeInSeconds
          );
          return finalAction();
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
            offset: data.offset!,
            sequenceNumber: data.sequenceNumber!,
            enqueuedTimeUtc: data.enqueuedTimeUtc!,
            partitionKey: data.partitionKey!
          };
          this._checkpoint = receivedEventData.sequenceNumber;
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
            finalAction();
          }
        };

        const onAbort = async () => {
          cleanUpBeforeReturn();
          await this.close();
          rejectOnAbort();
        };

        // Action to be taken when an error is received.
        onReceiveError = (context: EventContext) => {
          cleanUpBeforeReturn(this._receiver || context.receiver!);

          const receiverError = context.receiver && context.receiver.error;
          let error = new MessagingError("An error occuured while receiving messages.");
          if (receiverError) {
            error = translate(receiverError);
            log.error("[%s] Receiver '%s' received an error:\n%O", this._context.connectionId, this.name, error);
          }
          reject(error);
        };

        onReceiveClose = async (context: EventContext) => {
          this.isReceivingMessages = false;
          const receiver = this._receiver || context.receiver!;
          const receiverError = context.receiver && context.receiver.error;
          if (receiverError) {
            log.error(
              "[%s] 'receiver_close' event occurred. The associated error is: %O",
              this._context.connectionId,
              receiverError
            );
          }
          if (receiver && !receiver.isItselfClosed()) {
            if (!this.isConnecting) {
              log.error(
                "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
                  "and the sdk did not initiate this. The receiver is not reconnecting. Hence, calling " +
                  "detached from the onReceiveClose() handler.",
                this._context.connectionId,
                this.name,
                this.address
              );
              await this.onDetached(receiverError);
            } else {
              log.error(
                "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
                  "and the sdk did not initate this. Moreover the receiver is already re-connecting. " +
                  "Hence not calling detached from the onReceiveClose() handler.",
                this._context.connectionId,
                this.name,
                this.address
              );
            }
          } else {
            log.error(
              "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
                "because the sdk initiated it. Hence not calling detached from the onReceiveClose" +
                "() handler.",
              this._context.connectionId,
              this.name,
              this.address
            );
          }
        };

        onSessionClose = async (context: EventContext) => {
          this.isReceivingMessages = false;
          const receiver = this._receiver || context.receiver!;
          const sessionError = context.session && context.session.error;
          if (sessionError) {
            log.error(
              "[%s] 'session_close' event occurred for receiver '%s'. The associated error is: %O",
              this._context.connectionId,
              this.name,
              sessionError
            );
          }
          if (receiver && !receiver.isSessionItselfClosed()) {
            if (!this.isConnecting) {
              log.error(
                "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
                  "address '%s' and the sdk did not initiate this. Hence calling detached from the " +
                  "onSessionClose() handler.",
                this._context.connectionId,
                this.name,
                this.address
              );
              await this.onDetached(sessionError);
            } else {
              log.error(
                "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
                  "address '%s' and the sdk did not initiate this. Moreover the receiver is already " +
                  "re-connecting. Hence not calling detached from the onSessionClose() handler.",
                this._context.connectionId,
                this.name,
                this.address
              );
            }
          } else {
            log.error(
              "[%s] 'session_close' event occurred on the session of receiver '%s' with address " +
                "'%s' because the sdk initiated it. Hence not calling detached from the onSessionClose" +
                "() handler.",
              this._context.connectionId,
              this.name,
              this.address
            );
          }
        };

        onSessionError = (context: EventContext) => {
          cleanUpBeforeReturn(this._receiver || context.receiver!);

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

          try {
            await this._init(rcvrOptions);
            if (abortSignal && abortSignal.aborted) {
              // exit early if operation was cancelled while initializing connection
              cleanUpBeforeReturn();
              await this.close();
              return rejectOnAbort();
            }
            addCreditAndSetTimer();
          } catch (err) {
            // remove listeners if a connection could not be established
            cleanUpBeforeReturn();
            return reject(err);
          }
        } else {
          addCreditAndSetTimer(true);
          this._receiver!.on(ReceiverEvents.message, onReceiveMessage);
          this._receiver!.on(ReceiverEvents.receiverError, onReceiveError);
          this._receiver!.session.on(SessionEvents.sessionError, onSessionError);
        }

        // only attach abort event listener after the receiver has been initialized
        // otherwise `close()` can be called during an intermediate state.
        if (abortSignal) {
          this._abortSignal = abortSignal;
          this._abortSignal.addEventListener("abort", onAbort);
        }
      });

    const jitterInSeconds = randomNumberFromInterval(1, 4);
    const times =
      retryOptions && retryOptions.retryCount && retryOptions.retryCount > 0
        ? retryOptions.retryCount
        : Constants.defaultRetryAttempts;
    const delayInSeconds =
      retryOptions && retryOptions.retryInterval && retryOptions.retryInterval > 0
        ? retryOptions.retryInterval / 1000
        : Constants.defaultDelayBetweenOperationRetriesInSeconds;
    const config: RetryConfig<ReceivedEventData[]> = {
      operation: receiveEventPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.receiveMessage,
      times: times,
      connectionHost: this._context.config.host,
      delayInSeconds: delayInSeconds + jitterInSeconds
    };
    return retry<ReceivedEventData[]>(config);
  }

  /**
   * Creates a batching receiver.
   * @static
   * @ignore
   * @param context    The connection context.
   * @param consumerGroup  The consumer group from which the receiver should receive events from.
   * @param partitionId  The partitionId to receive events from.
   * @param eventPosition The event position in the partition at which to start receiving messages.
   * @param [options]     Receive options.
   */
  static create(
    context: ConnectionContext,
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ): BatchingReceiver {
    const bReceiver = new BatchingReceiver(context, consumerGroup, partitionId, eventPosition, options);
    context.receivers[bReceiver.name] = bReceiver;
    return bReceiver;
  }
}
