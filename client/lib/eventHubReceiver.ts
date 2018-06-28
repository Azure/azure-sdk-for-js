// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import { Receiver, OnAmqpEvent, EventContext, ReceiverOptions } from "./rhea-promise";
import { translate, Constants, MessagingError } from "./amqp-common";
import { ReceiveOptions, EventData } from ".";
import { ConnectionContext } from "./connectionContext";
import { ClientEntity } from "./clientEntity";

const debug = debugModule("azure:event-hubs:receiver");

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
export class EventHubReceiver extends ClientEntity {
  /**
   * @property {string} consumerGroup The EventHub consumer group from which the receiver will receive messages. (Default: "default").
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
   * @property {ReceiveOptions} [options] Optional properties that can be set while creating the EventHubReceiver.
   */
  options?: ReceiveOptions;
  /**
   * @property {number} [prefetchCount] The number of messages that the receiver can fetch/receive initially. Defaults to 1000.
   */
  prefetchCount?: number = Constants.defaultPrefetchCount;
  /**
   * @property {boolean} receiverRuntimeMetricEnabled Indicates whether receiver runtime metric is enabled. Default: false.
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
   * @property {OnMessage} _onMessage The error handler provided by the user that will be wrapped
   * inside _onAmqpError.
   * @protected
   */
  protected _onError?: OnError;
  /**
   * @property {OnMessage} _onMessage The message handler that will be set as the handler on the
   * underlying rhea receiver for the "message" event.
   * @protected
   */
  protected _onAmqpMessage: OnAmqpEvent;
  /**
   * @property {OnMessage} _onMessage The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   * @protected
   */
  protected _onAmqpError: OnAmqpEvent;

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
    this._onAmqpMessage = (context: EventContext) => {
      const evData = EventData.fromAmqpMessage(context.message!);
      evData.body = this._context.dataTransformer.decode(context.message!.body);

      if (this.receiverRuntimeMetricEnabled && evData) {
        this.runtimeInfo.lastSequenceNumber = evData.lastSequenceNumber;
        this.runtimeInfo.lastEnqueuedTimeUtc = evData.lastEnqueuedTime;
        this.runtimeInfo.lastEnqueuedOffset = evData.lastEnqueuedOffset;
        this.runtimeInfo.retrievalTime = evData.retrievalTime;
      }
      this._onMessage!(evData);
    };

    this._onAmqpError = (context: EventContext) => {
      const ehError = translate(context.receiver!.error!);
      // TODO: Should we retry before calling user's error method?
      debug("[%s] An error occurred for Receiver '%s': %O.",
        this._context.connectionId, this.name, ehError);
      this._onError!(ehError);
    };
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @return {boolean} boolean
   */
  isOpen(): boolean {
    return this._receiver! && this._receiver!.isOpen();
  }

  /**
   * Closes the underlying AMQP receiver.
   */
  async close(): Promise<void> {
    if (this._receiver) {
      try {
        await this._receiver.close();
        // Resetting the mode.
        debug("[%s] Deleted the receiver '%s' from the client cache.", this._context.connectionId, this.name);
        this._receiver = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        debug("[%s] Receiver '%s', has been closed.", this._context.connectionId, this.name);
      } catch (err) {
        debug("An error occurred while closing the receiver %s %O", this.name, translate(err));
      }
    }
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   * @returns {Promise<void>}
   */
  protected async _init(onAmqpMessage?: OnAmqpEvent, onAmqpError?: OnAmqpEvent): Promise<void> {
    try {
      if (!this.isOpen()) {
        await this._negotiateClaim();
        if (!onAmqpMessage) {
          onAmqpMessage = this._onAmqpMessage;
        }
        if (!onAmqpError) {
          onAmqpError = this._onAmqpError;
        }
        debug("[%s] Trying to create receiver '%s'...", this._context.connectionId, this.name);
        const rcvrOptions = this._createReceiverOptions(onAmqpMessage, onAmqpError);
        this._receiver = await this._context.connection!.createReceiver(rcvrOptions);
        debug("Promise to create the receiver resolved. Created receiver with name: ", this.name);
        debug("[%s] Receiver '%s' created with receiver options: %O",
          this._context.connectionId, this.name, rcvrOptions);
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
   * @private
   */
  private _createReceiverOptions(onMessage?: OnAmqpEvent, onError?: OnAmqpEvent): ReceiverOptions {
    const rcvrOptions: ReceiverOptions = {
      name: this.name,
      autoaccept: true,
      source: {
        address: this.address
      },
      credit_window: this.prefetchCount,
      onMessage: onMessage,
      onError: onError
    };
    if (this.epoch !== undefined && this.epoch !== null) {
      if (!rcvrOptions.properties) rcvrOptions.properties = {};
      rcvrOptions.properties[Constants.attachEpoch] = rhea.types.wrap_long(this.epoch);
    }
    if (this.identifier) {
      if (!rcvrOptions.properties) rcvrOptions.properties = {};
      rcvrOptions.properties[Constants.receiverIdentifierName] = this.identifier;
    }
    if (this.receiverRuntimeMetricEnabled) {
      rcvrOptions.desired_capabilities = Constants.enableReceiverRuntimeMetricName;
    }
    if (this.options && this.options.eventPosition) {
      // Set filter on the receiver if event position is specified.
      const filterClause = this.options.eventPosition.getExpression();
      if (filterClause) {
        (rcvrOptions.source as any).filter = {
          "apache.org:selector-filter:string": rhea.types.wrap_described(filterClause, 0x468C00000004)
        };
      }
    }
    return rcvrOptions;
  }
}
