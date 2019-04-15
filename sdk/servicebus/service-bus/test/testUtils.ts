// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  SendableMessageInfo,
  QueueClient,
  TopicClient,
  ServiceBusClient,
  SubscriptionClient,
  delay,
  ReceiveMode
} from "../src";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { SBQueue, SBTopic, SBSubscription } from "@azure/arm-servicebus/esm/models";

export class TestMessage {
  static sessionId: string = "my-session";

  static getSample(): SendableMessageInfo {
    const randomNumber = Math.random();
    return {
      body: `message body ${randomNumber}`,
      messageId: `message id ${randomNumber}`,
      partitionKey: "dummy"
    };
  }

  static getSessionSample(): SendableMessageInfo {
    const randomNumber = Math.random();
    return {
      body: `message body ${randomNumber}`,
      messageId: `message id ${randomNumber}`,
      sessionId: TestMessage.sessionId,
      partitionKey: "dummy"
    };
  }
}

export enum TestClientType {
  PartitionedQueue,
  PartitionedTopic,
  PartitionedSubscription,
  UnpartitionedQueue,
  UnpartitionedTopic,
  UnpartitionedSubscription,
  PartitionedQueueWithSessions,
  PartitionedTopicWithSessions,
  PartitionedSubscriptionWithSessions,
  UnpartitionedQueueWithSessions,
  UnpartitionedTopicWithSessions,
  UnpartitionedSubscriptionWithSessions,
  TopicFilterTestTopic,
  TopicFilterTestDefaultSubscription,
  TopicFilterTestSubscription
}
const defaultLockDuration = "PT30S"; // 30 seconds in ISO 8601 FORMAT - equivalent to "P0Y0M0DT0H0M30S"

export function getEnvVars(): { [key: string]: string } {
  if (!process.env.AAD_CLIENT_ID) {
    throw new Error("Define AAD_CLIENT_ID in your environment before running integration tests.");
  }
  if (!process.env.AAD_CLIENT_SECRET) {
    throw new Error(
      "Define AAD_CLIENT_SECRET in your environment before running integration tests."
    );
  }
  if (!process.env.AAD_TENANT_ID) {
    throw new Error("Define AAD_TENANT_ID in your environment before running integration tests.");
  }
  if (!process.env.AZURE_SUBSCRIPTION_ID) {
    throw new Error(
      "Define AZURE_SUBSCRIPTION_ID in your environment before running integration tests."
    );
  }
  if (!process.env.RESOURCE_GROUP) {
    throw new Error("Define RESOURCE_GROUP in your environment before running integration tests.");
  }
  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  const servicebusNamespace = (process.env.SERVICEBUS_CONNECTION_STRING.match(
    "Endpoint=sb://(.*).servicebus.windows.net"
  ) || "")[1];
  return {
    clientId: process.env.AAD_CLIENT_ID,
    clientSecret: process.env.AAD_CLIENT_SECRET,
    tenantId: process.env.AAD_TENANT_ID,
    subscriptionId: process.env.AZURE_SUBSCRIPTION_ID,
    resourceGroup: process.env.RESOURCE_GROUP,
    servicebusNamespace: servicebusNamespace
  };
}

