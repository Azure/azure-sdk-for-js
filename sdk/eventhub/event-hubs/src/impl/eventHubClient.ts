// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ConnectionConfig,
  EventHubConnectionConfig,
  EventHubConnectionStringModel,
  RetryOptions,
  SharedKeyCredential,
  TokenCredential,
  isTokenCredential,
  parseConnectionString
} from "@azure/core-amqp";

import { ConnectionContext } from "../connectionContext";
import { EventPosition } from "../eventPosition";
import { EventHubConsumer } from "../receiver";
import { throwErrorIfConnectionClosed } from "../util/error";
import { EventHubClientOptions } from "../models/public";

/**
 * The set of options to configure the behavior of an `EventHubConsumer`.
 * These can be specified when creating the consumer using the `createConsumer` method.
 * - `ownerLevel`  : A number indicating that the consumer intends to be an exclusive consumer of events resulting in other
 * consumers to fail if their `ownerLevel` is lower or doesn't exist.
 * - `retryOptions`: The retry options used to govern retry attempts when an issue is encountered while receiving events.
 * A simple usage can be `{ "maxRetries": 4 }`.
 *
 * Example usage:
 * ```js
 * {
 *     retryOptions: {
 *         maxRetries: 4
 *     },
 *     trackLastEnqueuedEventProperties: false
 * }
 * ```
 * @internal
 * @ignore
 */
export interface EventHubConsumerOptions {
  /**
   * @property
   * The owner level associated with an exclusive consumer.
   *
   * When provided, the owner level indicates that a consumer is intended to be the exclusive receiver of events for the
   * requested partition and the associated consumer group.
   * When multiple consumers exist for the same partition/consumer group pair, then the ones with lower or no
   * `ownerLevel` will get a `ReceiverDisconnectedError` during the next attempted receive operation.
   */
  ownerLevel?: number;
  /**
   * @property
   * The retry options used to govern retry attempts when an issue is encountered while receiving events.
   * If no value is provided here, the retry options set when creating the `EventHubClient` is used.
   */
  retryOptions?: RetryOptions;
  /**
   * @property
   * Indicates whether or not the consumer should request information on the last enqueued event on its
   * associated partition, and track that information as events are received.

   * When information about the partition's last enqueued event is being tracked, each event received 
   * from the Event Hubs service will carry metadata about the partition that it otherwise would not. This results in a small amount of
   * additional network bandwidth consumption that is generally a favorable trade-off when considered
   * against periodically making requests for partition properties using the Event Hub client.
   */
  trackLastEnqueuedEventProperties?: boolean;
}

/**
 * @class
 * The client is the main point of interaction with Azure Event Hubs service.
 * It offers connection to a specific Event Hub within the Event Hubs namespace along with
 * operations for sending event data, receiving events, and inspecting the connected Event Hub.
 *
 * There are multiple ways to create an `EventHubClient`
 * - Use the connection string from the SAS policy created for your Event Hub instance.
 * - Use the connection string from the SAS policy created for your Event Hub namespace,
 * and the name of the Event Hub instance
 * - Use the fully qualified domain name of your Event Hub namespace like `<yournamespace>.servicebus.windows.net`,
 * and a credentials object.
 *
 * @internal
 * @ignore
 */
export class EventHubClient {
  /**
   * Describes the amqp connection context for the eventhub client.
   */
  private _context: ConnectionContext;

  /**
   * The options passed by the user when creating the EventHubClient instance.
   */
  private _clientOptions: EventHubClientOptions;

  constructor(connectionString: string, options?: EventHubClientOptions);
  constructor(connectionString: string, eventHubName: string, options?: EventHubClientOptions);
  constructor(
    host: string,
    eventHubName: string,
    credential: TokenCredential,
    options?: EventHubClientOptions
  );
  constructor(
    hostOrConnectionString: string,
    eventHubNameOrOptions?: string | EventHubClientOptions,
    credentialOrOptions?: TokenCredential | EventHubClientOptions,
    options?: EventHubClientOptions
  ) {
    this._context = createConnectionContext(
      hostOrConnectionString,
      eventHubNameOrOptions,
      credentialOrOptions,
      options
    );
    if (typeof eventHubNameOrOptions !== "string") {
      this._clientOptions = eventHubNameOrOptions || {};
    } else if (!isTokenCredential(credentialOrOptions)) {
      this._clientOptions = credentialOrOptions || {};
    } else {
      this._clientOptions = options || {};
    }
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws Error if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    return this._context.close();
  }

