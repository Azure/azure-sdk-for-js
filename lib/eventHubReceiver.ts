// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import * as rheaPromise from "./rhea-promise";
import * as errors from "./errors";
import * as Constants from "./util/constants";
import { EventEmitter } from "events";
import { ReceiveOptions, EventData, Errors } from ".";
import { ConnectionContext } from "./eventHubClient";
import { defaultLock, Func } from "./util/utils";

const debug = debugModule("azure:event-hubs:receiver");

/**
 * Represents the approximate receiver runtime information for a logical partition of an Event Hub.
 * @interface ReceiverRuntimeInfo
 */
export interface ReceiverRuntimeInfo {
  /**
   * @property {string} partitionId The parition identifier.
   */
  paritionId: string;
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
 * Describes the event handler signtaure for the "message" event.
 */
export interface OnMessage {
  (event: "message", handler: (eventData: EventData) => void): void;
}

/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
 */
export class EventHubReceiver extends EventEmitter {
  /**
   * @property {string} [name] The unique EventHub Receiver name (mostly a guid).
   */
  name?: string;
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
   * @property {number} [prefetchCount] The number of messages that the receiver can fetch/receive initially. Defaults to 500.
   */
  prefetchCount?: number = 500;
  /**
   * @property {boolean} receiverRuntimeMetricEnabled Indicates whether receiver runtime metric is enabled. Default: false.
   */
  receiverRuntimeMetricEnabled: boolean = false;
  /**
   * @property {ConnectionContext} _context Provides relevant information about the amqp connection, cbs and $management sessions,
   * token provider, sender and receivers.
   * @private
   */
  private _context: ConnectionContext;
  /**
   * @property {any} [_receiver] The AMQP receiver link.
   * @private
   */
  private _receiver?: any;
  /**
   * @property {any} [_session] The AMQP receiver session.
   * @private
   */
  private _session?: any;
  /**
   * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when the EventHub Sender is due for token renewal.
   * @private
   */
  private _tokenRenewalTimer?: NodeJS.Timer;

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
    super();
    if (!options) options = {};
    this._context = context;
    this.partitionId = partitionId;
    this.consumerGroup = options.consumerGroup ? options.consumerGroup : Constants.defaultConsumerGroup;
    this.address = `${this._context.config.entityPath}/ConsumerGroups/${this.consumerGroup}/Partitions/${this.partitionId}`;
    this.audience = `${this._context.config.endpoint}${this.address}`;
    this.prefetchCount = options.prefetchCount !== undefined && options.prefetchCount !== null ? options.prefetchCount : 1000;
    this.epoch = options.epoch;
    this.identifier = options.identifier;
    this.options = options;
    this.receiverRuntimeMetricEnabled = options.enableReceiverRuntimeMetric || false;
    this.runtimeInfo = {
      paritionId: `${partitionId}`
    };

    const onMessage = (context: rheaPromise.Context) => {
      const evData = EventData.fromAmqpMessage(context.message);
      this.emit(Constants.message, evData);
    };
    const onError = async (context: rheaPromise.Context) => {
      // Since the receiver received an error the link has been closed. So calling
      // this.close() will ensure that the receiver has been removed from the context.
      await this.close();
      this.emit(Constants.error, errors.translate(context.receiver.error));
    };

    this.on("newListener", (event) => {
      if (event === Constants.message) {
        if (this._session && this._receiver) {
          debug("Attaching an event handler for the 'message' event on the underlying amqp receiver: ", this.name!);
          this._receiver.on(Constants.message, onMessage);
        }
      }

      if (event === Constants.error) {
        if (this._session && this._receiver) {
          debug("Attaching an event handler for the 'receiver_error' event on the underlying amqp receiver: ", this.name!);
          this._receiver.on(Constants.receiverError, onError);
        }
      }
    });

