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
import { throwErrorIfConnectionClosed } from "./util/utils";
import { AmqpError, generate_uuid } from "rhea-promise";
import { ClientEntityContext } from "./clientEntityContext";

/**
 * Describes the client that allows interacting with a Service Bus Queue.
 * Use the `createQueueClient` function on the Namespace object to instantiate a QueueClient
 * @class QueueClient
 */
export class QueueClient implements Client {
  /**
   * @property {string} The entitypath for the Service Bus Queue for which this client is created.
   */
  readonly entityPath: string;
  /**
   * @property {string} A unique identifier for the client.
   */
  readonly id: string;
  /**
   * @property {boolean} _isClosed Denotes if close() was called on this client.
   */
  private _isClosed: boolean = false;
  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the QueueClient.
   */
  private _context: ClientEntityContext;

  private _currentReceiver: Receiver | undefined;
  private _currentSender: Sender | undefined;

  /**
   * Constructor for QueueClient.
   * This is not meant for the user to call directly.
   * The user should use the `createQueueClient` on the Namespace instead.
   *
   * @constructor
   * @internal
   * @param name The Queue name.
   * @param context The connection context to create the QueueClient.
   */
  constructor(name: string, context: ConnectionContext) {
    throwErrorIfConnectionClosed(context);
    this.entityPath = name;
    this.id = `${this.entityPath}/${generate_uuid()}`;
    this._context = ClientEntityContext.create(this.entityPath, context);
  }

  /**
   * Closes all the AMQP links for sender/receivers created by this client.
   * Once closed, neither the QueueClient nor its sender/recievers can be used for any
   * further operations. Use the `createQueueClient` function on the Namespace object to
   * instantiate a new QueueClient
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        log.qClient("Closing the Queue client '%s'.", this.id);

        // Close the sender.
        if (this._currentSender) {
          await this._currentSender.close();
        }

        // Close the sessionManager.
        if (this._context.sessionManager) {
          this._context.sessionManager.close();
        }

        // Close the streaming and batching receivers.
        if (this._currentReceiver) {
          await this._currentReceiver.close();
        }

        // Close all the MessageSessions.
        for (const messageSessionId of Object.keys(this._context.messageSessions)) {
          await this._context.messageSessions[messageSessionId].close();
        }

        // Make sure that we clear the map of deferred messages
        this._context.requestResponseLockedMessages.clear();

        // Delete the reference in ConnectionContext
        await this._context.clearClientReference(this.id);

        // Mark this client as closed, so that we can show appropriate errors for subsequent usage
        this._isClosed = true;

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
   * Will reconnect the queueClient and all its sender/receiver links.
   * This is meant for the library to use to resume sending/receiving when retryable errors are seen.
   * This is not meant for the consumer of this library to use.
   * @ignore
   * @param error Error if any due to which we are attempting to reconnect
   */
  async detached(error?: AmqpError | Error): Promise<void> {
    try {
      await this._context.detached(error);
    } catch (err) {
      log.error(
        "[%s] [%s] An error occurred while reconnecting the client: %O.",
        this._context.namespace.connectionId,
        this.id,
        err
      );
    }
  }

  /**
   * Gets a Sender to be used for sending messages, scheduling messages to be sent at a later time
   * and cancelling such scheduled messages.
   */
  getSender(): Sender {
    this._throwErrorIfClientOrConnectionClosed();
    if (!this._currentSender || this._currentSender.isClosed) {
      this._currentSender = new Sender(this._context);
    }
    return this._currentSender;
  }

  /**
   * Gets a Receiver to be used for receiving messages in batches or by registering handlers.
   *
   * @param options Options for creating the receiver.
   */
  getReceiver(options?: MessageReceiverOptions): Receiver {
    this._throwErrorIfClientOrConnectionClosed();
    if (!this._currentReceiver || this._currentReceiver.isClosed) {
      this._currentReceiver = new Receiver(this._context, options);
    }
    return this._currentReceiver;
  }

  /**
   * Fetches the next batch of active messages (including deferred but not deadlettered messages).
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
    this._throwErrorIfClientOrConnectionClosed();
    return this._context.managementClient!.peek(messageCount);
  }

  /**
   * Peeks the desired number of active messages (including deferred but not deadlettered messages)
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
    this._throwErrorIfClientOrConnectionClosed();
    return this._context.managementClient!.peekBySequenceNumber(fromSequenceNumber, {
      messageCount: messageCount
    });
  }

  // /**
  //  * Lists the ids of the sessions on the ServiceBus Queue.
  //  * @param maxNumberOfSessions Maximum number of sessions.
  //  * @param lastUpdateTime Filter to include only sessions updated after a given time. Default
  //  * value is 3 days before the current time.
  //  */
  // async listMessageSessions(
  //   maxNumberOfSessions: number,
  //   lastUpdatedTime?: Date
  // ): Promise<string[]> {
  // this.throwErrorIfClientOrConnectionClosed();
  //   return this._context.managementClient!.listMessageSessions(
  //     0,
  //     maxNumberOfSessions,
  //     lastUpdatedTime
  //   );
  // }

  /**
   * Gets a SessionReceiver for receiving messages in batches or by registering handlers from a
   * session enabled Queue. When no sessionId is given, a random session among the available
   * sessions is used.
   *
   * @param options Options to provide sessionId and ReceiveMode for receiving messages from the
   * session enabled Servicebus Queue.
   *
   * @returns SessionReceiver An instance of a SessionReceiver to receive messages from the session.
   */
  async getSessionReceiver(options?: SessionReceiverOptions): Promise<SessionReceiver> {
    this._throwErrorIfClientOrConnectionClosed();
    if (!options) options = {};
    if (options.sessionId) {
      if (
        this._context.messageSessions[options.sessionId] &&
        this._context.messageSessions[options.sessionId].isOpen()
      ) {
        throw new Error(
          `Close the current session receiver for sessionId ${
            options.sessionId
          } before using "getSessionReceiver" to create a new one for the same sessionId`
        );
      }
    }
    this._context.isSessionEnabled = true;
    const messageSession = await MessageSession.create(this._context, options);
    if (messageSession.sessionId) {
      delete this._context.expiredMessageSessions[messageSession.sessionId];
    }
    return new SessionReceiver(this._context, messageSession);
  }

  /**
   * Throws error if this queueClient has been closed
   * @param client
   */
  private _throwErrorIfClientOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this._isClosed) {
      throw new Error("The queueClient has been closed and can no longer be used.");
    }
  }
}
