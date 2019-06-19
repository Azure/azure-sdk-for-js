// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import * as log from "./log";
import {
  Receiver,
  OnAmqpEvent,
  EventContext,
  ReceiverOptions as RheaReceiverOptions,
  types,
  AmqpError
} from "rhea-promise";
import { translate, Constants, MessagingError, retry, RetryOperationType, RetryConfig } from "@azure/core-amqp";
import { ReceivedEventData, EventDataInternal, fromAmqpMessage } from "./eventData";
import { EventHubConsumerOptions } from "./eventHubClient";
import { ConnectionContext } from "./connectionContext";
import { LinkEntity } from "./linkEntity";
import { EventPosition } from "./eventPosition";
import { getEventPositionFilter } from "./util/utils";
import { AbortSignalLike, AbortError } from "@azure/abort-controller";

interface CreateReceiverOptions {
  onMessage: OnAmqpEvent;
  onError: OnAmqpEvent;
  onClose: OnAmqpEvent;
  onSessionError: OnAmqpEvent;
  onSessionClose: OnAmqpEvent;
  newName?: boolean;
  eventPosition?: EventPosition;
}

/**
 * Represents the approximate receiver runtime information for a logical partition of an Event Hub.
 * @interface ReceiverRuntimeInfo
 */
export interface ReceiverRuntimeInfo {
  /**
   * @property {number} lastSequenceNumber The logical sequence number of the event.
   */
  lastEnqueuedSequenceNumber?: number;
  /**
   * @property {Date} lastEnqueuedTimeUtc The enqueued time of the last event.
   */
  lastEnqueuedTimeUtc?: Date;
  /**
   * @property {string} lastEnqueuedOffset The offset of the last enqueued event.
   */
  lastEnqueuedOffset?: string;
  /**
   * @property {Date} retrievalTime The enqueued time of the last event.
   */
  retrievalTime?: Date;
}

/**
 * Describes the checkoint information.
 * @interface CheckpointData
 */
export interface CheckpointData {
  /**
   * @property {Date} enqueuedTimeUtc The enqueued time of the event.
   */
  enqueuedTimeUtc: Date;
  /**
   * @property {string} offset The offset of the event to be checked in.
   */
  offset: string;
  /**
   * @property {string} sequenceNumber The sequence number of the event to be checked in.
   */
  sequenceNumber: number;
}

/**
 * Describes the message handler signature.
 */
export type OnMessage = (eventData: ReceivedEventData) => void;

/**
 * Describes the error handler signature.
 */
export type OnError = (error: MessagingError | Error) => void;

/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
 * @ignore
 */
export class EventHubReceiver extends LinkEntity {
  /**
   * @property {string} consumerGroup The EventHub consumer group from which the receiver will
   * receive messages. (Default: "default").
   */
  consumerGroup: string;
  /**
   * @property {ReceiverRuntimeInfo} runtimeInfo The receiver runtime info.
   */
  runtimeInfo: ReceiverRuntimeInfo;
  /**
   * @property {number} [ownerLevel] The Receiver ownerLevel.
   */
  ownerLevel?: number;
  /**
   * @property {EventPosition} eventPosition The event position in the partition at which to start receiving messages.
   */
  eventPosition: EventPosition;
  /**
   * @property {EventHubConsumerOptions} [options] Optional properties that can be set while creating
   * the EventHubConsumer.
   */
  options: EventHubConsumerOptions;
  /**
   * @property {number} [prefetchCount] The number of messages that the receiver can fetch/receive
   * initially. Defaults to 1000.
   */
  prefetchCount?: number = Constants.defaultPrefetchCount;
  /**
   * @property {boolean} receiverRuntimeMetricEnabled Indicates whether receiver runtime metric
   * is enabled. Default: false.
   */
  receiverRuntimeMetricEnabled: boolean = false;
  /**
   * @property {Receiver} [_receiver] The AMQP receiver link.
   * @protected
   */
  protected _receiver?: Receiver;
  /**
   * @property {OnMessage} _onMessage The message handler provided by the user that will be wrapped
   * inside _onAmqpMessage.
   * @protected
   */
  protected _onMessage?: OnMessage;
  /**
   * @property {OnError} _onError The error handler provided by the user that will be wrapped
   * inside _onAmqpError.
   * @protected
   */
  protected _onError?: OnError;
  /**
   * @property {() => void} onAbort The aborter handler that will be invoked when user will call Aborter.abort()
   * to cancel the receive request.
   * @protected
   */
  protected _onAbort: () => void;
  /**
   * @property {OnAmqpEvent} _onAmqpError The message handler that will be set as the handler on the
   * underlying rhea receiver for the "message" event.
   * @protected
   */
  protected _onAmqpMessage: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onAmqpError The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   * @protected
   */
  protected _onAmqpError: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onAmqpClose The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_close" event.
   * @protected
   */
  protected _onAmqpClose: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onSessionError The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_error" event.
   * @protected
   */
  protected _onSessionError: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onSessionClose The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_close" event.
   * @protected
   */
  protected _onSessionClose: OnAmqpEvent;
  /**
   * @property {number} _checkpoint Describes sequenceNumber of the last message received.
   * This is used as the sequenceNumber to receive messages from incase of recovery.
   */
  protected _checkpoint: number;
  /**
   * @property {Aborter | undefined} _aborter Describes Aborter instance that will be set by the user
   * to cancel the request.
   */
  protected _abortSignal: AbortSignalLike | undefined;

