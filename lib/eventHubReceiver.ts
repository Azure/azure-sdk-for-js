// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import * as rheaPromise from "./rhea-promise";
import * as rpc from "./rpc";
import { translate, ErrorNameConditionMapper } from "./errors";
import * as Constants from "./util/constants";
import { EventEmitter } from "events";
import { ReceiveOptions, EventData, EventHubsError } from ".";
import { ConnectionContext } from "./connectionContext";
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

export enum Mode {
  start = "start",
  receive = "receive"
}

/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
 */
export class EventHubReceiver extends EventEmitter {
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

  private _onMessage?: OnMessage;

  private _onError?: OnError;

  private _mode?: Mode;

  private _onAmqpMessage: rheaPromise.OnAmqpEvent;

  private _onAmqpError: rheaPromise.OnAmqpEvent;

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
    this.name = options.name || uuid();
    this.partitionId = partitionId;
    this.consumerGroup = options.consumerGroup ? options.consumerGroup : Constants.defaultConsumerGroup;
    this.address = `${this._context.config.entityPath}/ConsumerGroups/${this.consumerGroup}/Partitions/${this.partitionId}`;
    this.audience = `${this._context.config.endpoint}${this.address}`;
    this.prefetchCount = options.prefetchCount !== undefined && options.prefetchCount !== null ? options.prefetchCount : Constants.defaultPrefetchCount;
    this.epoch = options.epoch;
    this.identifier = options.identifier;
    this.options = options;
    this.receiverRuntimeMetricEnabled = options.enableReceiverRuntimeMetric || false;
    this.runtimeInfo = {
      partitionId: `${partitionId}`
    };
    this._onAmqpMessage = (context: rheaPromise.Context) => {
      const evData = EventData.fromAmqpMessage(context.message!);
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
      this._mode = undefined;
      // TODO: Should we retry before calling user's error method?
      this._onError!(ehError);
    };
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

