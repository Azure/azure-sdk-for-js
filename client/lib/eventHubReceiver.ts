// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import {
  Receiver, OnAmqpEvent, EventContext, ReceiverOptions, types, AmqpError
} from "./rhea-promise";
import {
  translate, Constants, MessagingError, retry, RetryOperationType, RetryConfig
} from "./amqp-common";
import { EventData } from "./eventData";
import { ReceiveOptions } from "./eventHubClient";
import { ConnectionContext } from "./connectionContext";
import { LinkEntity } from "./linkEntity";
import { EventPosition } from './eventPosition';

const debug = debugModule("azure:event-hubs:receiver");

interface CreateReceiverOptions {
  onMessage: OnAmqpEvent;
  onError: OnAmqpEvent;
  onClose: OnAmqpEvent;
  newName?: boolean;
  eventPosition?: EventPosition;
}

/**
 * Represents the approximate receiver runtime information for a logical partition of an Event Hub.
 * @interface ReceiverRuntimeInfo
 */
export interface ReceiverRuntimeInfo {
  /**
   * @property {string} partitionId The parition identifier.
   */
  partitionId: string;
  /**
   * @property {number} lastSequenceNumber The logical sequence number of the event.
   */
  lastSequenceNumber?: number;
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
export type OnMessage = (eventData: EventData) => void;

/**
 * Describes the error handler signature.
 */
export type OnError = (error: MessagingError | Error) => void;

/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
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
   * @property {number} [epoch] The Receiver epoch.
   */
  epoch?: number;
  /**
   * @property {string} [identifier] The Receiver identifier
   */
  identifier?: string;
  /**
   * @property {ReceiveOptions} [options] Optional properties that can be set while creating
   * the EventHubReceiver.
   */
  options: ReceiveOptions;
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
   * @property {OnMessage} _onError The error handler provided by the user that will be wrapped
   * inside _onAmqpError.
   * @protected
   */
  protected _onError?: OnError;
  /**
   * @property {OnMessage} _onAmqpError The message handler that will be set as the handler on the
   * underlying rhea receiver for the "message" event.
   * @protected
   */
  protected _onAmqpMessage: OnAmqpEvent;
  /**
   * @property {OnMessage} _onAmqpError The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   * @protected
   */
  protected _onAmqpError: OnAmqpEvent;
  /**
   * @property {OnMessage} _onAmqpClose The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_close" event.
   * @protected
   */
  protected _onAmqpClose: OnAmqpEvent;
  /**
   * @property {CheckpointData} _checkpoint Describes metadata about the last message received.
   * This is used as the offset to receive messages from incase of recovery.
   */
  protected _checkpoint: CheckpointData;