  /**
   * @property {number} Returns sequenceNumber of the last event received.
   * @readonly
   */
  get checkpoint(): number {
    return this._checkpoint;
  }

  /**
   * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
   * @ignore
   * @constructor
   * @param {EventHubClient} client                            The EventHub client.
   * @param {string} consumerGroup  The consumer group from which the receiver should receive events from.
   * @param {string} partitionId                               Partition ID from which to receive.
   * @param {EventPosition} eventPosition The position in the stream from where to start receiving events.
   * @param {EventHubConsumerOptions} [options]                         Receiver options.
   */
  constructor(
    context: ConnectionContext,
    consumerGroup: string,
    partitionId: string | number,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ) {
    super(context, {
      partitionId: partitionId,
      name: context.config.getReceiverAddress(partitionId, consumerGroup)
    });
    if (!options) options = {};
    this.consumerGroup = consumerGroup;
    this.address = context.config.getReceiverAddress(partitionId, this.consumerGroup);
    this.audience = context.config.getReceiverAudience(partitionId, this.consumerGroup);
    this.ownerLevel = options.ownerLevel;
    this.eventPosition = eventPosition;
    this.options = options;
    this.receiverRuntimeMetricEnabled = false;
    this.runtimeInfo = {};
    this._checkpoint = -1;
    this._onAmqpMessage = (context: EventContext) => {
      const data: EventDataInternal = fromAmqpMessage(context.message!);
      const receivedEventData: ReceivedEventData = {
        body: this._context.dataTransformer.decode(context.message!.body),
        properties: data.properties,
        offset: data.offset!,
        sequenceNumber: data.sequenceNumber!,
        enqueuedTimeUtc: data.enqueuedTimeUtc!,
        partitionKey: data.partitionKey!
      };
      this._checkpoint = receivedEventData.sequenceNumber!;

      if (this.receiverRuntimeMetricEnabled && data) {
        this.runtimeInfo.lastEnqueuedSequenceNumber = data.lastSequenceNumber;
        this.runtimeInfo.lastEnqueuedTimeUtc = data.lastEnqueuedTime;
        this.runtimeInfo.lastEnqueuedOffset = data.lastEnqueuedOffset;
        this.runtimeInfo.retrievalTime = data.retrievalTime;
        log.receiver(
          "[%s] RuntimeInfo of Receiver '%s' is %O",
          this._context.connectionId,
          this.name,
          this.runtimeInfo
        );
      }
      this._onMessage!(receivedEventData);
    };

    this._onAbort = async () => {
      const desc: string =
        `[${this._context.connectionId}] The receive operation on the Receiver "${this.name}" with ` +
        `address "${this.address}" has been cancelled by the user.`;
      log.error(desc);
      await this.close();
      this._onError!(new AbortError("The receive operation has been cancelled by the user."));
    };

    this._onAmqpError = (context: EventContext) => {
      const receiver = this._receiver || context.receiver!;
      const receiverError = context.receiver && context.receiver.error;
      if (receiverError) {
        const ehError = translate(receiverError);
        log.error("[%s] An error occurred for Receiver '%s': %O.", this._context.connectionId, this.name, ehError);
        if (!ehError.retryable) {
          if (receiver && !receiver.isItselfClosed()) {
            log.error(
              "[%s] Since the user did not close the receiver and the error is not " +
                "retryable, we let the user know about it by calling the user's error handler.",
              this._context.connectionId
            );
            this._onError!(ehError);
          } else {
            log.error(
              "[%s] The received error is not retryable. However, the receiver was " +
                "closed by the user. Hence not notifying the user's error handler.",
              this._context.connectionId
            );
          }
        } else {
          log.error(
            "[%s] Since received error is retryable, we will NOT notify the user's " + "error handler.",
            this._context.connectionId
          );
        }
      }
    };

    this._onSessionError = (context: EventContext) => {
      const receiver = this._receiver || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const ehError = translate(sessionError);
        log.error(
          "[%s] An error occurred on the session for Receiver '%s': %O.",
          this._context.connectionId,
          this.name,
          ehError
        );
        if (receiver && !receiver.isSessionItselfClosed() && !ehError.retryable) {
          log.error(
            "[%s] Since the user did not close the receiver and the session error is not " +
              "retryable, we let the user know about it by calling the user's error handler.",
            this._context.connectionId
          );
          this._onError!(ehError);
        }
      }
    };

