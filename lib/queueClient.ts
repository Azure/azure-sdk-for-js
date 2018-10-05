// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "./log";
import { Delivery } from "rhea-promise";
import { ConnectionContext } from "./connectionContext";
import { MessageSender } from "./messageSender";
import { ReceiveOptions, OnError, OnMessage } from ".";
import { StreamingReceiver, ReceiveHandler, MessageHandlerOptions } from "./streamingReceiver";
import { BatchingReceiver } from "./batchingReceiver";
import { Message, ServiceBusMessage } from "./message";
import { Client } from "./client";
import { ReceiveMode } from "./messageReceiver";

/**
 * Describes the options that can be provided while creating the QueueClient.
 * @interface QueueClientOptions
 */
export interface QueueClientOptions {
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode?: ReceiveMode;
}

export class QueueClient extends Client {
  /**
   * @property {number} receiveMode The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode: ReceiveMode;

  /**
   * Instantiates a client pointing to the ServiceBus Queue given by this configuration.
   *
   * @constructor
   * @param {string} name The Queue name.
   * @param {ConnectionContext} context The connection context to create the QueueClient.
   * @param {QueueClientOptions} [options] The QueueClient options.
   */
  constructor(name: string, context: ConnectionContext, options?: QueueClientOptions) {
    super(name, context);
    if (!options) options = {};
    this.receiveMode = options.receiveMode || ReceiveMode.peekLock;
  }

  /**
   * Closes the AMQP connection to the ServiceBus Queue for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns {Promise<any>}
   */
  async close(): Promise<any> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        // Close the sender.
        if (this._context.sender) {
          await this._context.sender.close();
        }
        // Close the receiver.
        if (this._context.streamingReceiver) {
          await this._context.streamingReceiver.close();
        }
        log.qClient("Closed the client '%s'.", this.id);
      }
    } catch (err) {
      const msg = `An error occurred while closing the queue client ` +
        `"${this.id}": ${JSON.stringify(err)} `;
      log.error(msg);
      throw new Error(msg);
    }
  }

  /**
   * Sends the given message to the ServiceBus Queue.
   *
   * @param {any} data  Message to send.  Will be sent as UTF8-encoded JSON string.
   * @returns {Promise<Delivery>} Promise<Delivery>
   */
  async send(data: ServiceBusMessage): Promise<Delivery> {
    const sender = MessageSender.create(this._context);
    return await sender.send(data);
  }

  /**
   * Send a batch of Message to the ServiceBus Queue. The "message_annotations", "application_properties"
   * and "properties" of the first message will be set as that of the envelope (batch message).
   *
   * @param {Array<Message>} datas  An array of Message objects to be sent in a Batch
   * message.
   *
   * @return {Promise<Delivery>} Promise<Delivery>
   */
  async sendBatch(datas: ServiceBusMessage[]): Promise<Delivery> {
    const sender = MessageSender.create(this._context);
    return await sender.sendBatch(datas);
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   * Messages will be passed to the provided onMessage handler and error will be passed to the
   * provided onError handler.
   *
   * @param {OnMessage} onMessage          The message handler to receive Message objects.
   * @param {OnError} onError              The error handler to receive an error that occurs
   * while receiving messages.
   *
   * @returns {ReceiveHandler} ReceiveHandler - An object that provides a mechanism to stop
   * receiving more messages.
   */
  receive(onMessage: OnMessage, onError: OnError, options?: MessageHandlerOptions): ReceiveHandler {
    if (!this._context.streamingReceiver || !this._context.streamingReceiver.isOpen()) {
      if (!options) options = {};
      const rcvOptions: ReceiveOptions = {
        maxConcurrentCalls: options.maxConcurrentCalls || 1,
        receiveMode: this.receiveMode,
        autoComplete: options.autoComplete
      };
      const sReceiver = StreamingReceiver.create(this._context, rcvOptions);
      this._context.streamingReceiver = sReceiver;
      return sReceiver.receive(onMessage, onError);
    } else {
      const rcvr = this._context.streamingReceiver;
      const msg = `A "${rcvr.receiverType}" receiver with id "${rcvr.name}" has already been ` +
        `created for the Queue "${this.name}". Another receive() call cannot be made while the ` +
        `previous one is active. Please stop the previous receive() by calling ` +
        `"receiveHandler.stop()".`;
      throw new Error(msg);
    }
  }

  /**
   * Receives a batch of Message objects from a ServiceBus Queue for a given count and a
   * given max wait time in seconds, whichever happens first.
   * @param {number} maxMessageCount        The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds] The maximum wait time in seconds for which the Receiver
   * should wait to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   *
   * @returns {Promise<Message[]>} A promise that resolves with an array of Message objects.
   */
  async receiveBatch(maxMessageCount: number, maxWaitTimeInSeconds?: number): Promise<Message[]> {
    if (!this._context.batchingReceiver ||
      (this._context.batchingReceiver && !this._context.batchingReceiver.isOpen()) ||
      (this._context.batchingReceiver && !this._context.batchingReceiver.isReceivingMessages)) {
      const options: ReceiveOptions = {
        maxConcurrentCalls: 0,
        receiveMode: this.receiveMode
      };
      const bReceiver: BatchingReceiver = BatchingReceiver.create(this._context, options);
      this._context.batchingReceiver = bReceiver;
      try {
        return await bReceiver.receive(maxMessageCount, maxWaitTimeInSeconds);
      } catch (err) {
        log.error("[%s] Receiver '%s', an error occurred while receiving %d messages for %d " +
          "max time:\n %O", this._context.namespace.connectionId, bReceiver.name, maxMessageCount,
          maxWaitTimeInSeconds, err);
        throw err;
      }
    } else {
      const rcvr = this._context.batchingReceiver;
      const msg = `A "${rcvr.receiverType}" receiver with id "${rcvr.name}" has already been ` +
        `created for the Queue "${this.name}". Another receiveBatch() call cannot be made while the ` +
        `previous one is active. Please wait for the previous receiveBatch() to complete and ` +
        `then call receiveBatch() again.`;
      throw new Error(msg);
    }
  }
}