  /**
   * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
   *
   * @constructor
   * @param {EventHubClient} client                            The EventHub client.
   * @param {string} partitionId                               Partition ID from which to receive.
   * @param {ReceiveOptions} [options]                         Receiver options.
   */
  constructor(context: ConnectionContext, partitionId: string | number, options?: ReceiveOptions) {
    super(context, { partitionId: partitionId, name: options ? options.name : undefined });
    if (!options) options = {};
    this.consumerGroup = options.consumerGroup ? options.consumerGroup : Constants.defaultConsumerGroup;
    this.address = `${this._context.config.entityPath}/ConsumerGroups/${this.consumerGroup}/Partitions/${this.partitionId}`;
    this.audience = `${this._context.config.endpoint}${this.address}`;
    this.prefetchCount = options.prefetchCount != undefined ? options.prefetchCount : Constants.defaultPrefetchCount;
    this.epoch = options.epoch;
    this.identifier = options.identifier;
    this.options = options;
    this.receiverRuntimeMetricEnabled = options.enableReceiverRuntimeMetric || false;
    this.runtimeInfo = {
      partitionId: `${partitionId}`
    };
    this._checkpoint = {
      enqueuedTimeUtc: new Date(),
      offset: "0",
      sequenceNumber: -1
    };
    this._onAmqpMessage = (context: EventContext) => {
      const evData = EventData.fromAmqpMessage(context.message!);
      evData.body = this._context.dataTransformer.decode(context.message!.body);
      this._checkpoint = {
        enqueuedTimeUtc: evData.enqueuedTimeUtc!,
        offset: evData.offset!,
        sequenceNumber: evData.sequenceNumber!
      };
      if (this.receiverRuntimeMetricEnabled && evData) {
        this.runtimeInfo.lastSequenceNumber = evData.lastSequenceNumber;
        this.runtimeInfo.lastEnqueuedTimeUtc = evData.lastEnqueuedTime;
        this.runtimeInfo.lastEnqueuedOffset = evData.lastEnqueuedOffset;
        this.runtimeInfo.retrievalTime = evData.retrievalTime;
        debug("[%s] RuntimeInfo of Receiver '%s' is %O", this._context.connectionId,
          this.name, this.runtimeInfo);
      }
      this._onMessage!(evData);
    };

    this._onAmqpError = (context: EventContext) => {
      const receiverError = context.receiver && context.receiver.error;
      const sessionError = context.session && context.session.error;
      if (receiverError) {
        const ehError = translate(context.receiver!.error!);
        debug("[%s] An error occurred for Receiver '%s': %O.",
          this._context.connectionId, this.name, ehError);
        this._onError!(ehError);
      } else if (sessionError) {
        const ehError = translate(context.receiver!.error!);
        debug("[%s] An error occurred on the session for Receiver '%s': %O.",
          this._context.connectionId, this.name, ehError);
        this._onError!(ehError);
      }
    };

    this._onAmqpClose = async (context: EventContext) => {
      const receiverError = context.receiver && context.receiver.error;
      const sessionError = context.session && context.session.error;
      if (receiverError) {
        debug("[%s] 'receiver_close' event occurred for receiver '%s' with address '%s'. " +
          "The associated error is: %O", this._context.connectionId, this.name,
          this.address, receiverError);
      } else if (sessionError) {
        debug("[%s] 'session_close' event occurred for receiver '%s'. The associated error is: %O",
          this._context.connectionId, this.name, sessionError);
      }
      debug("[%s] Calling detached() of receiver '%s' with address '%s to revive the link.",
        this._context.connectionId, this.name, this.address);
      await this.detached(receiverError || sessionError);
    };
  }

  /**
   * Will reconnect the receiver link if necessary.
   * @param {AmqpError | Error} [receiverError] The receiver error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async detached(receiverError?: AmqpError | Error): Promise<void> {
    await this._closeLink(this._receiver); // clear the token renewal timer.
    let shouldReopen = false;
    if (receiverError && this._context.receivers[this.name]) {
      const translatedError = translate(receiverError);
      if (translatedError.retryable) {
        shouldReopen = true;
      }
    } else if (this._context.receivers[this.name]) {
      shouldReopen = true;
      debug("[%s] close() method of Receiver '%s' with address '%s' was not called. " +
        "There was no accompanying error as well. This is a candidate for re-establishing " +
        "the receiver link.", this._context.connectionId, this.name, this.address);
    }
    if (shouldReopen) {
      const rcvrOptions: CreateReceiverOptions = {
        onMessage: this._onAmqpMessage,
        onError: this._onAmqpError,
        onClose: this._onAmqpClose,
        newName: true // provide a new name to the link while re-connecting it. This ensures that
        // the service does not send an error stating that the link is still open.
      };
      // reconnect the receiver link with sequenceNumber of the last received message as the offset
      // if messages were received by the receiver before it got disconnected.
      if (this._checkpoint.sequenceNumber > - 1) {
        rcvrOptions.eventPosition = EventPosition.fromSequenceNumber(this._checkpoint.sequenceNumber);
      }
      const options: ReceiverOptions = this._createReceiverOptions(rcvrOptions);
      // shall retry 3 times at an interval of 15 seconds and bail out.
      const config: RetryConfig<void> = {
        operation: () => this._init(options),
        connectionId: this._context.connectionId,
        operationType: RetryOperationType.receiverLink
      };
      await retry<void>(config);
    }
  }

  /**
   * Closes the underlying AMQP receiver.
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    if (this._receiver) {
      const receiverLink = this._receiver;
      this._deleteFromCache();
      await this._closeLink(receiverLink);
    }
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @return {boolean} boolean
   */
  isOpen(): boolean {
    const result: boolean = this._receiver! && this._receiver!.isOpen();
    debug("[%s] Receiver '%s' with address '%s' is open? -> %s", this._context.connectionId,
      this.name, this.address, result);
    return result;
  }