async function recreateQueue(queueName: string, parameters: SBQueue): Promise<void> {
  const env = getEnvVars();
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(env.clientId, env.clientSecret, env.tenantId)
    .then(async (creds) => {
      const client = await new ServiceBusManagementClient(creds, env.subscriptionId);
      await client.queues.deleteMethod(
        env.resourceGroup,
        env.servicebusNamespace,
        queueName,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
      await client.queues.createOrUpdate(
        env.resourceGroup,
        env.servicebusNamespace,
        queueName,
        parameters,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
    });
}

async function recreateTopic(topicName: string, parameters: SBTopic): Promise<void> {
  const env = getEnvVars();
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(env.clientId, env.clientSecret, env.tenantId)
    .then(async (creds) => {
      const client = await new ServiceBusManagementClient(creds, env.subscriptionId);
      await client.topics.deleteMethod(
        env.resourceGroup,
        env.servicebusNamespace,
        topicName,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
      await client.topics.createOrUpdate(
        env.resourceGroup,
        env.servicebusNamespace,
        topicName,
        parameters,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
    });
}

async function recreateSubscription(
  topicName: string,
  subscriptionName: string,
  parameters: SBSubscription
): Promise<void> {
  const env = getEnvVars();
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(env.clientId, env.clientSecret, env.tenantId)
    .then(async (creds) => {
      const client = await new ServiceBusManagementClient(creds, env.subscriptionId);
      /*
        Unlike Queues/Topics, there is no need to delete the subscription because
        `recreateTopic` is called before `recreateSubscription` which would
        delete the topic and the subscriptions before creating a new topic.
      */
      await client.subscriptions.createOrUpdate(
        env.resourceGroup,
        env.servicebusNamespace,
        topicName,
        subscriptionName,
        parameters,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
    });
}

export async function getTopicClientWithTwoSubscriptionClients (
  namespace: ServiceBusClient
): Promise<{
  topicClient: TopicClient;
  subscriptionClients: SubscriptionClient[];
}> {
  const subscriptionClients: SubscriptionClient[] = [];
  const topicName = process.env.TOPIC_FILTER_NAME || "topic-filter";
  const subscription1Name =
    process.env.TOPIC_FILTER_SUBSCRIPTION_NAME || "topic-filter-subscription";
  const subscription2Name =
    process.env.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME || "topic-filter-default-subscription";
  if (process.env.CLEAN_NAMESPACE) {
    await recreateTopic(topicName, {
      enableBatchedOperations: true
    });
    await recreateSubscription(topicName, subscription1Name, {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true
    });
    await recreateSubscription(topicName, subscription2Name, {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true
    });
  }

  subscriptionClients.push(namespace.createSubscriptionClient(topicName, subscription1Name));
  subscriptionClients.push(namespace.createSubscriptionClient(topicName, subscription2Name));

  return {
    topicClient: namespace.createTopicClient(topicName),
    subscriptionClients
  };
}

export async function getSenderReceiverClients(
  namespace: ServiceBusClient,
  senderClientType: TestClientType,
  receiverClientType: TestClientType
): Promise<{
  senderClient: QueueClient | TopicClient;
  receiverClient: QueueClient | SubscriptionClient;
}> {
  switch (receiverClientType) {
    case TestClientType.PartitionedQueue: {
      const queueName = process.env.QUEUE_NAME || "partitioned-queue";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateQueue(queueName, {
          lockDuration: defaultLockDuration,
          enablePartitioning: true,
          enableBatchedOperations: true
        });
      }
      const queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.PartitionedSubscription: {
      const topicName = process.env.TOPIC_NAME || "partitioned-topic";
      const subscriptionName = process.env.SUBSCRIPTION_NAME || "partitioned-topic-subscription";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateTopic(topicName, {
          enablePartitioning: true,
          enableBatchedOperations: true
        });
        await recreateSubscription(topicName, subscriptionName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        });
      }
      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.UnpartitionedQueue: {
      const queueName = process.env.QUEUE_NAME_NO_PARTITION || "unpartitioned-queue";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateQueue(queueName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        });
      }
      const queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.UnpartitionedSubscription: {
      const topicName = process.env.TOPIC_NAME_NO_PARTITION || "unpartitioned-topic";
      const subscriptionName =
        process.env.SUBSCRIPTION_NAME_NO_PARTITION || "unpartitioned-topic-subscription";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateTopic(topicName, {
          enableBatchedOperations: true
        });
        await recreateSubscription(topicName, subscriptionName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        });
      }
      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.PartitionedQueueWithSessions: {
      const queueName = process.env.QUEUE_NAME_SESSION || "partitioned-queue-sessions";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateQueue(queueName, {
          lockDuration: defaultLockDuration,
          enablePartitioning: true,
          enableBatchedOperations: true,
          requiresSession: true
        });
      }
      const queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.PartitionedSubscriptionWithSessions: {
      const topicName = process.env.TOPIC_NAME_SESSION || "partitioned-topic-sessions";
      const subscriptionName =
        process.env.SUBSCRIPTION_NAME_SESSION || "partitioned-topic-sessions-subscription";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateTopic(topicName, {
          enablePartitioning: true,
          enableBatchedOperations: true
        });
        await recreateSubscription(topicName, subscriptionName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true,
          requiresSession: true
        });
      }
      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.UnpartitionedQueueWithSessions: {
      const queueName =
        process.env.QUEUE_NAME_NO_PARTITION_SESSION || "unpartitioned-queue-sessions";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateQueue(queueName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true,
          requiresSession: true
        });
      }
      const queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.UnpartitionedSubscriptionWithSessions: {
      const topicName =
        process.env.TOPIC_NAME_NO_PARTITION_SESSION || "unpartitioned-topic-sessions";
      const subscriptionName =
        process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION ||
        "unpartitioned-topic-sessions-subscription";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateTopic(topicName, {
          enableBatchedOperations: true
        });
        await recreateSubscription(topicName, subscriptionName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true,
          requiresSession: true
        });
      }
      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.TopicFilterTestDefaultSubscription: {
      const topicName = process.env.TOPIC_FILTER_NAME || "topic-filter";
      const subscriptionName =
        process.env.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME || "topic-filter-default-subscription";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateTopic(topicName, {
          enableBatchedOperations: true
        });
        await recreateSubscription(topicName, subscriptionName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        });
      }
      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.TopicFilterTestSubscription: {
      const topicName = process.env.TOPIC_FILTER_NAME || "topic-filter";
      const subscriptionName =
        process.env.TOPIC_FILTER_SUBSCRIPTION_NAME || "topic-filter-subscription";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateTopic(topicName, {
          enableBatchedOperations: true
        });
        await recreateSubscription(topicName, subscriptionName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        });
      }
      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    default:
      break;
  }

  throw new Error("Cannot create sender/receiver clients for given client types");
}

