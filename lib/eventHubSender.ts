// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import { translate } from "./errors";
import * as rpc from "./rpc";
import * as rheaPromise from "./rhea-promise";
import * as Constants from "./util/constants";
import { EventEmitter } from "events";
import { EventData, AmqpMessage, messageProperties } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { defaultLock, Func } from "./util/utils";

const debug = debugModule("azure:event-hubs:sender");

/**
 * Instantiates a new sender from the AMQP `Sender`. Used by `EventHubClient`.
 *
 * @param {any} session - The amqp session on which the amqp sender link was created.
 * @param {any} sender - The amqp sender link.
 * @constructor
 */
export class EventHubSender extends EventEmitter {
  /**
   * @property {string} [name] The unique EventHub Sender name (mostly a guid).
   */
  name: string;
  /**
   * @property {string} [partitionId] The partitionId to which the sender wants to send the EventData.
   */
  partitionId?: string | number;
  /**
   * @property {string} address The EventHub Sender address in one of the following forms:
   * - "<hubName>"
   * - "<hubName>/Partitions/<partitionId>".
   */
  address: string;
  /**
   * @property {string} audience The EventHub Sender token audience in one of the following forms:
   * - "sb://<yournamespace>.servicebus.windows.net/<hubName>"
   * - "sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>".
   */
  audience: string;
  readonly senderLock: string = `sender-${uuid()}`;
  /**
   * @property {ConnectionContext} _context Provides relevant information about the amqp connection,
   * cbs and $management sessions, token provider, sender and receivers.
   * @private
   */
  private _context: ConnectionContext;
  /**
   * @property {any} [_sender] The AMQP sender link.
   * @private
   */
  private _sender?: any;
  /**
   * @property {any} [_session] The AMQP sender session.
   * @private
   */
  private _session?: any;
  /**
   * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when
   * the EventHub Sender is due for token renewal.
   * @private
   */
  private _tokenRenewalTimer?: NodeJS.Timer;

  /**
   * Creates a new EventHubSender instance.
   * @constructor
   * @param {EventHubClient} client The EventHub client.
   * @param {string|number} [partitionId] The EventHub partition id to which the sender wants to send the event data.
   */
  constructor(context: ConnectionContext, partitionId?: string | number, name?: string) {
    super();
    this._context = context;
    this.name = name || uuid();
    this.address = this._context.config.entityPath as string;
    this.partitionId = partitionId;
    if (this.partitionId !== null && this.partitionId !== undefined) {
      this.address += `/Partitions/${this.partitionId}`;
    }
    this.audience = `${this._context.config.endpoint}${this.address}`;
    const onError = (context: rheaPromise.Context) => {
      this.emit(Constants.error, translate(context.sender.error));
    };

    this.on("newListener", (event) => {
      if (event === Constants.error) {
        if (this._session && this._sender) {
          debug("Attaching an event handler for the 'sender_error' event on the underlying amqp sender: ", this.name!);
          this._sender.on(Constants.senderError, onError);
        }
      }
    });

    this.on("removeListener", (event) => {
      if (event === Constants.error) {
        if (this._session && this._sender) {
          debug("Removing an event handler for the 'sender_error' event on the underlying amqp sender: ", this.name!);
          this._sender.removeListener(Constants.senderError, onError);
        }
      }
    });
  }

  /**
   * Sends the given message, with the given options on this link
   *
   * @method send
   * @param {any} data               Message to send.  Will be sent as UTF8-encoded JSON string.
   * @param {string} [partitionKey]  Partition key - sent as x-opt-partition-key, and will hash to a partitionId.
   * @returns {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
   */
  async send(data: EventData, partitionKey?: string): Promise<rheaPromise.Delivery> {
    try {
      if (!data || (data && typeof data !== "object")) {
        throw new Error("data is required and it must be of type object.");
      }

      if (partitionKey && typeof partitionKey !== "string") {
        throw new Error("partitionKey must be of type string");
      }

      if (!this._session && !this._sender) {
        debug("Acquiring lock %s for initializing the session, sender and possibly the connection.", this.senderLock);
        await defaultLock.acquire(this.senderLock, () => { return this._init(); });
      }

      const message = EventData.toAmqpMessage(data);
      if (partitionKey) {
        if (!message.message_annotations) message.message_annotations = {};
        message.message_annotations[Constants.partitionKey] = partitionKey;
      }
      return await this._trySend(message);
    } catch (err) {
      debug("An error occurred while sending the message %O", err);
      throw err;
    }
  }

