// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import * as rheaPromise from "./rhea-promise";
import { translate } from "./errors";
import * as Constants from "./util/constants";
import { ReceiveOptions, EventData, EventHubsError } from ".";
import { ConnectionContext } from "./connectionContext";
import { defaultLock } from "./util/utils";

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
export type OnError = (error: EventHubsError | Error) => void;

/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
 */
export class EventHubReceiver {
  /**
   * @property {string} [name] The unique EventHub Receiver name (mostly a guid).
   */
  name: string;
  /**
   * @property {string} address The EventHub Receiver address in the following format:
   * - "<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"
   */
  address: string;
  /**
   * @property {string} audience The EventHub Receiver token audience in the following format:
   * - "sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"
   */
  audience: string;
  /**
   * @property {string} consumerGroup The EventHub consumer group from which the receiver will receive messages. (Default: "default").
   */
  consumerGroup: string;
  /**
   * @property {string | number} partitionId The EentHub partitionId from which the receiver will receive messages.
   */
  partitionId: string | number;
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
   * @property {ConnectionContext} _context Provides relevant information about the amqp connection, cbs and $management sessions,
   * token provider, sender and receivers.
   * @protected
   */
  protected _context: ConnectionContext;
  /**
   * @property {any} [_receiver] The AMQP receiver link.
   * @protected
   */
  protected _receiver?: any;
  /**
   * @property {any} [_session] The AMQP receiver session.
   * @protected
   */
  protected _session?: any;
  /**
   * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when the EventHub Sender is
   * due for token renewal.
   * @protected
   */
  protected _tokenRenewalTimer?: NodeJS.Timer;

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
  protected _onAmqpMessage: rheaPromise.OnAmqpEvent;
  /**
   * @property {OnMessage} _onMessage The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   * @protected
   */
  protected _onAmqpError: rheaPromise.OnAmqpEvent;