/**
 * Purges the content in the Queue/Subscription corresponding to the receiverClient
 * @param receiverClient
 * @param sessionId if passed, session receiver will be used instead of normal receiver
 */
export async function purge(
  receiverClient: QueueClient | SubscriptionClient,
  sessionId?: string
): Promise<void> {
  let isEmpty = false;

  while (!isEmpty) {
    const peekedMsgs = await receiverClient.peek(10);
    if (peekedMsgs.length === 0) {
      isEmpty = true;
    } else {
      let receiver;
      if (sessionId) {
        receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
          sessionId
        });
      } else {
        receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
      }
      const msgs = await receiver.receiveMessages(peekedMsgs.length);
      for (let index = 0; index < msgs.length; index++) {
        if (msgs[index]) {
          await msgs[index].complete();
        }
      }
      await receiver.close();
    }
  }
}

/**
 * Maximum wait duration for the expected event to happen = `10000 ms`(default value is 10 seconds)(= maxWaitTimeInMilliseconds)
 * Keep checking whether the predicate is true after every `1000 ms`(default value is 1 second) (= delayBetweenRetriesInMilliseconds)
 */
export async function checkWithTimeout(
  predicate: () => boolean,
  delayBetweenRetriesInMilliseconds: number = 1000,
  maxWaitTimeInMilliseconds: number = 10000
): Promise<boolean> {
  const maxTime = Date.now() + maxWaitTimeInMilliseconds;
  while (Date.now() < maxTime) {
    if (predicate()) return true;
    await delay(delayBetweenRetriesInMilliseconds);
  }
  return false;
}
