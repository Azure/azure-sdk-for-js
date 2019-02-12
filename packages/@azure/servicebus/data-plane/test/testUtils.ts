// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  SendableMessageInfo,
  QueueClient,
  TopicClient,
  Namespace,
  SubscriptionClient
} from "../lib";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { SBQueue, SBTopic, SBSubscription } from "@azure/arm-servicebus/esm/models";

export const testSimpleMessages: SendableMessageInfo = {
  body: "hello1",
  messageId: `test message ${Math.random()}`,
  partitionKey: "dummy" // partitionKey is only for partitioned queue/subscrption, Unpartitioned queue/subscrption do not care about partitionKey.
};

export const testSessionId1 = "my-session";
export const testMessagesWithSessions: SendableMessageInfo = {
  body: "hello1",
  messageId: `test message ${Math.random()}`,
  sessionId: testSessionId1
};

export enum ClientType {
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

function getEnvVars(): { [key: string]: string } {
  if (!process.env.ARM_SERVICEBUS_CLIENT_ID) {
    throw new Error(
      "Define ARM_SERVICEBUS_CLIENT_ID in your environment before running integration tests."
    );
  }
  if (!process.env.ARM_SERVICEBUS_TENANT_ID) {
    throw new Error(
      "Define ARM_SERVICEBUS_TENANT_ID in your environment before running integration tests."
    );
  }
  if (!process.env.ARM_SERVICEBUS_SECRET) {
    throw new Error(
      "Define ARM_SERVICEBUS_SECRET in your environment before running integration tests."
    );
  }
  if (!process.env.AZURE_SUBSCRIPTION_ID) {
    throw new Error(
      "Define AZURE_SUBSCRIPTION_ID in your environment before running integration tests."
    );
  }
  if (!process.env.RESOURCE_GROUP) {
    throw new Error("Define RESOURCE_GROUP in your environment before running integration tests.");
  }
  if (!process.env.SERVICEBUS_NAMESPACE) {
    throw new Error(
      "Define SERVICEBUS_NAMESPACE in your environment before running integration tests."
    );
  }
  return {
    clientId: process.env.ARM_SERVICEBUS_CLIENT_ID,
    tenantId: process.env.ARM_SERVICEBUS_TENANT_ID,
    secret: process.env.ARM_SERVICEBUS_SECRET,
    subscriptionId: process.env.AZURE_SUBSCRIPTION_ID,
    resourceGroup: process.env.RESOURCE_GROUP,
    servicebusNamespace: process.env.SERVICEBUS_NAMESPACE
  };
}

async function recreateQueue(queueName: string, parameters: SBQueue): Promise<void> {
  const env = getEnvVars();
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(env.clientId, env.secret, env.tenantId)
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
    })
    .catch((err) => {
      throw err.message;
    });
}

async function recreateTopic(topicName: string, parameters: SBTopic): Promise<void> {
  const env = getEnvVars();
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(env.clientId, env.secret, env.tenantId)
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
    })
    .catch((err) => {
      throw err.message;
    });
}

async function recreateSubscription(
  topicName: string,
  subscriptionName: string,
  parameters: SBSubscription
): Promise<void> {
  const env = getEnvVars();
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(env.clientId, env.secret, env.tenantId)
    .then(async (creds) => {
      const client = await new ServiceBusManagementClient(creds, env.subscriptionId);
      /*
        Unlike Queues/Topics, there is no need to delete the subscription because
        `recreateTopic` is called before `recreateSubscription` which would
        delete the topic and the subscriptions, creates a new topic.
      */
      await client.subscriptions.createOrUpdate(
        env.resourceGroup,
        env.servicebusNamespace,
        topicName,
        subscriptionName,
        parameters,
        function(error: any): void {
          if (error) {
            throw error.message;
          }
        }
      );
    });
}

export async function getSenderReceiverClients(
  namespace: Namespace,
  senderClientType: ClientType,
  receiverClientType: ClientType
): Promise<{
  senderClient: QueueClient | TopicClient;
  receiverClient: QueueClient | SubscriptionClient;
}> {
  let queueName: string;
  let topicName: string;
  let subscriptionName: string;
  let queueClient: QueueClient;
  switch (receiverClientType) {
    case ClientType.PartitionedQueue:
      queueName = process.env.QUEUE_NAME || "partitioned-queue";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateQueue(queueName, {
          lockDuration: defaultLockDuration,
          enablePartitioning: true,
          enableBatchedOperations: true
        });
      }
      queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    case ClientType.PartitionedSubscription:
      topicName = process.env.TOPIC_NAME || "partitioned-topic";
      subscriptionName = process.env.SUBSCRIPTION_NAME || "partitioned-topic-subscription";
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
    case ClientType.UnpartitionedQueue:
      queueName = process.env.QUEUE_NAME_NO_PARTITION || "unpartitioned-queue";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateQueue(queueName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        });
      }
      queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    case ClientType.UnpartitionedSubscription:
      topicName = process.env.TOPIC_NAME_NO_PARTITION || "unpartitioned-topic";
      subscriptionName =
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
    case ClientType.PartitionedQueueWithSessions:
      queueName = process.env.QUEUE_NAME_SESSION || "partitioned-queue-sessions";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateQueue(queueName, {
          lockDuration: defaultLockDuration,
          enablePartitioning: true,
          enableBatchedOperations: true,
          requiresSession: true
        });
      }
      queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    case ClientType.PartitionedSubscriptionWithSessions:
      topicName = process.env.TOPIC_NAME_SESSION || "partitioned-topic-sessions";
      subscriptionName =
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
    case ClientType.UnpartitionedQueueWithSessions:
      queueName = process.env.QUEUE_NAME_NO_PARTITION_SESSION || "unpartitioned-queue-sessions";
      if (process.env.CLEAN_NAMESPACE) {
        await recreateQueue(queueName, {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true,
          requiresSession: true
        });
      }
      queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    case ClientType.UnpartitionedSubscriptionWithSessions:
      topicName = process.env.TOPIC_NAME_NO_PARTITION_SESSION || "unpartitioned-topic-sessions";
      subscriptionName =
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
    case ClientType.TopicFilterTestDefaultSubscription:
      topicName = process.env.TOPIC_FILTER_NAME || "topic-filter";
      subscriptionName =
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
    case ClientType.TopicFilterTestSubscription:
      topicName = process.env.TOPIC_FILTER_NAME || "topic-filter";
      subscriptionName = process.env.TOPIC_FILTER_SUBSCRIPTION_NAME || "topic-filter-subscription";
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
      const receiver = sessionId
        ? await receiverClient.getSessionReceiver({ sessionId: sessionId })
        : receiverClient.getReceiver();

      const msgs = await receiver.receiveBatch(peekedMsgs.length);
      for (let index = 0; index < msgs.length; index++) {
        if (msgs[index]) {
          await msgs[index].complete();
        }
      }
      await receiver.close();
    }
  }
}
