// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusClientReceiverOptions } from "../receiverClient";
import { NonSessionReceiverClient } from "./receiverClient";
import { TokenCredential } from "@azure/identity";

export type QueueAuths =
  | {
      connectionString: string;
      queueName: string;
    }
  | {
      queueConnectionString: string;
    }
  | {
      tokenCredential: TokenCredential;
      host: string;
    };

export type SubscriptionAuths =
  | {
      connectionString: string;
      topicName: string;
      subscriptionName: string;
    }
  | {
      topicConnectionString: string;
      subscriptionName: string;
    }
  | {
      tokenCredential: TokenCredential;
      host: string;
      topicName: string;
      subscriptionName: string;
    };

export interface SubscriptionRuleManager {
  addRule(): Promise<void>;
  removeRule(): Promise<void>;
}

export interface ReceiverClientWithTypeUnions {
  // queue constructors
  new (
    queueAuthentication: QueueAuths,
    receiveMode?: "PeekLock",
    options?: ServiceBusClientReceiverOptions
  ): NonSessionReceiverClient<"PeekLock">;
  new (
    queueAuthentication: QueueAuths,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  ): NonSessionReceiverClient<"ReceiveAndDelete">;

  // subscription constructors
  new (
    subscriptionAuthentication: SubscriptionAuths,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  ): NonSessionReceiverClient<"ReceiveAndDelete"> & SubscriptionRuleManager;
  new (
    subscriptionAuthentication: SubscriptionAuths,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  ): NonSessionReceiverClient<"ReceiveAndDelete"> & SubscriptionRuleManager;
}