    this._onAmqpClose = async (context: EventContext) => {
      const receiverError = context.receiver && context.receiver.error;
      const receiver = this._receiver || context.receiver!;
      if (receiverError) {
        log.error(
          "[%s] 'receiver_close' event occurred for receiver '%s' with address '%s'. " + "The associated error is: %O",
          this._context.connectionId,
          this.name,
          this.address,
          receiverError
        );
      }
      if (receiver && !receiver.isItselfClosed()) {
        if (!this.isConnecting) {
          log.error(
            "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
              "and the sdk did not initiate this. The receiver is not reconnecting. Hence, calling " +
              "detached from the _onAmqpClose() handler.",
            this._context.connectionId,
            this.name,
            this.address
          );
          await this.detached(receiverError);
        } else {
          log.error(
            "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
              "and the sdk did not initate this. Moreover the receiver is already re-connecting. " +
              "Hence not calling detached from the _onAmqpClose() handler.",
            this._context.connectionId,
            this.name,
            this.address
          );
        }
      } else {
        if (this._abortSignal) {
          this._abortSignal.removeEventListener("abort", this._onAbort);
        }
        log.error(
          "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
            "because the sdk initiated it. Hence not calling detached from the _onAmqpClose" +
            "() handler.",
          this._context.connectionId,
          this.name,
          this.address
        );
      }
    };

    this._onSessionClose = async (context: EventContext) => {
      const receiver = this._receiver || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        log.error(
          "[%s] 'session_close' event occurred for receiver '%s' with address '%s'. " + "The associated error is: %O",
          this._context.connectionId,
          this.name,
          this.address,
          sessionError
        );
      }

