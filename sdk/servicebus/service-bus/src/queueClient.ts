// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as Long from "long";
import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { ReceivedMessageInfo, ReceiveMode } from "./serviceBusMessage";
import { Client, ClientType } from "./client";
import { SessionReceiverOptions } from "./session/messageSession";
import { Sender } from "./sender";
import { Receiver, SessionReceiver } from "./receiver";
import {
  getOpenReceiverErrorMsg,
  getOpenSenderErrorMsg,
  throwErrorIfClientOrConnectionClosed,
  throwErrorIfConnectionClosed
} from "./util/errors";
import { generate_uuid } from "rhea-promise";
import { ClientEntityContext } from "./clientEntityContext";

/**
 * Describes the client that allows interacting with a Service Bus Queue.
 * Use the `createQueueClient` function on the ServiceBusClient object to instantiate a QueueClient
 * @class QueueClient
 */
export class QueueClient implements Client {
  /**
   * @readonly
   * @property The path for the Service Bus Queue for which this client is created.
   */
  readonly entityPath: string;
  /**
   * @readonly
   * @property A unique identifier for this client.
   */
  readonly id: string;
  /**
   * @property Describes the amqp connection context for the QueueClient.
   */
  private _context: ClientEntityContext;

  private _currentReceiver: Receiver | undefined;
  private _currentSender: Sender | undefined;

  /**
   * Constructor for QueueClient.
   * This is not meant for the user to call directly.
   * The user should use the `createQueueClient` on the ServiceBusClient instead.
   *
   * @constructor
   * @internal
   * @param queueName The Queue name.
   * @param context The connection context to create the QueueClient.
   */
  constructor(queueName: string, context: ConnectionContext) {
    throwErrorIfConnectionClosed(context);
    this.entityPath = String(queueName);
    this.id = `${this.entityPath}/${generate_uuid()}`;
    this._context = ClientEntityContext.create(
      this.entityPath,
      ClientType.QueueClient,
      context,
      this.id
    );
  }