    if (this._mode === Mode.start) {
      throw translate({
        condition: ErrorNameConditionMapper.InvalidOperationError,
        description: `Receiver ${this.name} is currently receiving messages using the "start()" method. ` +
          `Hence receive() cannot be called, both are mutually exclusive. If you want to use "receive()", ` +
          ` then please call "await receiver.close();" before calling the "receive()" method.`
      });
    } else if (this._mode === Mode.receive) {
      throw translate({
        condition: ErrorNameConditionMapper.InvalidOperationError,
        description: `Receiver ${this.name} is currently receiving messages using the "receive()" method. ` +
          `Once the current "receive()" is done executing, then the next receive() can be performed.`
      });
    }
    this._mode = Mode.receive;
    const eventDatas: EventData[] = [];
    let timeOver = false;
    return new Promise<EventData[]>((resolve, reject) => {
      let onReceiveMessage: rheaPromise.OnAmqpEvent;
      let onReceiveError: rheaPromise.OnAmqpEvent;
      let waitTimer: any;
      let actionAfterWaitTimeout: Func<void, void>;
      // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
      const finalAction = (timeOver: boolean, data?: EventData) => {
        // Resetting the mode. Now anyone can call start() or receive() again.
        this._mode = undefined;
        this._receiver.removeListener(Constants.receiverError, onReceiveError);
        this._receiver.removeListener(Constants.message, onReceiveMessage);
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
        finalAction(timeOver);
      };

      // Action to be performed on the "message" event.
      onReceiveMessage = (context: rheaPromise.Context) => {
        const data: EventData = EventData.fromAmqpMessage(context.message!);
        if (eventDatas.length <= maxMessageCount) {
          eventDatas.push(data);
        }
        if (eventDatas.length === maxMessageCount) {
          finalAction(timeOver, data);
        }
      };

      // Action to be taken when an error is received.
      onReceiveError = (context: rheaPromise.Context) => {
        this._mode = undefined;
        this._receiver.removeListener(Constants.receiverError, onReceiveError);
        this._receiver.removeListener(Constants.message, onReceiveMessage);
        const error = translate(context.receiver.error);
        debug("[%s] Receiver '%s' received an error:\n%O", this._context.connectionId, this.name, error);
        if (waitTimer) {
          clearTimeout(waitTimer);
        }
        reject(error);
      };

      const addCreditAndSetTimer = (reuse?: boolean) => {
        debug("[%s] Receiver '%s', adding credit for receiving %d messages.", this._context.connectionId, this.name, maxMessageCount);
        this._receiver.add_credit(maxMessageCount);
        let msg: string = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
        if (reuse) msg += " Receiver link already present, hence reusing it.";
        debug(msg, this._context.connectionId, maxWaitTimeInSeconds, this.name);
        waitTimer = setTimeout(actionAfterWaitTimeout, (maxWaitTimeInSeconds as number) * 1000);
      };

      if (!this._session && !this._receiver) {
        debug("[%s] Receiver '%s', setting the prefetch count to 0.", this._context.connectionId, this.name);
        this.prefetchCount = 0;
        this._init(onReceiveMessage, onReceiveError).then(() => {
          return addCreditAndSetTimer();
        }).catch((err) => {
          this._mode = undefined;
          reject(err);
        });
      } else {
        addCreditAndSetTimer(true);
        this._receiver.on(Constants.message, onReceiveMessage);
        this._receiver.on(Constants.receiverError, onReceiveError);
      }
    });
  }

  /**
   * Closes the underlying AMQP receiver.
   * @param {boolean} [preserveInContext] Should the receiver be preserved in context. Default value false.
   */
  async close(preserveInContext?: boolean): Promise<void> {
    if (this._receiver) {
      try {
        // TODO: should I call _receiver.detach() or _receiver.close()?
        // should I also call this._session.close() after closing the reciver
        // or can I directly close the session which will take care of closing the receiver as well.
        await rheaPromise.closeReceiver(this._receiver);
        // Resetting the mode.
        this._mode = undefined;
        if (!preserveInContext) delete this._context.receivers[this.name];
        debug(`Deleted the receiver "${this.name}" from the client cache.`);
        this._receiver = undefined;
        this._session = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        debug(`[${this._context.connectionId}] Receiver "${this.name}" has been closed.`);
      } catch (err) {
        debug("An error occurred while closing the receiver %O", err);
        throw err;
      }
    }
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   * This method **MUST NOT** be used along with the `receive()` method. Once you start the receiver
   * the only way to stop the receiver is by closing the receiver or an error occurs while receiving
   * the messages.
   *
   * @param {OnMessage} onMessage The message handler to receive event data objects.
   * @param {OnError} onError The error handler to receive an error that occurs while receivin messages.
   */
  start(onMessage: OnMessage, onError: OnError): void {
    if (!onMessage || typeof onMessage !== "function") {
      throw new Error("'onMessage' is a required parameter and must be of type 'function'.");
    }
    if (!onError || typeof onError !== "function") {
      throw new Error("'onError' is a required parameter and must be of type 'function'.");
    }
    if (this._mode === Mode.start) {
      throw translate({
        condition: ErrorNameConditionMapper.InvalidOperationError,
        description: `Receiver ${this.name} has already been started. ` +
          `Please create a new EventHubReceiver using "client.createReceiver()" and then start that receiver.`
      });
    } else if (this._mode === Mode.receive) {
      throw translate({
        condition: ErrorNameConditionMapper.InvalidOperationError,
        description: `Receiver ${this.name} is currently receiving messages ` +
          `using the "receive()" method. You can use the start() method after receive() is done executing.`
      });
    }
    this._mode = Mode.start;
    this._onMessage = onMessage;
    this._onError = onError;
    if (!this._session && !this._receiver) {
      this._init().catch((err) => {
        this._mode = undefined;
        this._onError!(err);
      });
    } else {
      // It is possible that the receiver link has been established due to a previous receive() call. If that
      // is the case then add message and error event handlers to the receiver. When the receiver will be closed
      // these handlers will be automatically removed.
      debug("[%s] Receiver link is already present for '%s' due to previous receive() calls. " +
        "Hence reusing it and attaching message and error handlers.", this._context.connectionId, this.name);
      this._receiver.on(Constants.message, this._onAmqpMessage);
      this._receiver.on(Constants.receiverError, this._onAmqpError);
      this._receiver.set_credit_window(Constants.defaultPrefetchCount);
      this._receiver.add_credit(Constants.defaultPrefetchCount);
      debug("[%s] Receiver '%s', set the prefetch count to 1000 and " +
        "providing a credit of the same amount.", this._context.connectionId, this.name);
    }
  }

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
   * Creates a new AMQP receiver under a new AMQP session.
   * @returns {Promise<void>}
   */
  private async _init(onAmqpMessage?: rheaPromise.OnAmqpEvent, onAmqpError?: rheaPromise.OnAmqpEvent): Promise<void> {
    try {
      // Acquire the lock and establish an amqp connection if it does not exist.
      if (!this._context.connection) {
        debug(`EH Receiver "${this.name}" establishing AMQP connection.`);
        await defaultLock.acquire(this._context.connectionLock, () => { return rpc.open(this._context); });
      }

      if (!this._session && !this._receiver) {
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
        debug("[%s] Receiver '%s' created with receiver options: %O", this._context.connectionId, this.name, rcvrOptions);
        // It is possible for someone to close the receiver and then start it again.
        // Thus make sure that the receiver is present in the client cache.
        if (!this._context.receivers[this.name]) this._context.receivers[this.name] = this;
        this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      debug("[%s] An error occured while creating the receiver '%s': %O", this._context.connectionId, this.name, err);
      throw err;
    }
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
    debug(`Acquiring lock: ${this._context.cbsSession.cbsLock} for creating the cbs session while creating` +
      ` the receiver.`);
    // Acquire the lock and establish a cbs session if it does not exist on the connection.
    await defaultLock.acquire(this._context.cbsSession.cbsLock, () => { return this._context.cbsSession.init(this._context.connection); });
    const tokenObject = await this._context.tokenProvider.getToken(this.audience);
    debug(`[${this._context.connectionId}] EH Receiver "${this.name}": calling negotiateClaim for audience "${this.audience}"`);
    // Negotiate the CBS claim.
    await this._context.cbsSession.negotiateClaim(this.audience, this._context.connection, tokenObject);
    debug(`[${this._context.connectionId}] Negotiated claim for receiver "${this.name}" with with partition "${this.partitionId}"`);
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
        debug("[%s] Receiver '%s', an error occurred while renewing the token: %O", this._context.connectionId, this.name, err);
        this.emit(Constants.error, translate(err));
      }
    }, nextRenewalTimeout);
    debug(`[${this._context.connectionId}] Receiver "${this.name}", has next token renewal in ${nextRenewalTimeout / 1000} seconds ` +
      `@(${new Date(Date.now() + nextRenewalTimeout).toString()}).`);
  }
}
