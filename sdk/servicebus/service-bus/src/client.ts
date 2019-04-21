// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Interface for Queue/Topic/Subscription clients
 */
export interface Client {
  /**
   * @property {string} The entitypath for the Service Bus entity for which this client is created.
   */
  readonly entityPath: string;
  /**
   * @property {string} A unique identifier for the client.
   */
  readonly id: string;
  /**
   * Closes the client.
   */
  close(): Promise<void>;
}

/**
 * @internal
 */
export enum ClientType {
  QueueClient = "QueueClient",
  TopicClient = "TopicClient",
  SubscriptionClient = "SubscriptionClient"
}
