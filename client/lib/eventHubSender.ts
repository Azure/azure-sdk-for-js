// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import { translate } from "./errors";
import * as rheaPromise from "./rhea-promise";
import { EventData, messageProperties } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { defaultLock, Func } from "./util/utils";
import { retry } from "./retry";
import { ClientEntity } from "./clientEntity";

const debug = debugModule("azure:event-hubs:sender");

/**
 * Instantiates a new sender from the AMQP `Sender`. Used by `EventHubClient`.
 *
 * @param {any} session - The amqp session on which the amqp sender link was created.
 * @param {any} sender - The amqp sender link.
 * @constructor
 */
export class EventHubSender extends ClientEntity {
  readonly senderLock: string = `sender-${uuid()}`;
  /**
   * @property {any} [_sender] The AMQP sender link.
   * @private
   */
  private _sender?: any;

  /**
   * Creates a new EventHubSender instance.
   * @constructor
   * @param {ConnectionContext} context The connection context.
   * @param {string|number} [partitionId] The EventHub partition id to which the sender
   * wants to send the event data.
   */
  constructor(context: ConnectionContext, partitionId?: string | number, name?: string) {
    super(context, { name: name, partitionId: partitionId });
    this.address = this._context.config.entityPath as string;
    if (this.partitionId !== null && this.partitionId !== undefined) {
      this.address += `/Partitions/${this.partitionId}`;
    }
    this.audience = `${this._context.config.endpoint}${this.address}`;
  }

  /**
   * Sends the given message, with the given options on this link
   *
   * @param {any} data Message to send.  Will be sent as UTF8-encoded JSON string.
   * @returns {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
   */
  async send(data: EventData): Promise<rheaPromise.Delivery> {
    try {
      if (!data || (data && typeof data !== "object")) {
        throw new Error("data is required and it must be of type object.");
      }

      if (!this._isOpen()) {
        debug("Acquiring lock %s for initializing the session, sender and " +
          "possibly the connection.", this.senderLock);
        await defaultLock.acquire(this.senderLock, () => { return this._init(); });
      }
      const message = EventData.toAmqpMessage(data);
      message.body = this._context.dataTransformer.encode(data.body);
      return await this._trySend(message);
    } catch (err) {
      debug("An error occurred while sending the message %O", err);
      throw err;
    }
  }

