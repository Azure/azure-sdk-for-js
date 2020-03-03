import Long from "long";
import { Sender } from "./sender";
import { ClientEntityContext } from "./clientEntityContext";
import {
  ServiceBusClientOptions,
  createConnectionContextForTokenCredential,
  createConnectionContextForConnectionString
} from "./old/serviceBusClient";
import { TokenCredential, SendableMessageInfo } from ".";
import { isTokenCredential } from "@azure/core-amqp";
import { ClientType } from "./client";
import { generate_uuid } from "rhea-promise";
import { ConnectionContext } from "./connectionContext";
import { getEntityNameFromConnectionString } from './track2/constructorHelpers';

/**
 * Client for sending messages to a topic or queue.
 */
export class ServiceBusSenderClient {
  private _entityPath: string;
  private _currentSender: Sender;
  private _context: ConnectionContext;

  /**
   * Creates a ServiceBusClient for the Service Bus Namespace represented in the given connection
   * string.
   * @param entityConnectionString - Connection string of the form
   * 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=new-queue'
   * @param options Options to control ways to interact with the
   * Service Bus Namespace.
   * @returns ServiceBusClient
   */
  constructor(entityConnectionString: string, options?: ServiceBusClientOptions);

  /**
   * Creates a ServiceBusClient for the Service Bus Namespace represented in the given connection
   * string.
   * @param serviceBusConnectionString - Connection string of the form
   * 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param options Options to control ways to interact with the
   * Service Bus Namespace.
   * @returns ServiceBusClient
   */
  constructor(
    serviceBusConnectionString: string,
    entityName: string,
    options?: ServiceBusClientOptions
  );

  /**
   * Instantiates a ServiceBusClient to interact with a Service Bus Namespace.
   *
   * @constructor
   * @param host - The host name for the Service Bus namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param credential - credential that implements the TokenCredential interface.
   * @param options - Options to control ways to interact with the Service Bus
   * Namespace.
   */
  constructor(
    host: string,
    entityName: string,
    credential: TokenCredential,
    options?: ServiceBusClientOptions
  );

  constructor(
    hostOrConnectionString: string,
    entityNameOrOptions?: string | ServiceBusClientOptions,
    credentialOrServiceBusClientOptions?: TokenCredential | ServiceBusClientOptions,
    options?: ServiceBusClientOptions
  ) {
    if (typeof entityNameOrOptions !== "string") {
      // (entityConnectionString: string, options?: ServiceBusClientOptions)
      const entityConnectionString = hostOrConnectionString;
      const options = entityNameOrOptions;

      this._entityPath = getEntityNameFromConnectionString(entityConnectionString);
      this._context = createConnectionContextForConnectionString(entityConnectionString, options);
    } else if (!isTokenCredential(credentialOrServiceBusClientOptions)) {
      // (serviceBusConnectionString: string, entityName: string, options?: ServiceBusClientOptions)
      this._entityPath = String(entityNameOrOptions);
      this._context = createConnectionContextForConnectionString(hostOrConnectionString, options);
    } else {
      // (host: string, entityName: string, credential: TokenCredential, options?: ServiceBusClientOptions)
      const entityName = entityNameOrOptions;
      this._entityPath = String(entityName);
      this._context = createConnectionContextForTokenCredential(
        credentialOrServiceBusClientOptions,
        hostOrConnectionString,
        options
      );
    }
    const clientEntityContext = ClientEntityContext.create(
      this._entityPath,
      ClientType.ServiceBusSenderClient,
      this._context,
      `${this._entityPath}/${generate_uuid()}`
    );
    this._currentSender = new Sender(clientEntityContext);
  }

  /**
   * Sends the given message after creating an AMQP Sender link if it doesnt already exists.
   *
   * To send a message to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the message.
   *
   * @param message - Message to send.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while sending messages to the service.
   */
  async send(message: SendableMessageInfo): Promise<void> {
    return this._currentSender.send(message);
  }

  /**
   * Sends the given messages in a single batch i.e. in a single AMQP message after creating an AMQP
   * Sender link if it doesnt already exists.
   *
   * - To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the messages.
   * - When doing so, all
   * messages in the batch should have the same `sessionId` (if using sessions) and the same
   * `parititionKey` (if using paritions).
   *
   * @param messages - An array of SendableMessageInfo objects to be sent in a Batch message.
   * @return Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while sending messages to the service.
   */
  async sendBatch(messages: SendableMessageInfo[]): Promise<void> {
    return this._currentSender.sendBatch(messages);
  }

  /**
   * Schedules given message to appear on Service Bus Queue/Subscription at a later time.
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the message should be enqueued.
   * @param message - The message that needs to be scheduled.
   * @returns Promise<Long> - The sequence number of the message that was scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the message.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while scheduling a message.
   */
  async scheduleMessage(
    scheduledEnqueueTimeUtc: Date,
    message: SendableMessageInfo
  ): Promise<Long> {
    return this._currentSender.scheduleMessage(scheduledEnqueueTimeUtc, message);
  }

  /**
   * Schedules given messages to appear on Service Bus Queue/Subscription at a later time.
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the messages should be enqueued.
   * @param messages - Array of Messages that need to be scheduled.
   * @returns Promise<Long[]> - The sequence numbers of messages that were scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the messages.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while scheduling messages.
   */
  async scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: SendableMessageInfo[]
  ): Promise<Long[]> {
    return this._currentSender.scheduleMessages(scheduledEnqueueTimeUtc, messages);
  }

  /**
   * Cancels a message that was scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumber - The sequence number of the message to be cancelled.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while canceling a scheduled message.
   */
  async cancelScheduledMessage(sequenceNumber: Long): Promise<void> {
    return this._currentSender.cancelScheduledMessage(sequenceNumber);
  }

  /**
   * Cancels multiple messages that were scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumbers - An Array of sequence numbers of the messages to be cancelled.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while canceling scheduled messages.
   */
  async cancelScheduledMessages(sequenceNumbers: Long[]): Promise<void> {
    return this._currentSender.cancelScheduledMessages(sequenceNumbers);
  }

  /**
   * Closes this sender.
   */
  async close(): Promise<void> {
    await this._currentSender.close();
    await ConnectionContext.close(this._context);
  }
}