  /**
   * Send a batch of EventData to the EventHub.
   * @param {Array<EventData>} datas  An array of EventData objects to be sent in a Batch message.
   * @param {string} [partitionKey]   Partition key - sent as x-opt-partition-key, and will hash to a partitionId.
   * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
   */
  async sendBatch(datas: EventData[], partitionKey?: string): Promise<rheaPromise.Delivery> {
    try {
      if (!datas || (datas && !Array.isArray(datas))) {
        throw new Error("data is required and it must be an Array.");
      }

      if (partitionKey && typeof partitionKey !== "string") {
        throw new Error("partitionKey must be of type string");
      }

      if (!this._session && !this._sender) {
        debug("Acquiring lock %s for initializing the session, sender and possibly the connection.", this.senderLock);
        await defaultLock.acquire(this.senderLock, () => { return this._init(); });
      }
      debug(`[${this._context.connectionId}] Sender "${this.name}", trying to send EventData[].`, datas);
      const messages: AmqpMessage[] = [];
      // Convert EventData to AmqpMessage.
      for (let i = 0; i < datas.length; i++) {
        const message = EventData.toAmqpMessage(datas[i]);
        if (partitionKey) {
          if (!message.message_annotations) message.message_annotations = {};
          message.message_annotations[Constants.partitionKey] = partitionKey;
        }
        messages[i] = message;
      }
      // Encode every amqp message and then convert every encoded message to amqp data section
      const batchMessage: AmqpMessage = {
        body: rhea.message.data_sections(messages.map(rhea.message.encode))
      };
      // Set message_annotations, application_properties and properties of the first message as
      // that of the envelope (batch message).
      if (messages[0].message_annotations) {
        batchMessage.message_annotations = messages[0].message_annotations;
      }
      if (messages[0].application_properties) {
        batchMessage.application_properties = messages[0].application_properties;
      }
      for (const prop of messageProperties) {
        if ((messages[0] as any)[prop]) {
          (batchMessage as any)[prop] = (messages[0] as any)[prop];
        }
      }

      // Finally encode the envelope (batch message).
      const encodedBatchMessage = rhea.message.encode(batchMessage);
      debug(`[${this._context.connectionId}] Sender "${this.name}", ` +
        `sending encoded batch message.`, encodedBatchMessage);
      return await this._trySend(encodedBatchMessage, undefined, 0x80013700);
    } catch (err) {
      debug("An error occurred while sending the batch message %O", err);
      throw err;
    }
  }

  /**
   * "Unlink" this sender, closing the link and resolving when that operation is complete.
   * Leaves the underlying connection/session open.
   * @method close
   * @return {Promise<void>} Promise<void>
   */
  async close(): Promise<void> {
    if (this._sender) {
      try {
        await rheaPromise.closeSender(this._sender);
        this.removeAllListeners();
        delete this._context.senders[this.name!];
        debug(`Deleted the sender "${this.name!}" from the client cache.`);
        this._sender = undefined;
        this._session = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        debug(`[${this._context.connectionId}] Sender "${this.name}" closed.`);
      } catch (err) {
        debug("An error occurred while closing the sender %O", err);
        throw err;
      }
    }
  }

  private _createSenderOptions(): rheaPromise.SenderOptions {
    const options: rheaPromise.SenderOptions = {
      name: this.name,
      target: {
        address: this.address
      }
    };
    debug("Creating sender with options: %O", options);
    return options;
  }

  /**
   * Tries to send the message to EventHub if there is enough credit to send them
   * and the circular buffer has available space to settle the message after sending them.
   *
   * We have implemented a synchronous send over here. We shall be waiting for the message
   * to be accepted or rejected and accordingly resolve or reject the promise.
   *
   * @param message The message to be sent to EventHub.
   * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
   */
  private _trySend(message: AmqpMessage, tag?: any, format?: number): Promise<rheaPromise.Delivery> {
    return new Promise((resolve, reject) => {
      debug(`[${this._context.connectionId}] Sender "${this.name}", credit: ${this._sender.credit}, ` +
        `available: ${this._sender.session.outgoing.available()}.`);
      if (this._sender.sendable()) {
        debug(`[${this._context.connectionId}] Sender "${this.name}", sending message: \n`, message);
        let onRejected: Func<rheaPromise.Context, void>;
        let onReleased: Func<rheaPromise.Context, void>;
        let onModified: Func<rheaPromise.Context, void>;
        let onAccepted: Func<rheaPromise.Context, void>;
        const removeListeners = (): void => {
          this._sender.removeListener("rejected", onRejected);
          this._sender.removeListener("accepted", onAccepted);
          this._sender.removeListener("released", onReleased);
          this._sender.removeListener("modified", onModified);
        };

        onAccepted = (context: rheaPromise.Context) => {
          // Since we will be adding listener for accepted and rejected event every time
          // we send a message, we need to remove listener for both the events.
          // This will ensure duplicate listeners are not added for the same event.
          removeListeners();
          debug(`[${this._context.connectionId}] Sender "${this.name}", got event accepted.`);
          resolve(context.delivery);
        };
        onRejected = (context: rheaPromise.Context) => {
          removeListeners();
          debug(`[${this._context.connectionId}] Sender "${this.name}", got event rejected.`);
          reject(translate(context!.delivery!.remote_state.error));
        };
        onReleased = (context: rheaPromise.Context) => {
          removeListeners();
          debug(`[${this._context.connectionId}] Sender "${this.name}", got event released.`);
          let err: Error;
          if (context!.delivery!.remote_state.error) {
            err = translate(context!.delivery!.remote_state.error);
          } else {
            err = new Error(`[${this._context.connectionId}] Sender "${this.name}", received a release disposition. Hence we are rejecting the promise.`);
          }
          reject(err);
        };
        onModified = (context: rheaPromise.Context) => {
          removeListeners();
          debug(`[${this._context.connectionId}] Sender "${this.name}", got event modified.`);
          let err: Error;
          if (context!.delivery!.remote_state.error) {
            err = translate(context!.delivery!.remote_state.error);
          } else {
            err = new Error(`[${this._context.connectionId}] Sender "${this.name}", received a modified disposition. Hence we are rejecting the promise.`);
          }
          reject(err);
        };
        this._sender.on("accepted", onAccepted);
        this._sender.on("rejected", onRejected);
        this._sender.on("modified", onModified);
        this._sender.on("released", onReleased);
        const delivery = this._sender.send(message, tag, format);
        debug(`[${this._context.connectionId}] Sender "${this.name}", sent message with delivery id: ${delivery.id}`);
      } else {
        const msg = `[${this._context.connectionId}] Sender "${this.name}", cannot send the message right now. Please try later.`;
        debug(msg);
        reject(new Error(msg));
      }
    });
  }