  /**
   * Creates an Event Hub consumer that can receive events from a specific Event Hub partition,
   * in the context of a specific consumer group.
   *
   * Multiple consumers are allowed on the same partition in a consumer group.
   * If there is a need to have an exclusive consumer for a partition in a consumer group,
   * then specify the `ownerLevel` in the `options`.
   * Exclusive consumers were previously referred to as "Epoch Receivers".
   *
   * @param consumerGroup The name of the consumer group this consumer is associated with.
   * Events are read in the context of this group. You can get this information from Azure portal.
   * @param partitionId The identifier of the Event Hub partition from which events will be received.
   * You can get identifiers for all partitions by using the `getPartitionProperties` method on the `EventHubClient`.
   * @param eventPosition The position within the partition where the consumer should begin reading events.
   * @param options The set of options to apply when creating the consumer.
   * - `ownerLevel`  : A number indicating that the consumer intends to be an exclusive consumer of events resulting in other
   * consumers to fail if their `ownerLevel` is lower or doesn't exist.
   * - `retryOptions`: The retry options used to govern retry attempts when an issue is encountered while receiving events.
   * A simple usage can be `{ "maxRetries": 4 }`.
   *
   * @throws Error if the underlying connection has been closed, create a new EventHubClient.
   * @throws TypeError if a required parameter is missing.
   */
  createConsumer(
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ): EventHubConsumer {
    if (!options) {
      options = {};
    }
    if (!options.retryOptions) {
      options.retryOptions = this._clientOptions.retryOptions;
    }
    throwErrorIfConnectionClosed(this._context);
    partitionId = String(partitionId);
    return new EventHubConsumer(this._context, consumerGroup, partitionId, eventPosition, options);
  }
}

export function createConnectionContext(
  hostOrConnectionString: string,
  eventHubNameOrOptions?: string | EventHubClientOptions,
  credentialOrOptions?: TokenCredential | EventHubClientOptions,
  options?: EventHubClientOptions
): ConnectionContext {
  let connectionString;
  let config;
  let credential: TokenCredential | SharedKeyCredential;
  hostOrConnectionString = String(hostOrConnectionString);

  if (!isTokenCredential(credentialOrOptions)) {
    const parsedCS = parseConnectionString<EventHubConnectionStringModel>(hostOrConnectionString);
    if (
      !(parsedCS.EntityPath || (typeof eventHubNameOrOptions === "string" && eventHubNameOrOptions))
    ) {
      throw new TypeError(
        `Either provide "eventHubName" or the "connectionString": "${hostOrConnectionString}", ` +
          `must contain "EntityPath=<your-event-hub-name>".`
      );
    }
    if (
      parsedCS.EntityPath &&
      typeof eventHubNameOrOptions === "string" &&
      eventHubNameOrOptions &&
      parsedCS.EntityPath !== eventHubNameOrOptions
    ) {
      throw new TypeError(
        `The entity path "${parsedCS.EntityPath}" in connectionString: "${hostOrConnectionString}" ` +
          `doesn't match with eventHubName: "${eventHubNameOrOptions}".`
      );
    }
    connectionString = hostOrConnectionString;
    if (typeof eventHubNameOrOptions !== "string") {
      // connectionstring and/or options were passed to constructor
      config = EventHubConnectionConfig.create(connectionString);
      options = eventHubNameOrOptions;
    } else {
      // connectionstring, eventHubName and/or options were passed to constructor
      const eventHubName = eventHubNameOrOptions;
      config = EventHubConnectionConfig.create(connectionString, eventHubName);
      options = credentialOrOptions;
    }
    // Since connectionstring was passed, create a SharedKeyCredential
    credential = new SharedKeyCredential(config.sharedAccessKeyName, config.sharedAccessKey);
  } else {
    // host, eventHubName, a TokenCredential and/or options were passed to constructor
    const eventHubName = eventHubNameOrOptions;
    let host = hostOrConnectionString;
    credential = credentialOrOptions;
    if (!eventHubName) {
      throw new TypeError(`"eventHubName" is missing`);
    }

    if (!host.endsWith("/")) host += "/";
    connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;EntityPath=${eventHubName}`;
    config = EventHubConnectionConfig.create(connectionString);
  }

  ConnectionConfig.validate(config);

  return ConnectionContext.create(config, credential, options);
}
