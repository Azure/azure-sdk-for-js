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
import { delay } from "rhea-promise";

export const testSimpleMessages: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${Math.random()}`
  },
  {
    body: "hello2",
    messageId: `test message ${Math.random()}`
  }
];

export const testMessagesToSamePartitions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${Math.random()}`,
    partitionKey: "dummy"
  },
  {
    body: "hello2",
    messageId: `test message ${Math.random()}`,
    partitionKey: "dummy"
  }
];

export const testSessionId1 = "my-session";
export const testSessionId2 = "my-session2";
export const testMessagesWithSessions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${Math.random()}`,
    sessionId: testSessionId1
  },
  {
    body: "hello2",
    messageId: `test message ${Math.random()}`,
    sessionId: testSessionId1
  }
];
export const testMessagesWithDifferentSessionIds: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${Math.random()}`,
    sessionId: testSessionId1
  },
  {
    body: "hello2",
    messageId: `test message ${Math.random()}`,
    sessionId: testSessionId2
  }
];
export const testMessagesToSamePartitionsWithSessions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${Math.random()}`,
    partitionKey: "dummy",
    sessionId: testSessionId1
  },
  {
    body: "hello2",
    messageId: `test message ${Math.random()}`,
    partitionKey: "dummy",
    sessionId: testSessionId1
  }
];

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
async function recreateQueue(queueName: string, parameters: SBQueue): Promise<void> {
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
  let deleteFlag = 0;
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(
      process.env.ARM_SERVICEBUS_CLIENT_ID,
      process.env.ARM_SERVICEBUS_SECRET,
      process.env.ARM_SERVICEBUS_TENANT_ID
    )
    .then(async (creds) => {
      if (!process.env.AZURE_SUBSCRIPTION_ID) {
        throw new Error(
          "Define AZURE_SUBSCRIPTION_ID in your environment before running integration tests."
        );
      }
      const client = await new ServiceBusManagementClient(creds, process.env.AZURE_SUBSCRIPTION_ID);
      if (!process.env.RESOURCE_GROUP) {
        throw new Error(
          "Define RESOURCE_GROUP in your environment before running integration tests."
        );
      }
      if (!process.env.SERVICEBUS_NAMESPACE) {
        throw new Error(
          "Define SERVICEBUS_NAMESPACE in your environment before running integration tests."
        );
      }
      await client.queues.deleteMethod(
        process.env.RESOURCE_GROUP,
        process.env.SERVICEBUS_NAMESPACE,
        queueName,
        function(error: any): void {
          if (error) throw error.message;
          else deleteFlag = 1;
        }
      );
      while (!deleteFlag) {
        await delay(10);
      }
      await client.queues.createOrUpdate(
        process.env.RESOURCE_GROUP,
        process.env.SERVICEBUS_NAMESPACE,
        queueName,
        parameters,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
}
async function recreateTopic(topicName: string, parameters: SBTopic): Promise<void> {
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
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(
      process.env.ARM_SERVICEBUS_CLIENT_ID,
      process.env.ARM_SERVICEBUS_SECRET,
      process.env.ARM_SERVICEBUS_TENANT_ID
    )
    .then(async (creds) => {
      if (!process.env.AZURE_SUBSCRIPTION_ID) {
        throw new Error(
          "Define AZURE_SUBSCRIPTION_ID in your environment before running integration tests."
        );
      }
      const client = await new ServiceBusManagementClient(creds, process.env.AZURE_SUBSCRIPTION_ID);
      if (!process.env.RESOURCE_GROUP) {
        throw new Error(
          "Define RESOURCE_GROUP in your environment before running integration tests."
        );
      }
      if (!process.env.SERVICEBUS_NAMESPACE) {
        throw new Error(
          "Define SERVICEBUS_NAMESPACE in your environment before running integration tests."
        );
      }
      await client.topics.deleteMethod(
        process.env.RESOURCE_GROUP,
        process.env.SERVICEBUS_NAMESPACE,
        topicName,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
      await client.topics.createOrUpdate(
        process.env.RESOURCE_GROUP,
        process.env.SERVICEBUS_NAMESPACE,
        topicName,
        parameters,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
}
async function recreateSubscription(
  topicName: string,
  subscriptionName: string,
  parameters: SBSubscription
): Promise<void> {
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
  let deleteFlag = 0;
  let createFlag = 0;
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(
      process.env.ARM_SERVICEBUS_CLIENT_ID,
      process.env.ARM_SERVICEBUS_SECRET,
      process.env.ARM_SERVICEBUS_TENANT_ID
    )
    .then(async (creds) => {
      if (!process.env.AZURE_SUBSCRIPTION_ID) {
        throw new Error(
          "Define AZURE_SUBSCRIPTION_ID in your environment before running integration tests."
        );
      }
      const client = await new ServiceBusManagementClient(creds, process.env.AZURE_SUBSCRIPTION_ID);
      if (!process.env.RESOURCE_GROUP) {
        throw new Error(
          "Define RESOURCE_GROUP in your environment before running integration tests."
        );
      }
      if (!process.env.SERVICEBUS_NAMESPACE) {
        throw new Error(
          "Define SERVICEBUS_NAMESPACE in your environment before running integration tests."
        );
      }
      console.log("before sub delete");
      await client.subscriptions.deleteMethod(
        process.env.RESOURCE_GROUP,
        process.env.SERVICEBUS_NAMESPACE,
        topicName,
        subscriptionName,
        async function(error: any): Promise<void> {
          if (error) {
            throw error.message;
          } else {
            deleteFlag = 1;
          }
        }
      );
      while (!deleteFlag) {
        console.log("inside while for delete");
        await delay(10);
      }
      console.log("after sub delete");
      let errMsg: any = "Resource Conflict Occurred.";
      let count = 1;
      while (errMsg.search("Resource Conflict Occurred.") + 1) {
        console.log("Create iteration : ", count);
        if (!process.env.RESOURCE_GROUP) {
          throw new Error(
            "Define RESOURCE_GROUP in your environment before running integration tests."
          );
        }
        if (!process.env.SERVICEBUS_NAMESPACE) {
          throw new Error(
            "Define SERVICEBUS_NAMESPACE in your environment before running integration tests."
          );
        }
        try {
          await client.subscriptions.createOrUpdate(
            process.env.RESOURCE_GROUP,
            process.env.SERVICEBUS_NAMESPACE,
            topicName,
            subscriptionName,
            parameters,
            function(error: any): void {
              if (error) {
                console.log("############");
                console.log(error.message);
                errMsg = error.message;
                console.log("############");
              } else {
                errMsg = "";
                createFlag = 1;
              }
            }
          );
        } catch (error) {
          console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        }
        count++;
      }
      while (!createFlag) {
        console.log("inside while for create");
        await delay(10);
      }
    });
}

export async function getSenderClient(
  namespace: Namespace,
  clientType: ClientType
): Promise<QueueClient | TopicClient> {
  switch (clientType) {
    case ClientType.PartitionedQueue:
      let queueName = process.env.QUEUE_NAME || "partitioned-queue";
      await recreateQueue(queueName, {
        lockDuration: defaultLockDuration,
        enablePartitioning: true,
        enableBatchedOperations: true
      });
      return namespace.createQueueClient(queueName);
    case ClientType.PartitionedTopic:
      let topicName = process.env.TOPIC_NAME || "partitioned-topic";
      await recreateTopic(topicName, {
        enablePartitioning: true,
        enableBatchedOperations: true
      });
      return namespace.createTopicClient(topicName);
    case ClientType.UnpartitionedQueue:
      queueName = process.env.QUEUE_NAME_NO_PARTITION || "unpartitioned-queue";
      await recreateQueue(queueName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      });
      return namespace.createQueueClient(queueName);
    case ClientType.UnpartitionedTopic:
      topicName = process.env.TOPIC_NAME_NO_PARTITION || "unpartitioned-topic";
      await recreateTopic(topicName, {
        enableBatchedOperations: true
      });
      return namespace.createTopicClient(topicName);
    case ClientType.PartitionedQueueWithSessions:
      queueName = process.env.QUEUE_NAME_SESSION || "partitioned-queue-sessions";
      await recreateQueue(queueName, {
        lockDuration: defaultLockDuration,
        enablePartitioning: true,
        enableBatchedOperations: true,
        requiresSession: true
      });
      return namespace.createQueueClient(queueName);
    case ClientType.PartitionedTopicWithSessions:
      topicName = process.env.TOPIC_NAME_SESSION || "partitioned-topic-sessions";
      await recreateTopic(topicName, {
        enablePartitioning: true,
        enableBatchedOperations: true
      });
      return namespace.createTopicClient(topicName);
    case ClientType.UnpartitionedQueueWithSessions:
      queueName = process.env.QUEUE_NAME_NO_PARTITION_SESSION || "unpartitioned-queue-sessions";
      await recreateQueue(queueName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true,
        requiresSession: true
      });
      return namespace.createQueueClient(queueName);
    case ClientType.UnpartitionedTopicWithSessions:
      topicName = process.env.TOPIC_NAME_NO_PARTITION_SESSION || "unpartitioned-topic-sessions";
      await recreateTopic(topicName, {
        enableBatchedOperations: true
      });
      return namespace.createTopicClient(topicName);
    case ClientType.TopicFilterTestTopic:
      topicName = process.env.TOPIC_FILTER_NAME || "topic-filter";
      await recreateTopic(topicName, {
        enableBatchedOperations: true
      });
      return namespace.createTopicClient(topicName);
    default:
      break;
  }

  throw new Error("Cannot create sender client for give client type");
}

export async function getReceiverClient(
  namespace: Namespace,
  clientType: ClientType
): Promise<QueueClient | SubscriptionClient> {
  switch (clientType) {
    case ClientType.PartitionedQueue:
      let queueName = process.env.QUEUE_NAME || "partitioned-queue";
      await recreateQueue(queueName, {
        lockDuration: defaultLockDuration,
        enablePartitioning: true,
        enableBatchedOperations: true
      });
      return namespace.createQueueClient(queueName);
    case ClientType.PartitionedSubscription:
      console.log("before creating sub");
      let topicName = process.env.TOPIC_NAME || "partitioned-topic";
      let subscriptionName = process.env.SUBSCRIPTION_NAME || "partitioned-topic-subscription";
      await recreateSubscription(topicName, subscriptionName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      });
      console.log("after creating sub");
      return namespace.createSubscriptionClient(topicName, subscriptionName);
    case ClientType.UnpartitionedQueue:
      queueName = process.env.QUEUE_NAME_NO_PARTITION || "unpartitioned-queue";
      await recreateQueue(queueName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      });
      return namespace.createQueueClient(queueName);
    case ClientType.UnpartitionedSubscription:
      topicName = process.env.TOPIC_NAME_NO_PARTITION || "unpartitioned-topic";
      subscriptionName =
        process.env.SUBSCRIPTION_NAME_NO_PARTITION || "unpartitioned-topic-subscription";
      await recreateSubscription(topicName, subscriptionName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      });
      return namespace.createSubscriptionClient(topicName, subscriptionName);
    case ClientType.PartitionedQueueWithSessions:
      queueName = process.env.QUEUE_NAME_SESSION || "partitioned-queue-sessions";
      await recreateQueue(queueName, {
        lockDuration: defaultLockDuration,
        enablePartitioning: true,
        enableBatchedOperations: true,
        requiresSession: true
      });
      return namespace.createQueueClient(queueName);
    case ClientType.PartitionedSubscriptionWithSessions:
      topicName = process.env.TOPIC_NAME_SESSION || "partitioned-topic-sessions";
      subscriptionName =
        process.env.SUBSCRIPTION_NAME_SESSION || "partitioned-topic-sessions-subscription";
      await recreateSubscription(topicName, subscriptionName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true,
        requiresSession: true
      });
      return namespace.createSubscriptionClient(topicName, subscriptionName);
    case ClientType.UnpartitionedQueueWithSessions:
      queueName = process.env.QUEUE_NAME_NO_PARTITION_SESSION || "unpartitioned-queue-sessions";
      await recreateQueue(queueName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true,
        requiresSession: true
      });
      return namespace.createQueueClient(queueName);
    case ClientType.UnpartitionedSubscriptionWithSessions:
      topicName = process.env.TOPIC_NAME_NO_PARTITION_SESSION || "unpartitioned-topic-sessions";
      subscriptionName =
        process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION ||
        "unpartitioned-topic-sessions-subscription";
      await recreateSubscription(topicName, subscriptionName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true,
        requiresSession: true
      });
      return namespace.createSubscriptionClient(topicName, subscriptionName);
    case ClientType.TopicFilterTestDefaultSubscription:
      topicName = process.env.TOPIC_FILTER_NAME || "topic-filter";
      subscriptionName =
        process.env.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME || "topic-filter-default-subscription";
      await recreateSubscription(topicName, subscriptionName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      });
      return namespace.createSubscriptionClient(topicName, subscriptionName);
    case ClientType.TopicFilterTestSubscription:
      topicName = process.env.TOPIC_FILTER_NAME || "topic-filter";
      subscriptionName = process.env.TOPIC_FILTER_SUBSCRIPTION_NAME || "topic-filter-subscription";
      await recreateSubscription(topicName, subscriptionName, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      });
      return namespace.createSubscriptionClient(topicName, subscriptionName);
    default:
      break;
  }

  throw new Error("Cannot create receiver client for give client type");
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