  /**
   * Initializes the sender session on the connection.
   * @returns {Promise<void>}
   */
  private async _init(): Promise<void> {
    try {
      // Acquire the lock and establish an amqp connection if it does not exist.
      if (!this._context.connection) {
        debug(`EH Sender "${this.name}" establishing an AMQP connection.`);
        await defaultLock.acquire(this._context.connectionLock, () => { return rpc.open(this._context); });
      }

      if (!this._session && !this._sender) {
        await this._negotiateClaim();
        let senderError: any;
        this._session = await rheaPromise.createSession(this._context.connection);
        const handleSenderError = (context: rheaPromise.Context) => {
          senderError = translate(context.sender.error);
          debug(`An error occurred while creating the sender "${this.name}" : `, senderError);
        };
        this._session.on(Constants.senderError, handleSenderError);
        const options = this._createSenderOptions();
        debug("Trying to create a sender...");
        this._sender = await rheaPromise.createSender(this._session, options);
        debug("Promise to create the sender resolved. Created sender with name: ", this.name);
        if (senderError) {
          // There are cases where the EH service sends an attach frame, which causes rhea to emit sender_open event
          // thus resolving the promise to create a sender and moments later the service sends back a detach frame
          // indicating that there was some error. Hence we check for senderError, even after the promise has resolved.
          debug("throwing the senderError, ", senderError);
          throw senderError;
        }
        this._session.removeListener(Constants.senderError, handleSenderError);
        debug("[%s] Sender '%s' created with sender options: %O", this._context.connectionId, this.name, options);
        // It is possible for someone to close the sender and then start it again.
        // Thus make sure that the sender is present in the client cache.
        if (!this._context.senders[this.name]) this._context.senders[this.name] = this;
        this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      debug("[%s] An error occurred while creating the sender %s", this._context.connectionId, this.name, err);
      throw err;
    }
  }

  /**
   * Negotiates the cbs claim for the EventHub Sender.
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
      ` the sender.`);
    await defaultLock.acquire(this._context.cbsSession.cbsLock,
      () => { return this._context.cbsSession.init(this._context.connection); });
    const tokenObject = await this._context.tokenProvider.getToken(this.audience);
    debug(`[${this._context.connectionId}] EH Sender: calling negotiateClaim for audience "${this.audience}".`);
    // Negotiate the CBS claim.
    await this._context.cbsSession.negotiateClaim(this.audience, this._context.connection, tokenObject);
    debug(`[${this._context.connectionId}] Negotiated claim for sender "${this.name}" with with partition` +
      ` "${this.partitionId}"`);
    if (setTokenRenewal) {
      await this._ensureTokenRenewal();
    }
  }

  /**
   * Ensures that the token is renewed within the predefined renewal margin.
   * @private
   * @returns {void}
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
        debug("[%s] Sender '%s', an error occurred while renewing the token: %O", this._context.connectionId, this.name, err);
        this.emit(Constants.error, translate(err));
      }
    }, nextRenewalTimeout);
    debug(`[${this._context.connectionId}] Sender "${this.name}", has next token renewal in ` +
      `${nextRenewalTimeout / 1000} seconds @(${new Date(Date.now() + nextRenewalTimeout).toString()}).`);
  }
}