      if (receiver && !receiver.isSessionItselfClosed()) {
        if (!this.isConnecting) {
          log.error(
            "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
              "address '%s' and the sdk did not initiate this. Hence calling detached from the " +
              "_onSessionClose() handler.",
            this._context.connectionId,
            this.name,
            this.address
          );
          await this.detached(sessionError);
        } else {
          log.error(
            "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
              "address '%s' and the sdk did not initiate this. Moreover the receiver is already " +
              "re-connecting. Hence not calling detached from the _onSessionClose() handler.",
            this._context.connectionId,
            this.name,
            this.address
          );
        }
      } else {
        if (this._abortSignal) {
          this._abortSignal.removeEventListener("abort", this._onAbort);
        }
        log.error(
          "[%s] 'session_close' event occurred on the session of receiver '%s' with address " +
            "'%s' because the sdk initiated it. Hence not calling detached from the _onSessionClose" +
            "() handler.",
          this._context.connectionId,
          this.name,
          this.address
        );
      }
    };
  }

  /**
   * Will reconnect the receiver link if necessary.
   * @ignore
   * @param {AmqpError | Error} [receiverError] The receiver error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async detached(receiverError?: AmqpError | Error): Promise<void> {
    try {
      const wasCloseInitiated = this._receiver && this._receiver.isItselfClosed();
      // Clears the token renewal timer. Closes the link and its session if they are open.
      // Removes the link and its session if they are present in rhea's cache.
      await this._closeLink(this._receiver);
      // We should attempt to reopen only when the receiver(sdk) did not initiate the close
      let shouldReopen = false;
      if (receiverError && !wasCloseInitiated) {
        const translatedError = translate(receiverError);
        if (translatedError.retryable) {
          shouldReopen = true;
          log.error(
            "[%s] close() method of Receiver '%s' with address '%s' was not called. There " +
              "was an accompanying error and it is retryable. This is a candidate for re-establishing " +
              "the receiver link.",
            this._context.connectionId,
            this.name,
            this.address
          );
        } else {
          log.error(
            "[%s] close() method of Receiver '%s' with address '%s' was not called. There " +
              "was an accompanying error and it is NOT retryable. Hence NOT re-establishing " +
              "the receiver link.",
            this._context.connectionId,
            this.name,
            this.address
          );
        }
      } else if (!wasCloseInitiated) {
        shouldReopen = true;
        log.error(
          "[%s] close() method of Receiver '%s' with address '%s' was not called. " +
            "There was no accompanying error as well. This is a candidate for re-establishing " +
            "the receiver link.",
          this._context.connectionId,
          this.name,
          this.address
        );
      } else {
        const state: any = {
          wasCloseInitiated: wasCloseInitiated,
          receiverError: receiverError,
          _receiver: this._receiver
        };
        log.error(
          "[%s] Something went wrong. State of Receiver '%s' with address '%s' is: %O",
          this._context.connectionId,
          this.name,
          this.address,
          state
        );
      }
      if (shouldReopen) {
        const rcvrOptions: CreateReceiverOptions = {
          onMessage: this._onAmqpMessage,
          onError: this._onAmqpError,
          onClose: this._onAmqpClose,
          onSessionError: this._onSessionError,
          onSessionClose: this._onSessionClose,
          newName: true // provide a new name to the link while re-connecting it. This ensures that
          // the service does not send an error stating that the link is still open.
        };
        // reconnect the receiver link with sequenceNumber of the last received message as the offset
        // if messages were received by the receiver before it got disconnected.
        if (this._checkpoint > -1) {
          rcvrOptions.eventPosition = EventPosition.fromSequenceNumber(this._checkpoint);
        }
        const options: RheaReceiverOptions = this._createReceiverOptions(rcvrOptions);
        // shall retry forever at an interval of 15 seconds if the error is a retryable error
        // else bail out when the error is not retryable or the oepration succeeds.
        const config: RetryConfig<void> = {
          operation: () => this._init(options),
          connectionId: this._context.connectionId,
          operationType: RetryOperationType.receiverLink,
          times: Constants.defaultConnectionRetryAttempts,
          connectionHost: this._context.config.host,
          delayInSeconds: 15
        };
        await retry<void>(config);
      } else {
        if (this._abortSignal) {
          this._abortSignal.removeEventListener("abort", this._onAbort);
        }
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while processing detached() of Receiver '%s' with address " + "'%s': %O",
        this._context.connectionId,
        this.name,
        this.address,
        err
      );
    }
  }

  /**
   * Closes the underlying AMQP receiver.
   * @ignore
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    if (this._receiver) {
      if (this._abortSignal) {
        this._abortSignal.removeEventListener("abort", this._onAbort);
      }
      const receiverLink = this._receiver;
      this._deleteFromCache();
      await this._closeLink(receiverLink);
    }
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @ignore
   * @return {boolean} boolean
   */
  isOpen(): boolean {
    const result: boolean = this._receiver! && this._receiver!.isOpen();
    log.error(
      "[%s] Receiver '%s' with address '%s' is open? -> %s",
      this._context.connectionId,
      this.name,
      this.address,
      result
    );
    return result;
  }

  protected _deleteFromCache(): void {
    this._receiver = undefined;
    delete this._context.receivers[this.name];
    log.error("[%s] Deleted the receiver '%s' from the client cache.", this._context.connectionId, this.name);
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   * @ignore
   * @returns {Promise<void>}
   */
  protected async _init(options?: RheaReceiverOptions): Promise<void> {
    try {
      if (!this.isOpen() && !this.isConnecting) {
        log.error(
          "[%s] The receiver '%s' with address '%s' is not open and is not currently " +
            "establishing itself. Hence let's try to connect.",
          this._context.connectionId,
          this.name,
          this.address
        );
        this.isConnecting = true;
        await this._negotiateClaim();
        if (!options) {
          options = this._createReceiverOptions({
            onMessage: this._onAmqpMessage,
            onError: this._onAmqpError,
            onClose: this._onAmqpClose,
            onSessionError: this._onSessionError,
            onSessionClose: this._onSessionClose
          });
        }
        log.error(
          "[%s] Trying to create receiver '%s' with options %O",
          this._context.connectionId,
          this.name,
          options
        );

        this._receiver = await this._context.connection.createReceiver(options);
        this.isConnecting = false;
        log.error(
          "[%s] Receiver '%s' with address '%s' has established itself.",
          this._context.connectionId,
          this.name,
          this.address
        );
        log.receiver("Promise to create the receiver resolved. Created receiver with name: ", this.name);
        log.receiver(
          "[%s] Receiver '%s' created with receiver options: %O",
          this._context.connectionId,
          this.name,
          options
        );
        // It is possible for someone to close the receiver and then start it again.
        // Thus make sure that the receiver is present in the client cache.
        if (!this._context.receivers[this.name]) this._context.receivers[this.name] = this;
        await this._ensureTokenRenewal();
      } else {
        log.error(
          "[%s] The receiver '%s' with address '%s' is open -> %s and is connecting " +
            "-> %s. Hence not reconnecting.",
          this._context.connectionId,
          this.name,
          this.address,
          this.isOpen(),
          this.isConnecting
        );
      }
    } catch (err) {
      this.isConnecting = false;
      err = translate(err);
      log.error(
        "[%s] An error occured while creating the receiver '%s': %O",
        this._context.connectionId,
        this.name,
        err
      );
      throw err;
    }
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   * @ignore
   */
  protected _createReceiverOptions(options: CreateReceiverOptions): RheaReceiverOptions {
    if (options.newName) this.name = `${uuid()}`;
    const rcvrOptions: RheaReceiverOptions = {
      name: this.name,
      autoaccept: true,
      source: {
        address: this.address
      },
      credit_window: this.prefetchCount,
      onMessage: options.onMessage || this._onAmqpMessage,
      onError: options.onError || this._onAmqpError,
      onClose: options.onClose || this._onAmqpClose,
      onSessionError: options.onSessionError || this._onSessionError,
      onSessionClose: options.onSessionClose || this._onSessionClose
    };
    if (this.ownerLevel !== undefined && this.ownerLevel !== null) {
      if (!rcvrOptions.properties) rcvrOptions.properties = {};
      rcvrOptions.properties[Constants.attachEpoch] = types.wrap_long(this.ownerLevel);
    }
    if (this.receiverRuntimeMetricEnabled) {
      rcvrOptions.desired_capabilities = Constants.enableReceiverRuntimeMetricName;
    }
    const eventPosition = options.eventPosition || this.eventPosition;
    if (eventPosition) {
      // Set filter on the receiver if event position is specified.
      const filterClause = getEventPositionFilter(eventPosition);
      if (filterClause) {
        (rcvrOptions.source as any).filter = {
          "apache.org:selector-filter:string": types.wrap_described(filterClause, 0x468c00000004)
        };
      }
    }
    return rcvrOptions;
  }
}