    this.on("removeListener", (event) => {
      if (event === Constants.message) {
        if (this._session && this._receiver) {
          debug("Removing an event handler for the 'message' event on the underlying amqp receiver: ", this.name!);
          this._receiver.removeListener(Constants.message, onMessage);
        }
      }

      if (event === Constants.error) {
        if (this._session && this._receiver) {
          debug("Removing an event handler for the 'receiver_error' event on the underlying amqp receiver: ", this.name!);
          this._receiver.removeListener(Constants.receiverError, onError);
        }
      }
    });
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   * @returns {Promoise<void>}
   */
  async init(): Promise<void> {
    try {
      // Acquire the lock and establish a cbs session if it does not exist on the connection.
      await defaultLock.acquire(this._context.cbsSession.cbsLock, () => { return this._context.cbsSession.init(this._context.connection); });
      const tokenObject = await this._context.tokenProvider.getToken(this.audience);
      debug(`[${this._context.connectionId}] EH Receiver: calling negotiateClaim for audience "${this.audience}"`);
      // Negotitate the CBS claim.
      await this._context.cbsSession.negotiateClaim(this.audience, this._context.connection, tokenObject);
      if (!this._session && !this._receiver) {
        let receiverError: any;
        let rcvrOptions: rheaPromise.ReceiverOptions = {
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
          let filterClause = this.options.eventPosition.getExpression();
          if (filterClause) {
            rcvrOptions.source.filter = {
              "apache.org:selector-filter:string": rhea.types.wrap_described(filterClause, 0x468C00000004)
            };
          }
        }
        this._session = await rheaPromise.createSession(this._context.connection);
        const handleReceiverError = (context: rheaPromise.Context) => {
          receiverError = errors.translate(context.receiver.error);
          debug(`An error occurred while creating the receiver "${this.name}" : `, receiverError);
        };
        this._session.on(Constants.receiverError, handleReceiverError);
        debug("Trying to create a receiver...");
        this._receiver = await rheaPromise.createReceiver(this._session, rcvrOptions);
        debug("Promise to create the receiver resolved. Created receiver with name: ", this.name);

        this.name = this._receiver.name;
        if (receiverError) {
          // There are cases where the EH service sends an attach frame, which causes rhea to emit receiver_open event
          // thus resolving the promise to create a receiver and moments later the service sends back a detach frame
          // indicating that there was some error. Hence we check for receiverError, even after the promise has resolved.
          debug("throwing the receiverError, ", receiverError);
          throw receiverError;
        }
        this._session.removeListener(Constants.receiverError, handleReceiverError);
        debug(`[${this._context.connectionId}] Receiver "${this.name}" created with receiver options: \n${JSON.stringify(rcvrOptions, undefined, 2)}`);
      }
      debug(`[${this._context.connectionId}] Negotatited claim for receiver "${this.name}" with with partition "${this.partitionId}"`);
      this._ensureTokenRenewal();
    } catch (err) {
      if (err.value || (err.constructor && err.constructor.name === "c")) err = Errors.translate(err);
      debug("Will reject the promise to create the receiver with error", err);
      return Promise.reject(err);
    }
  }

  /**
   * Receive a batch of EventDatas from an EventHub partition for a given count and a given max wait time in seconds, whichever
   * happens first.
   *
   * @param {number} maxMessageCount                         The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds]          The maximum wait time in seconds for which the Receiver should wait
   * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @returns {Promise<EventData[]>} A promise that resolves with an array of EventData objects.
   */
  async receive(maxMessageCount: number, maxWaitTimeInSeconds?: number): Promise<EventData[]> {
    if (!maxMessageCount || (maxMessageCount && typeof maxMessageCount !== 'number')) {
      throw new Error("'maxMessageCount' is a required parameter of type number with a value greater than 0.");
    }

    if (maxWaitTimeInSeconds === null || maxWaitTimeInSeconds === undefined) {
      maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
    }

    if (!this._session && !this._receiver) {
      throw Errors.translate({ condition: Errors.ConditionStatusMapper[404], description: "The messaging entity underlying amqp receiver could not be found." });
    }

    try {
      let eventDatas: EventData[] = [];
      let count = 0;
      let timeOver = false;
      return new Promise<EventData[]>((resolve, reject) => {
        let onReceiveMessage: Func<EventData, void>;
        let waitTimer: NodeJS.Timer;
        let actionAfterWaitTimeout: Func<void, void>;
        // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
        const finalAction = (timeOver: boolean, data?: EventData) => {
          // Remove the listener to avoid receiving duplicate messages.
          this.removeListener(Constants.message, onReceiveMessage);
          if (!data) {
            data = eventDatas.length ? eventDatas[eventDatas.length - 1] : undefined;
          }
          if (timeOver) {
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
          finalAction(timeOver);
        };

        // Action to be performed on the "message" event.
        onReceiveMessage = (data: EventData) => {
          if (!timeOver && count <= maxMessageCount) {
            count++;
            // console.log(`${new Date().toString()} - ${count}`);
            eventDatas.push(data);
          }
          if (count === maxMessageCount) {
            finalAction(timeOver, data);
          }
        };
        waitTimer = setTimeout(actionAfterWaitTimeout, (maxWaitTimeInSeconds as number) * 1000);
        this.on(Constants.message, onReceiveMessage);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Closes the underlying AMQP receiver.
   */
  async close(): Promise<void> {
    if (this._receiver) {
      try {
        // TODO: should I call _receiver.detach() or _receiver.close()?
        // should I also call this._session.close() after closing the reciver
        // or can I directly close the session which will take care of closing the receiver as well.
        await rheaPromise.closeReceiver(this._receiver);
        this.removeAllListeners();
        delete this._context.receivers[this.name!];
        debug(`Deleted the receiver "${this.name!}" from the client cache.`);
        this._receiver = undefined;
        this._session = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        debug(`[${this._context.connectionId}] Receiver "${this.name}" has been closed.`);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }

  /**
   * Ensures that the token is renewed within the predfiend renewal margin.
   */
  private _ensureTokenRenewal(): void {
    const tokenValidTimeInSeconds = this._context.tokenProvider.tokenValidTimeInSeconds;
    const tokenRenewalMarginInSeconds = this._context.tokenProvider.tokenRenewalMarginInSeconds;
    const nextRenewalTimeout = (tokenValidTimeInSeconds - tokenRenewalMarginInSeconds) * 1000;
    this._tokenRenewalTimer = setTimeout(async () => await this.init(), nextRenewalTimeout);
    debug(`[${this._context.connectionId}] Receiver "${this.name}", has next token renewal in ${nextRenewalTimeout / 1000} seconds ` +
      `@(${new Date(Date.now() + nextRenewalTimeout).toString()}).`);
  }
}