  /**
   * Send a batch of EventData to the EventHub. The "message_annotations",
   * "application_properties" and "properties" of the first message will be set as that
   * of the envelope (batch message).
   * @param {Array<EventData>} datas  An array of EventData objects to be sent in a Batch message.
   * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
   */
  async sendBatch(datas: EventData[]): Promise<rheaPromise.Delivery> {
    try {
      if (!datas || (datas && !Array.isArray(datas))) {
        throw new Error("data is required and it must be an Array.");
      }

      if (!this._isOpen()) {
        debug("Acquiring lock %s for initializing the session, sender and " +
          "possibly the connection.", this.senderLock);
        await defaultLock.acquire(this.senderLock, () => { return this._init(); });
      }
      debug("[%s] Sender '%s', trying to send EventData[]: %O",
        this._context.connectionId, this.name, datas);
      const messages: rhea.Message[] = [];
      // Convert EventData to AmqpMessage.
      for (let i = 0; i < datas.length; i++) {
        const message = EventData.toAmqpMessage(datas[i]);
        message.body = this._context.dataTransformer.encode(datas[i].body);
        messages[i] = message;
      }
      // Encode every amqp message and then convert every encoded message to amqp data section
      const batchMessage: rhea.Message = {
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
      debug("[%s]Sender '%s', sending encoded batch message.",
        this._context.connectionId, this.name, encodedBatchMessage);
      return await this._trySend(encodedBatchMessage, undefined, 0x80013700);
    } catch (err) {
      debug("An error occurred while sending the batch message %O", err);
      throw err;
    }
  }

  /**
   * "Unlink" this sender, closing the link and resolving when that operation is complete.
   * Leaves the underlying connection open.
   * @return {Promise<void>} Promise<void>
   */
  async close(): Promise<void> {
    if (this._sender) {
      try {
        await rheaPromise.closeSender(this._sender);
        delete this._context.senders[this.name!];
        debug("[%s] Deleted the sender '%s' with address '%s' from the client cache.",
          this._context.connectionId, this.name, this.address);
        this._sender = undefined;
        this._session = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        debug("[%s]Sender '%s' closed.", this._context.connectionId, this.name);
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
   * We have implemented a synchronous send over here in the sense that we shall be waiting
   * for the message to be accepted or rejected and accordingly resolve or reject the promise.
   *
   * @param message The message to be sent to EventHub.
   * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
   */
  private _trySend(message: rhea.Message, tag?: any, format?: number): Promise<rheaPromise.Delivery> {
    const sendEventPromise = new Promise<rheaPromise.Delivery>((resolve, reject) => {
      debug("[%s] Sender '%s', credit: %d available: %d", this._context.connectionId, this.name,
        this._sender.credit, this._sender.session.outgoing.available());
      if (this._sender.sendable()) {
        debug("[%s] Sender '%s', sending message: %O", this._context.connectionId, this.name, message);
        let onRejected: Func<rheaPromise.EventContext, void>;
        let onReleased: Func<rheaPromise.EventContext, void>;
        let onModified: Func<rheaPromise.EventContext, void>;
        let onAccepted: Func<rheaPromise.EventContext, void>;
        const removeListeners = (): void => {
          this._sender.removeListener("rejected", onRejected);
          this._sender.removeListener("accepted", onAccepted);
          this._sender.removeListener("released", onReleased);
          this._sender.removeListener("modified", onModified);
        };

        onAccepted = (context: rheaPromise.EventContext) => {
          // Since we will be adding listener for accepted and rejected event every time
          // we send a message, we need to remove listener for both the events.
          // This will ensure duplicate listeners are not added for the same event.
          removeListeners();
          debug("[%s] Sender '%s', got event accepted.", this._context.connectionId, this.name);
          resolve(context.delivery);
        };
        onRejected = (context: rheaPromise.EventContext) => {
          removeListeners();
          debug("[%s] Sender '%s', got event rejected.", this._context.connectionId, this.name);
          reject(translate(context!.delivery!.remote_state!.error));
        };
        onReleased = (context: rheaPromise.EventContext) => {
          removeListeners();
          debug("[%s] Sender '%s', got event released.", this._context.connectionId, this.name);
          let err: Error;
          if (context!.delivery!.remote_state!.error) {
            err = translate(context!.delivery!.remote_state!.error);
          } else {
            err = new Error(`[${this._context.connectionId}]Sender '${this.name}', ` +
              `received a release disposition.Hence we are rejecting the promise.`);
          }
          reject(err);
        };
        onModified = (context: rheaPromise.EventContext) => {
          removeListeners();
          debug("[%s] Sender '%s', got event modified.", this._context.connectionId, this.name);
          let err: Error;
          if (context!.delivery!.remote_state!.error) {
            err = translate(context!.delivery!.remote_state!.error);
          } else {
            err = new Error(`[${this._context.connectionId}]Sender "${this.name}", ` +
              `received a modified disposition.Hence we are rejecting the promise.`);
          }
          reject(err);
        };
        this._sender.on("accepted", onAccepted);
        this._sender.on("rejected", onRejected);
        this._sender.on("modified", onModified);
        this._sender.on("released", onReleased);
        const delivery = this._sender.send(message, tag, format);
        debug("[%s] Sender '%s', sent message with delivery id: %d",
          this._context.connectionId, this.name, delivery.id);
      } else {
        const msg = `[${this._context.connectionId}]Sender "${this.name}", ` +
          `cannot send the message right now.Please try later.`;
        debug(msg);
        reject(new Error(msg));
      }
    });

    return retry<rheaPromise.Delivery>(() => sendEventPromise);
  }

  /**
   * Determines whether the AMQP sender link is open. If open then returns true else returns false.
   * @private
   *
   * @return {boolean} boolean
   */
  private _isOpen(): boolean {
    let result: boolean = false;
    if (this._session && this._sender) {
      if (this._sender.is_open && this._sender.is_open()) {
        result = true;
      }
    }
    return result;
  }

  /**
   * Initializes the sender session on the connection.
   * @returns {Promise<void>}
   */
  private async _init(): Promise<void> {
    try {
      if (!this._isOpen()) {
        await this._negotiateClaim();
        const onAmqpError = (context: rheaPromise.EventContext) => {
          const senderError = translate(context.sender!.error!);
          // TODO: Should we retry before calling user's error method?
          debug("[%s] An error occurred for sender '%s': %O.",
            this._context.connectionId, this.name, senderError);
        };
        this._session = await rheaPromise.createSession(this._context.connection);
        debug("[%s] Trying to create sender '%s'...", this._context.connectionId, this.name);
        const options = this._createSenderOptions();
        this._sender = await rheaPromise.createSenderWithHandlers(this._session, onAmqpError, options);
        debug("[%s] Promise to create the sender resolved. Created sender with name: %s",
          this._context.connectionId, this.name);
        debug("[%s] Sender '%s' created with sender options: %O",
          this._context.connectionId, this.name, options);
        // It is possible for someone to close the sender and then start it again.
        // Thus make sure that the sender is present in the client cache.
        if (!this._context.senders[this.address]) this._context.senders[this.address] = this;
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      debug("[%s] An error occurred while creating the sender %s",
        this._context.connectionId, this.name, err);
      throw err;
    }
  }

  /**
   * Creates a new sender to the given event hub, and optionally to a given partition if it is
   * not present in the context or returns the one present in the context.
   * @static
   * @param {(string|number)} [partitionId] Partition ID to which it will send event data.
   * @returns {Promise<EventHubSender>}
   */
  static create(context: ConnectionContext, partitionId?: string | number): EventHubSender {
    if (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' must be of type: 'string' | 'number'.");
    }

    const ehSender: EventHubSender = new EventHubSender(context, partitionId);
    if (!context.senders[ehSender.address]) {
      context.senders[ehSender.address] = ehSender;
    }
    return context.senders[ehSender.address];
  }
}