  /**
   * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
   *
   * @constructor
   * @param {EventHubClient} client                            The EventHub client.
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
    if (!options) options = {};
    this._context = context;
    this.name = options.name || uuid();
    this.partitionId = partitionId;
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
    this._onAmqpMessage = (context: rheaPromise.Context) => {
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

    this._onAmqpError = (context: rheaPromise.Context) => {
      const ehError = translate(context.receiver.error);
      // TODO: Should we retry before calling user's error method?
      debug("[%s] An error occurred for Receiver '%s': %O.",
        this._context.connectionId, this.name, ehError);
      this._onError!(ehError);
    };
  }



  /**
   * Closes the underlying AMQP receiver.
   * @param {boolean} [preserveInContext] Should the receiver be preserved in context. Default value false.
   */
  async close(): Promise<void> {
    if (this._receiver) {
      try {
        // TODO: should I call _receiver.detach() or _receiver.close()?
        // should I also call this._session.close() after closing the reciver
        // or can I directly close the session which will take care of closing the receiver as well.
        await rheaPromise.closeReceiver(this._receiver);
        // Resetting the mode.
        debug("[%s] Deleted the receiver '%s' from the client cache.", this._context.connectionId, this.name);
        this._receiver = undefined;
        this._session = undefined;
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
  protected async _init(onAmqpMessage?: rheaPromise.OnAmqpEvent, onAmqpError?: rheaPromise.OnAmqpEvent): Promise<void> {
    try {
      if (!this._isOpen()) {
        await this._negotiateClaim();
        if (!onAmqpMessage) {
          onAmqpMessage = this._onAmqpMessage;
        }
        if (!onAmqpError) {
          onAmqpError = this._onAmqpError;
        }
        this._session = await rheaPromise.createSession(this._context.connection);
        debug("[%s] Trying to create receiver '%s'...", this._context.connectionId, this.name);
        const rcvrOptions = this._createReceiverOptions();
        this._receiver = await rheaPromise.createReceiverWithHandlers(this._session, onAmqpMessage, onAmqpError, rcvrOptions);
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
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @protected
   *
   * @return {boolean} boolean
   */
  protected _isOpen(): boolean {
    let result: boolean = false;
    if (this._session && this._receiver) {
      if (this._receiver.is_open && this._receiver.is_open()) {
        result = true;
      }
    }
    return result;
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   * @private
   */
  private _createReceiverOptions(): rheaPromise.ReceiverOptions {
    const rcvrOptions: rheaPromise.ReceiverOptions = {
      name: this.name,
      autoaccept: true,
      source: {
        address: this.address
      },
      credit_window: this.prefetchCount,
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
        rcvrOptions.source.filter = {
          "apache.org:selector-filter:string": rhea.types.wrap_described(filterClause, 0x468C00000004)
        };
      }
    }
    return rcvrOptions;
  }

  /**
   * Negotiates the cbs claim for the EventHubReceiver.
   * @private
   * @param {boolean} [setTokenRenewal] Set the token renewal timer. Default false.
   * @return {Promise<void>} Promise<void>
   */
  private async _negotiateClaim(setTokenRenewal?: boolean): Promise<void> {
    // Acquire the lock and establish a cbs session if it does not exist on the connection. Although node.js
    // is single threaded, we need a locking mechanism to ensure that a race condition does not happen while
    // creating a shared resource (in this case the cbs session, since we want to have exactly 1 cbs session
    // per connection).
    debug("[%s] Acquiring lock: '%s' for creating the cbs session while creating the " +
      "receiver: '%s' with address: '%s'.", this._context.connectionId, this._context.cbsSession!.cbsLock,
      this.name, this.address);
    // Acquire the lock and establish a cbs session if it does not exist on the connection.
    await defaultLock.acquire(this._context.cbsSession!.cbsLock, () => { return this._context.cbsSession!.init(); });
    const tokenObject = await this._context.tokenProvider.getToken(this.audience);
    debug("[%s] EH Receiver '%s': calling negotiateClaim for audience '%s'.", this._context.connectionId, this.audience);
    // Acquire the lock to negotiate the CBS claim.
    debug("[%s] Acquiring lock: '%s' for cbs auth for receiver: '%s' with address: '%s'.",
      this._context.connectionId, this._context.negotiateClaimLock, this.name, this.address);
    await defaultLock.acquire(this._context.negotiateClaimLock, () => {
      return this._context.cbsSession!.negotiateClaim(this.audience, tokenObject);
    });
    debug("[%s] Negotiated claim for receiver '%s' with address '%s'",
      this._context.connectionId, this.name, this.address);
    if (setTokenRenewal) {
      await this._ensureTokenRenewal();
    }
  }

  /**
   * Ensures that the token is renewed within the predefined renewal margin.
   * @private
   * @return {Promise<void>} Promise<void>
   */
  private async _ensureTokenRenewal(): Promise<void> {
    const tokenValidTimeInSeconds = this._context.tokenProvider.tokenValidTimeInSeconds;
    const tokenRenewalMarginInSeconds = this._context.tokenProvider.tokenRenewalMarginInSeconds;
    const nextRenewalTimeout = (tokenValidTimeInSeconds - tokenRenewalMarginInSeconds) * 1000;
    this._tokenRenewalTimer = setTimeout(async () => {
      try {
        await this._negotiateClaim(true);
      } catch (err) {
        // TODO: May be add some retries over here before emitting the error.
        debug("[%s] Receiver '%s', with address '%s' an error occurred while renewing the token: %O",
          this._context.connectionId, this.name, this.address, translate(err));
      }
    }, nextRenewalTimeout);
    debug("[%s]Receiver '%s' with address '%s' has next token renewal in %d seconds @(%s).",
      this._context.connectionId, this.name, this.address, nextRenewalTimeout / 1000,
      new Date(Date.now() + nextRenewalTimeout).toString());
  }
}