  /**
   * Closes all the AMQP links for sender/receivers created by this client.
   * Once closed, neither the QueueClient nor its sender/receivers can be used for any
   * further operations.
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      // Close the corresponding client context which will take care of closing all AMQP links
      // associated with this client
      await this._context.close();
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the QueueClient for %s: %O",
        this._context.namespace.connectionId,
        this.id,
        err
      );
      throw err;
    }
  }

  /**
   * Creates a Sender to be used for sending messages, scheduling messages to be sent at a later time
   * and cancelling such scheduled messages.
   * - Throws error if an open sender already exists for this QueueClient.
   */
  createSender(): Sender {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );
    if (!this._currentSender || this._currentSender.isClosed) {
      this._currentSender = new Sender(this._context);
      return this._currentSender;
    }
    const errorMessage = getOpenSenderErrorMsg("QueueClient", this.entityPath);
    const error = new Error(errorMessage);
    log.error(`[${this._context.namespace.connectionId}] %O`, error);
    throw error;
  }

  /**
   * Creates a Receiver for receiving messages from a Queue which does not have sessions enabled.
   * - Throws error if an open receiver already exists for this QueueClient.
   * - Throws error if the Queue has sessions enabled.
   *
   * @param receiveMode An enum indicating the mode in which messages should be received. Possible
   * values are:
   * - `ReceiveMode.peekLock`: Once a message is received in this mode, the receiver has a lock on
   * the message for a particular duration. If the message is not settled by this time, it lands back
   * on Service Bus to be fetched by the next receive operation.
   * - `ReceiveMode.receiveAndDelete`: Messages received in this mode get automatically removed from
   * Service Bus.
   *
   * @returns Receiver A receiver to receive messages from a Queue which does not have
   * sessions enabled.
   */
  public createReceiver(receiveMode: ReceiveMode): Receiver;
  /**
   * Creates a Receiver for receiving messages from a session enabled Queue. When no sessionId is
   * given, a random session among the available sessions is used.
   * - Throws error if an open receiver already exists for given sessionId.
   * - Throws error if the Queue does not have sessions enabled.
   *
   * @param receiveMode An enum indicating the mode in which messages should be received. Possible
   * values are:
   * - `ReceiveMode.peekLock`: Once a message is received in this mode, the receiver has a lock on
   * the message for a particular duration. If the message is not settled by this time, it lands back
   * on Service Bus to be fetched by the next receive operation.
   * - `ReceiveMode.receiveAndDelete`: Messages received in this mode get automatically removed from
   * Service Bus.
   * @param sessionOptions Options to provide sessionId and duration of automatic lock renewal for
   * the session receiver.
   *
   * @returns SessionReceiver A receiver to receive from a session in the Queue.
   */
  public createReceiver(
    receiveMode: ReceiveMode,
    sessionOptions: SessionReceiverOptions
  ): SessionReceiver;
  /**
   * Create a Receiver for receiving messages from a Queue.
   *
   * @param receiveMode An enum indicating the mode in which messages should be received. Possible
   * values are `ReceiveMode.peekLock` and `ReceiveMode.receiveAndDelete`
   * @param sessionOptions Applicable only for Queues that have sessions enabled. Use these options
   * to provide sessionId and duration for which automatic lock renewal for should be done for the
   * receiver.
   *
   * @returns Receiver|SessionReceiver A receiver to receive from a session in the Queue if
   * `sessionOptions` were provided. Else, a receiver to receive messages from the Queue.
   */
  public createReceiver(
    receiveMode: ReceiveMode,
    sessionOptions?: SessionReceiverOptions
  ): Receiver | SessionReceiver {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );

    // Receiver for Queue where sessions are not enabled
    if (!sessionOptions) {
      if (!this._currentReceiver || this._currentReceiver.isClosed) {
        this._currentReceiver = new Receiver(this._context, receiveMode);
        return this._currentReceiver;
      }
      const errorMessage = getOpenReceiverErrorMsg(ClientType.QueueClient, this.entityPath);
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }

    return new SessionReceiver(this._context, receiveMode, sessionOptions);
  }

  /**
   * Fetches the next batch of active messages (including deferred but not deadlettered messages).
   * - The first call to `peek()` fetches the first active message. Each subsequent call fetches the
   * subsequent message.
   * - Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param [maxMessageCount] The maximum number of messages to peek. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peek(maxMessageCount?: number): Promise<ReceivedMessageInfo[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );

    let receiverName;
    if (this._context.batchingReceiver) {
      receiverName = this._context.batchingReceiver.name;
    } else if (this._context.streamingReceiver) {
      receiverName = this._context.streamingReceiver.name;
    }
    return this._context.managementClient!.peek(maxMessageCount, receiverName);
  }

  /**
   * Peeks the desired number of active messages (including deferred but not deadlettered messages)
   * from the specified sequence number.
   * - Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param fromSequenceNumber The sequence number from where to read the message.
   * @param [maxMessageCount] The maximum number of messages to peek. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount?: number
  ): Promise<ReceivedMessageInfo[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );

    let receiverName;
    if (this._context.batchingReceiver) {
      receiverName = this._context.batchingReceiver.name;
    } else if (this._context.streamingReceiver) {
      receiverName = this._context.streamingReceiver.name;
    }

    return this._context.managementClient!.peekBySequenceNumber(
      fromSequenceNumber,
      maxMessageCount,
      undefined,
      receiverName
    );
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
  // TODO: Parameter validation if required
  // this.throwErrorIfClientOrConnectionClosed();
  //   return this._context.managementClient!.listMessageSessions(
  //     0,
  //     maxNumberOfSessions,
  //     lastUpdatedTime
  //   );
  // }

  /**
   * Returns the corresponding dead letter queue name for the queue represented by the given name.
   * Use this in the `createQueueClient` function on the `ServiceBusClient` instance to receive
   * messages from a dead letter queue.
   * @param queueName Name of the queue whose dead letter counterpart's name is being fetched
   */
  static getDeadLetterQueuePath(queueName: string): string {
    return `${queueName}/$DeadLetterQueue`;
  }
}
