// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import {
  SendableMessageInfo,
  QueueClient,
  TopicClient,
  ServiceBusClient,
  SubscriptionClient,
  delay,
  ReceiveMode,
  ServiceBusMessage
} from "../../src";
import { EnvVarNames, getEnvVars } from "./envVarUtils";
import { recreateQueue, recreateSubscription, recreateTopic } from "./managementUtils";

import * as dotenv from "dotenv";
dotenv.config();

const defaultLockDuration = "PT30S"; // 30 seconds in ISO 8601 FORMAT - equivalent to "P0Y0M0DT0H0M30S"

export class TestMessage {
  static sessionId: string = "my-session";

  static getSample(): SendableMessageInfo {
    const randomNumber = Math.random();
    return {
      body: `message body ${randomNumber}`,
      messageId: `message id ${randomNumber}`,
      partitionKey: `dummy partition key`,
      contentType: `content type ${randomNumber}`,
      correlationId: `correlation id ${randomNumber}`,
      timeToLive: 60 * 60 * 24,
      label: `label ${randomNumber}`,
      to: `to ${randomNumber}`,
      replyTo: `reply to ${randomNumber}`,
      scheduledEnqueueTimeUtc: new Date(),
      userProperties: {
        propOne: 1,
        propTwo: "two",
        propThree: true
      }
    };
  }

  static getSessionSample(): SendableMessageInfo {
    const randomNumber = Math.random();
    return {
      body: `message body ${randomNumber}`,
      messageId: `message id ${randomNumber}`,
      partitionKey: `partition key ${randomNumber}`,
      contentType: `content type ${randomNumber}`,
      correlationId: `correlation id ${randomNumber}`,
      timeToLive: 60 * 60 * 24,
      label: `label ${randomNumber}`,
      to: `to ${randomNumber}`,
      replyTo: `reply to ${randomNumber}`,
      scheduledEnqueueTimeUtc: new Date(),
      userProperties: {
        propOne: 1,
        propTwo: "two",
        propThree: true
      },
      sessionId: TestMessage.sessionId,
      replyToSessionId: "some-other-session-id"
    };
  }

  /**
   * Compares all the properties set on the given sent message with those
   * on the received message
   */
  static checkMessageContents(
    sent: SendableMessageInfo,
    received: ServiceBusMessage,
    useSessions?: boolean,
    usePartitions?: boolean
  ): void {
    if (sent.userProperties) {
      if (!received.userProperties) {
        chai.assert.fail("Received message doesnt have any user properties");
        return;
      }
      const expectedUserProperties = sent.userProperties;
      const receivedUserProperties = received.userProperties;
      Object.keys(expectedUserProperties).forEach((key) => {
        chai.assert.equal(
          receivedUserProperties[key],
          expectedUserProperties[key],
          `Unexpected value for user property for ${key}`
        );
      });
    }

    chai.assert.equal(received.body, sent.body, `Unexpected body in received msg`);
    chai.assert.equal(received.messageId, sent.messageId, `Unexpected messageId in received msg`);

    chai.assert.equal(
      received.contentType,
      sent.contentType,
      `Unexpected contentType in received msg`
    );
    chai.assert.equal(
      received.correlationId,
      sent.correlationId,
      `Unexpected correlationId in received msg`
    );
    chai.assert.equal(
      received.timeToLive,
      sent.timeToLive,
      `Unexpected timeToLive in received msg`
    );
    chai.assert.equal(received.to, sent.to, `Unexpected to in received msg`);
    chai.assert.equal(received.replyTo, sent.replyTo, `Unexpected replyTo in received msg`);

    if (useSessions) {
      chai.assert.equal(received.sessionId, sent.sessionId, `Unexpected sessionId in received msg`);
      chai.assert.equal(
        received.replyToSessionId,
        sent.replyToSessionId,
        `Unexpected replyToSessionId in received msg`
      );
      if (usePartitions) {
        chai.assert.equal(
          received.partitionKey,
          sent.sessionId,
          `Unexpected partitionKey in received msg`
        );
      }
    } else {
      chai.assert.equal(
        received.partitionKey,
        sent.partitionKey,
        `Unexpected partitionKey in received msg`
      );
    }
  }
}

// `isSessionfulEntity` is a function that relies on this enum's ordering and would require updates if this enum ever changes.
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

/**
 * Returns true if the client is meant for sessions.
 *
 * @export
 * @param {TestClientType} testClientType
 * @returns
 */
export function isSessionfulEntity(testClientType: TestClientType): boolean {
  return testClientType > 5 && testClientType < 12;
}

