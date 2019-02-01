// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as Long from "long";
import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { ReceivedMessageInfo } from "./serviceBusMessage";
import { Client } from "./client";
import { MessageSession, SessionReceiverOptions } from "./session/messageSession";
import { Sender } from "./sender";
import { Receiver, MessageReceiverOptions, SessionReceiver } from "./receiver";

export class QueueClient extends Client {
  /**
   * Instantiates a client that will maintain an AMQP connection to a ServiceBus Queue.
   * This is not meant for the user to call directly.
   * The user should use the `createQueueClient` on the Namespace instead.
   *
   * @constructor
   * @param name The Queue name.
   * @param context The connection context to create the QueueClient.
   */
  constructor(name: string, context: ConnectionContext) {
    super(name, context);
  }

  /**
   * Closes the AMQP connection to the ServiceBus Queue for this client.
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        // Close the sender.
        if (this._context.sender) {
          await this._context.sender.close();
        }

        // Close the sessionManager.
        if (this._context.sessionManager) {
          this._context.sessionManager.close();
        }

        // Close the streaming receiver.
        if (this._context.streamingReceiver) {
          await this._context.streamingReceiver.close();
        }

        // Close the batching receiver.
        if (this._context.batchingReceiver) {
          await this._context.batchingReceiver.close();
        }

        // Close all the MessageSessions.
        for (const messageSessionId of Object.keys(this._context.messageSessions)) {
          await this._context.messageSessions[messageSessionId].close();
        }

        // Make sure that we clear the map of deferred messages
        this._context.requestResponseLockedMessages.clear();

        log.qClient("Closed the Queue client '%s'.", this.id);
      }
    } catch (err) {
      const msg =
        `An error occurred while closing the queue client ` +
        `"${this.id}": ${JSON.stringify(err)} `;
      log.error(msg);
      throw new Error(msg);
    }
  }

  /**
   * Creates a Sender by establishing an AMQP session and an AMQP sender link on the session.
   * This Sender can be used to send messages, schedule messages to be sent at a later time
   * and cancel such scheduled messages.
   */
  getSender(): Sender {
    return new Sender(this._context);
  }

  /**
   * Creates a Receiver by establishing an AMQP session and an AMQP receiver link on the session.
   * This Receiver can be used to receive messages in batches or by registering handlers.
   *
   * You can have multiple receivers for the same Queue.
   *
   * @param options Options for creating the receiver.
   */
  getReceiver(options?: MessageReceiverOptions): Receiver {
    return new Receiver(this._context, options);
  }

  /**
   * Fetches the next batch of active messages (including deferred but not deadlettereed messages).
   * The first call to `peek()` fetches the first active message. Each subsequent call fetches the
   * subsequent message.
   *
   * Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param [messageCount] The number of messages to retrieve. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peek(messageCount?: number): Promise<ReceivedMessageInfo[]> {
    return this._context.managementClient!.peek(messageCount);
  }

  /**
   * Peeks the desired number of active messages (including deferred but not deadlettereed messages)
   * from the specified sequence number.
   *
   * Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param fromSequenceNumber The sequence number from where to read the message.
   * @param [messageCount] The number of messages to retrieve. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peekBySequenceNumber(
    fromSequenceNumber: Long,
    messageCount?: number
  ): Promise<ReceivedMessageInfo[]> {
    return this._context.managementClient!.peekBySequenceNumber(fromSequenceNumber, {
      messageCount: messageCount
    });
  }

  /**
   * Lists the ids of the sessions on the ServiceBus Queue.
   * @param maxNumberOfSessions Maximum number of sessions.
   * @param lastUpdateTime Filter to include only sessions updated after a given time. Default
   * value is 3 days before the current time.
   */
  async listMessageSessions(
    maxNumberOfSessions: number,
    lastUpdatedTime?: Date
  ): Promise<string[]> {
    return this._context.managementClient!.listMessageSessions(
      0,
      maxNumberOfSessions,
      lastUpdatedTime
    );
  }

  /**
   * Creates a messageSession with given sessionId from the ServiceBus Queue.
   * When no sessionId is given, a random session among the available sessions is used.
   * This Receiver can be used to receive messages in batches or by registering handlers.
   *
   * Note that you cannot have more than 1 session receiver for the same session.
   *
   * @param options Options to provide sessionId and ReceiveMode for receiving messages from the
   * session enabled Servicebus Queue.
   *
   * @returns SessionReceiver An instance of a SessionReceiver to receive messages from the session.
   */
  async getSessionReceiver(options?: SessionReceiverOptions): Promise<SessionReceiver> {
    if (!options) options = {};
    this._context.isSessionEnabled = true;
    const messageSession = await MessageSession.create(this._context, options);
    return new SessionReceiver(this._context, messageSession);
  }
}
