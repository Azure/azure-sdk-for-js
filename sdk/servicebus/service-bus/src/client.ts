// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Interface for Queue/Topic/Subscription clients
 */
export interface Client {
  /**
   * @readonly
   * @property The path for the Service Bus entity for which this client is created.
   */
  readonly entityPath: string;
  /**
   * @readonly
   * @property A unique identifier for this client.
   */
  readonly id: string;
  /**
   * Closes the client along with all senders and receivers created using the client.
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