export async function getTopicClientWithTwoSubscriptionClients(
  namespace: ServiceBusClient
): Promise<{
  topicClient: TopicClient;
  subscriptionClients: SubscriptionClient[];
}> {
  const subscriptionClients: SubscriptionClient[] = [];

  await recreateTopic(EntityNames.TOPIC_FILTER_NAME, {
    enableBatchedOperations: true
  });
  await recreateSubscription(
    EntityNames.TOPIC_FILTER_NAME,
    EntityNames.TOPIC_FILTER_SUBSCRIPTION_NAME,
    {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true
    }
  );

  await recreateSubscription(
    EntityNames.TOPIC_FILTER_NAME,
    EntityNames.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME,
    {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true
    }
  );

  subscriptionClients.push(
    namespace.createSubscriptionClient(
      EntityNames.TOPIC_FILTER_NAME,
      EntityNames.TOPIC_FILTER_SUBSCRIPTION_NAME
    )
  );
  subscriptionClients.push(
    namespace.createSubscriptionClient(
      EntityNames.TOPIC_FILTER_NAME,
      EntityNames.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME
    )
  );

  return {
    topicClient: namespace.createTopicClient(EntityNames.TOPIC_FILTER_NAME),
    subscriptionClients
  };
}

export async function getSenderReceiverClients(
  sbClient: ServiceBusClient,
  senderClientType: TestClientType,
  receiverClientType: TestClientType
): Promise<{
  senderClient: QueueClient | TopicClient;
  receiverClient: QueueClient | SubscriptionClient;
}> {
  switch (receiverClientType) {
    case TestClientType.PartitionedQueue: {
      await recreateQueue(EntityNames.QUEUE_NAME, {
        lockDuration: defaultLockDuration,
        enablePartitioning: true,
        enableBatchedOperations: true
      });

      const queueClient = sbClient.createQueueClient(EntityNames.QUEUE_NAME);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }

    case TestClientType.PartitionedSubscription: {
      await recreateTopic(EntityNames.TOPIC_NAME, {
        enablePartitioning: true,
        enableBatchedOperations: true
      });
      await recreateSubscription(EntityNames.TOPIC_NAME, EntityNames.SUBSCRIPTION_NAME, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      });

      return {
        senderClient: sbClient.createTopicClient(EntityNames.TOPIC_NAME),
        receiverClient: sbClient.createSubscriptionClient(
          EntityNames.TOPIC_NAME,
          EntityNames.SUBSCRIPTION_NAME
        )
      };
    }

    case TestClientType.UnpartitionedQueue: {
      await recreateQueue(EntityNames.QUEUE_NAME_NO_PARTITION, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      });

      const queueClient = sbClient.createQueueClient(EntityNames.QUEUE_NAME_NO_PARTITION);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }

    case TestClientType.UnpartitionedSubscription: {
      await recreateTopic(EntityNames.TOPIC_NAME_NO_PARTITION, {
        enableBatchedOperations: true
      });
      await recreateSubscription(
        EntityNames.TOPIC_NAME_NO_PARTITION,
        EntityNames.SUBSCRIPTION_NAME_NO_PARTITION,
        {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        }
      );

      return {
        senderClient: sbClient.createTopicClient(EntityNames.TOPIC_NAME_NO_PARTITION),
        receiverClient: sbClient.createSubscriptionClient(
          EntityNames.TOPIC_NAME_NO_PARTITION,
          EntityNames.SUBSCRIPTION_NAME_NO_PARTITION
        )
      };
    }

    case TestClientType.PartitionedQueueWithSessions: {
      await recreateQueue(EntityNames.QUEUE_NAME_SESSION, {
        lockDuration: defaultLockDuration,
        enablePartitioning: true,
        enableBatchedOperations: true,
        requiresSession: true
      });

      const queueClient = sbClient.createQueueClient(EntityNames.QUEUE_NAME_SESSION);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }

    case TestClientType.PartitionedSubscriptionWithSessions: {
      await recreateTopic(EntityNames.TOPIC_NAME_SESSION, {
        enablePartitioning: true,
        enableBatchedOperations: true
      });
      await recreateSubscription(
        EntityNames.TOPIC_NAME_SESSION,
        EntityNames.SUBSCRIPTION_NAME_SESSION,
        {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true,
          requiresSession: true
        }
      );

      return {
        senderClient: sbClient.createTopicClient(EntityNames.TOPIC_NAME_SESSION),
        receiverClient: sbClient.createSubscriptionClient(
          EntityNames.TOPIC_NAME_SESSION,
          EntityNames.SUBSCRIPTION_NAME_SESSION
        )
      };
    }

    case TestClientType.UnpartitionedQueueWithSessions: {
      await recreateQueue(EntityNames.QUEUE_NAME_NO_PARTITION_SESSION, {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true,
        requiresSession: true
      });

      const queueClient = sbClient.createQueueClient(EntityNames.QUEUE_NAME_NO_PARTITION_SESSION);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }

    case TestClientType.UnpartitionedSubscriptionWithSessions: {
      await recreateTopic(EntityNames.TOPIC_NAME_NO_PARTITION_SESSION, {
        enableBatchedOperations: true
      });
      await recreateSubscription(
        EntityNames.TOPIC_NAME_NO_PARTITION_SESSION,
        EntityNames.SUBSCRIPTION_NAME_NO_PARTITION_SESSION,
        {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true,
          requiresSession: true
        }
      );

      return {
        senderClient: sbClient.createTopicClient(EntityNames.TOPIC_NAME_NO_PARTITION_SESSION),
        receiverClient: sbClient.createSubscriptionClient(
          EntityNames.TOPIC_NAME_NO_PARTITION_SESSION,
          EntityNames.SUBSCRIPTION_NAME_NO_PARTITION_SESSION
        )
      };
    }

    case TestClientType.TopicFilterTestDefaultSubscription: {
      await recreateTopic(EntityNames.TOPIC_FILTER_NAME, {
        enableBatchedOperations: true
      });
      await recreateSubscription(
        EntityNames.TOPIC_FILTER_NAME,
        EntityNames.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME,
        {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        }
      );

      return {
        senderClient: sbClient.createTopicClient(EntityNames.TOPIC_FILTER_NAME),
        receiverClient: sbClient.createSubscriptionClient(
          EntityNames.TOPIC_FILTER_NAME,
          EntityNames.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME
        )
      };
    }

    case TestClientType.TopicFilterTestSubscription: {
      await recreateTopic(EntityNames.TOPIC_FILTER_NAME, {
        enableBatchedOperations: true
      });
      await recreateSubscription(
        EntityNames.TOPIC_FILTER_NAME,
        EntityNames.TOPIC_FILTER_SUBSCRIPTION_NAME,
        {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        }
      );

      return {
        senderClient: sbClient.createTopicClient(EntityNames.TOPIC_FILTER_NAME),
        receiverClient: sbClient.createSubscriptionClient(
          EntityNames.TOPIC_FILTER_NAME,
          EntityNames.TOPIC_FILTER_SUBSCRIPTION_NAME
        )
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

/**
 * Utility function to get namespace string from given connection string
 * @param serviceBusConnectionString
 */
export function getNamespace(serviceBusConnectionString: string): string {
  return (serviceBusConnectionString.match("Endpoint=.*://(.*).servicebus.windows.net") || "")[1];
}

export function getServiceBusClient(): ServiceBusClient {
  const env = getEnvVars();
  return ServiceBusClient.createFromConnectionString(env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]);
}

/**
 * Enum to abstract away string values used for referencing the Service Bus entity names.
 */
export enum EntityNames {
  QUEUE_NAME = "partitioned-queue",
  QUEUE_NAME_NO_PARTITION = "unpartitioned-queue",
  QUEUE_NAME_SESSION = "partitioned-queue-sessions",
  QUEUE_NAME_NO_PARTITION_SESSION = "unpartitioned-queue-sessions",
  TOPIC_NAME = "partitioned-topic",
  TOPIC_NAME_NO_PARTITION = "unpartitioned-topic",
  TOPIC_NAME_SESSION = "partitioned-topic-sessions",
  TOPIC_NAME_NO_PARTITION_SESSION = "unpartitioned-topic-sessions",
  SUBSCRIPTION_NAME = "partitioned-topic-subscription",
  SUBSCRIPTION_NAME_NO_PARTITION = "unpartitioned-topic-subscription",
  SUBSCRIPTION_NAME_SESSION = "partitioned-topic-sessions-subscription",
  SUBSCRIPTION_NAME_NO_PARTITION_SESSION = "unpartitioned-topic-sessions-subscription",
  TOPIC_FILTER_NAME = "topic-filter",
  TOPIC_FILTER_SUBSCRIPTION_NAME = "topic-filter-subscription",
  TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME = "topic-filter-default-subscription",
  MANAGEMENT_QUEUE_1 = "management-queue-1",
  MANAGEMENT_TOPIC_1 = "management-topic-1",
  MANAGEMENT_SUBSCRIPTION_1 = "management-subscription-1",
  MANAGEMENT_RULE_1 = "management-rule-1",
  MANAGEMENT_QUEUE_2 = "management-queue-2",
  MANAGEMENT_TOPIC_2 = "management-topic-2",
  MANAGEMENT_SUBSCRIPTION_2 = "management-subscription-2",
  MANAGEMENT_RULE_2 = "management-rule-2",
  MANAGEMENT_NEW_ENTITY_1 = "management-new-entity-1",
  MANAGEMENT_NEW_ENTITY_2 = "management-new-entity-2"
}