  protected _deleteFromCache(): void {
    this._receiver = undefined;
    delete this._context.receivers[this.name];
    debug("[%s] Deleted the receiver '%s' from the client cache.",
      this._context.connectionId, this.name);
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   * @returns {Promise<void>}
   */
  protected async _init(options?: ReceiverOptions): Promise<void> {
    try {
      if (!this.isOpen()) {
        await this._negotiateClaim();
        if (!options) {
          options = this._createReceiverOptions({
            onMessage: this._onAmqpMessage,
            onError: this._onAmqpError,
            onClose: this._onAmqpClose
          });
        }
        debug("[%s] Trying to create receiver '%s' with options %O",
          this._context.connectionId, this.name, options);

        this._receiver = await this._context.connection.createReceiver(options);
        // TODO: Need to figure out how to handle session_close for sender and receiver.
        // Should be able to distinguish between sdk calling session close (from the close method)
        // Or due to close in detached. OR it happened due to an actual error.
        // this._receiver.registerSessionHandler(SessionEvents.sessionError, options.onError!);
        // this._receiver.registerSessionHandler(SessionEvents.sessionClose, options.onClose!);
        debug("Promise to create the receiver resolved. Created receiver with name: ", this.name);
        debug("[%s] Receiver '%s' created with receiver options: %O",
          this._context.connectionId, this.name, options);
        // It is possible for someone to close the receiver and then start it again.
        // Thus make sure that the receiver is present in the client cache.
        if (!this._context.receivers[this.name]) this._context.receivers[this.name] = this;
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      debug("[%s] An error occured while creating the receiver '%s': %O",
        this._context.connectionId, this.name, err);
      throw err;
    }
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   */
  protected _createReceiverOptions(options: CreateReceiverOptions): ReceiverOptions {
    if (options.newName) this.name = `${uuid()}`;
    const rcvrOptions: ReceiverOptions = {
      name: this.name,
      autoaccept: true,
      source: {
        address: this.address
      },
      credit_window: this.prefetchCount,
      onMessage: options.onMessage || this._onAmqpMessage,
      onError: options.onError || this._onAmqpError,
      onClose: options.onClose || this._onAmqpClose
    };
    if (this.epoch !== undefined && this.epoch !== null) {
      if (!rcvrOptions.properties) rcvrOptions.properties = {};
      rcvrOptions.properties[Constants.attachEpoch] = types.wrap_long(this.epoch);
    }
    if (this.identifier) {
      if (!rcvrOptions.properties) rcvrOptions.properties = {};
      rcvrOptions.properties[Constants.receiverIdentifierName] = this.identifier;
    }
    if (this.receiverRuntimeMetricEnabled) {
      rcvrOptions.desired_capabilities = Constants.enableReceiverRuntimeMetricName;
    }
    const eventPosition = options.eventPosition || this.options.eventPosition;
    if (eventPosition) {
      // Set filter on the receiver if event position is specified.
      const filterClause = eventPosition.getExpression();
      if (filterClause) {
        (rcvrOptions.source as any).filter = {
          "apache.org:selector-filter:string": types.wrap_described(filterClause, 0x468C00000004)
        };
      }
    }
    return rcvrOptions;
  }
}
