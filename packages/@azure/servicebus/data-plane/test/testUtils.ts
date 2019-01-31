// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  SendableMessageInfo,
  generateUuid,
  QueueClient,
  TopicClient,
  Namespace,
  SubscriptionClient
} from "../lib";

export const testSimpleMessages: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`
  }
];

export const testMessagesToSamePartitions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy"
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy"
  }
];

export const testSessionId = "my-session";
export const testSessionId2 = "my-session2";
export const testMessagesWithSessions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`,
    sessionId: testSessionId
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`,
    sessionId: testSessionId
  }
];
export const testMessagesWithDifferentSessionIds: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`,
    sessionId: testSessionId
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`,
    sessionId: testSessionId2
  }
];
export const testMessagesToSamePartitionsWithSessions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy",
    sessionId: testSessionId
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy",
    sessionId: testSessionId
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

export function getSenderClient(
  namespace: Namespace,
  clientType: ClientType
): QueueClient | TopicClient {
  switch (clientType) {
    case ClientType.PartitionedQueue:
      return namespace.createQueueClient(process.env.QUEUE_NAME || "partitioned-queue");
    case ClientType.PartitionedTopic:
      return namespace.createTopicClient(process.env.TOPIC_NAME || "partitioned-topic");
    case ClientType.UnpartitionedQueue:
      return namespace.createQueueClient(
        process.env.QUEUE_NAME_NO_PARTITION || "unpartitioned-queue"
      );
    case ClientType.UnpartitionedTopic:
      return namespace.createTopicClient(
        process.env.TOPIC_NAME_NO_PARTITION || "unpartitioned-topic"
      );
    case ClientType.PartitionedQueueWithSessions:
      return namespace.createQueueClient(
        process.env.QUEUE_NAME_SESSION || "partitioned-queue-sessions"
      );
    case ClientType.PartitionedTopicWithSessions:
      return namespace.createTopicClient(
        process.env.TOPIC_NAME_SESSION || "partitioned-topic-sessions"
      );
    case ClientType.UnpartitionedQueueWithSessions:
      return namespace.createQueueClient(
        process.env.QUEUE_NAME_NO_PARTITION_SESSION || "unpartitioned-queue-sessions"
      );
    case ClientType.UnpartitionedTopicWithSessions:
      return namespace.createTopicClient(
        process.env.TOPIC_NAME_NO_PARTITION_SESSION || "unpartitioned-topic-sessions"
      );
    case ClientType.TopicFilterTestTopic:
      return namespace.createTopicClient(process.env.TOPIC_FILTER_NAME || "topic-filter");
    default:
      break;
  }

  throw new Error("Cannot create sender client for give client type");
}

export function getReceiverClient(
  namespace: Namespace,
  clientType: ClientType
): QueueClient | SubscriptionClient {
  switch (clientType) {
    case ClientType.PartitionedQueue:
      return namespace.createQueueClient(process.env.QUEUE_NAME || "partitioned-queue");
    case ClientType.PartitionedSubscription:
      return namespace.createSubscriptionClient(
        process.env.TOPIC_NAME || "partitioned-topic",
        process.env.SUBSCRIPTION_NAME || "partitioned-topic-subscription"
      );
    case ClientType.UnpartitionedQueue:
      return namespace.createQueueClient(
        process.env.QUEUE_NAME_NO_PARTITION || "unpartitioned-queue"
      );
    case ClientType.UnpartitionedSubscription:
      return namespace.createSubscriptionClient(
        process.env.TOPIC_NAME_NO_PARTITION || "unpartitioned-topic",
        process.env.SUBSCRIPTION_NAME_NO_PARTITION || "unpartitioned-topic-subscription"
      );
    case ClientType.PartitionedQueueWithSessions:
      return namespace.createQueueClient(
        process.env.QUEUE_NAME_SESSION || "partitioned-queue-sessions"
      );
    case ClientType.PartitionedSubscriptionWithSessions:
      return namespace.createSubscriptionClient(
        process.env.TOPIC_NAME_SESSION || "partitioned-topic-sessions",
        process.env.SUBSCRIPTION_NAME_SESSION || "partitioned-topic-sessions-subscription"
      );
    case ClientType.UnpartitionedQueueWithSessions:
      return namespace.createQueueClient(
        process.env.QUEUE_NAME_NO_PARTITION_SESSION || "unpartitioned-queue-sessions"
      );
    case ClientType.UnpartitionedSubscriptionWithSessions:
      return namespace.createSubscriptionClient(
        process.env.TOPIC_NAME_NO_PARTITION_SESSION || "unpartitioned-topic-sessions",
        process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION ||
          "unpartitioned-topic-sessions-subscription"
      );
    case ClientType.TopicFilterTestDefaultSubscription:
      return namespace.createSubscriptionClient(
        process.env.TOPIC_FILTER_NAME || "topic-filter",
        process.env.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME || "topic-filter-default-subscription"
      );
    case ClientType.TopicFilterTestSubscription:
      return namespace.createSubscriptionClient(
        process.env.TOPIC_FILTER_NAME || "topic-filter",
        process.env.TOPIC_FILTER_SUBSCRIPTION_NAME || "topic-filter-subscription"
      );
    default:
      break;
  }

  throw new Error("Cannot create receiver client for give client type");
}

export async function purge(
  receiverClient: QueueClient | SubscriptionClient,
  useSessions?: boolean,
  sessionId?: string
): Promise<void> {
  let isEmpty = false;

  while (!isEmpty) {
    const peekedMsgs = await receiverClient.peek();
    if (peekedMsgs.length === 0) {
      isEmpty = true;
    } else {
      const receiver = useSessions
        ? await receiverClient.getSessionReceiver({ sessionId: sessionId })
        : receiverClient.getReceiver();

      const msgs = await receiver.receiveBatch(1);
      if (msgs && msgs.length) {
        await msgs[0].complete();
      }
      await receiver.close();
    }
  }
}
