// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";

import {
  SendableMessageInfo,
  QueueClient,
  TopicClient,
  ServiceBusClient,
  SubscriptionClient,
  ReceiveMode,
  ServiceBusMessage,
  delay
} from "../../src";

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

export function getEnvVars(): { [key: string]: string } {
  // @ts-ignore
  if (!window.__env__["AAD_CLIENT_ID"]) {
    throw new Error(
      "Define ['AAD_CLIENT_ID'] in your environment before running integration tests."
    );
  }
  // @ts-ignore
  if (!window.__env__["AAD_CLIENT_SECRET"]) {
    throw new Error(
      "Define ['AAD_CLIENT_SECRET'] in your environment before running integration tests."
    );
  }
  // @ts-ignore
  if (!window.__env__["AAD_TENANT_ID"]) {
    throw new Error(
      "Define ['AAD_TENANT_ID'] in your environment before running integration tests."
    );
  }
  // @ts-ignore
  if (!window.__env__["AZURE_SUBSCRIPTION_ID"]) {
    throw new Error(
      "Define ['AZURE_SUBSCRIPTION_ID'] in your environment before running integration tests."
    );
  }
  // @ts-ignore
  if (!window.__env__["RESOURCE_GROUP"]) {
    throw new Error(
      "Define ['RESOURCE_GROUP'] in your environment before running integration tests."
    );
  }
  // @ts-ignore
  if (!window.__env__["SERVICEBUS_CONNECTION_STRING"]) {
    throw new Error(
      "Define ['SERVICEBUS_CONNECTION_STRING'] in your environment before running integration tests."
    );
  }

  // @ts-ignore
  const servicebusNamespace = (window.__env__["SERVICEBUS_CONNECTION_STRING"].match(
    "Endpoint=sb://(.*).servicebus.windows.net"
  ) || "")[1];
  return {
    // @ts-ignore
    clientId: window.__env__["AAD_CLIENT_ID"],
    // @ts-ignore
    clientSecret: window.__env__["AAD_CLIENT_SECRET"],
    // @ts-ignore
    tenantId: window.__env__["AAD_TENANT_ID"],
    // @ts-ignore
    subscriptionId: window.__env__["AZURE_SUBSCRIPTION_ID"],
    // @ts-ignore
    resourceGroup: window.__env__["RESOURCE_GROUP"],
    servicebusNamespace: servicebusNamespace
  };
}

export async function getTopicClientWithTwoSubscriptionClients(
  namespace: ServiceBusClient
): Promise<{
  topicClient: TopicClient;
  subscriptionClients: SubscriptionClient[];
}> {
  const subscriptionClients: SubscriptionClient[] = [];
  // @ts-ignore
  const topicName = window.__env__["TOPIC_FILTER_NAME"] || "topic-filter";
  const subscription1Name =
    // @ts-ignore
    window.__env__["TOPIC_FILTER_SUBSCRIPTION_NAME"] || "topic-filter-subscription";
  const subscription2Name =
    // @ts-ignore
    window.__env__["TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME"] || "topic-filter-default-subscription";

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
      // @ts-ignore
      const queueName = window.__env__["QUEUE_NAME"] || "partitioned-queue";

      const queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.PartitionedSubscription: {
      // @ts-ignore
      const topicName = window.__env__["TOPIC_NAME"] || "partitioned-topic";
      const subscriptionName =
        // @ts-ignore
        window.__env__["SUBSCRIPTION_NAME"] || "partitioned-topic-subscription";

      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.UnpartitionedQueue: {
      // @ts-ignore
      const queueName = window.__env__["QUEUE_NAME_NO_PARTITION"] || "unpartitioned-queue";
      const queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.UnpartitionedSubscription: {
      // @ts-ignore
      const topicName = window.__env__["TOPIC_NAME_NO_PARTITION"] || "unpartitioned-topic";
      const subscriptionName =
        // @ts-ignore
        window.__env__["SUBSCRIPTION_NAME_NO_PARTITION"] || "unpartitioned-topic-subscription";

      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.PartitionedQueueWithSessions: {
      // @ts-ignore
      const queueName = window.__env__["QUEUE_NAME_SESSION"] || "partitioned-queue-sessions";

      const queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.PartitionedSubscriptionWithSessions: {
      // @ts-ignore
      const topicName = window.__env__["TOPIC_NAME_SESSION"] || "partitioned-topic-sessions";
      const subscriptionName =
        // @ts-ignore
        window.__env__["SUBSCRIPTION_NAME_SESSION"] || "partitioned-topic-sessions-subscription";

      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.UnpartitionedQueueWithSessions: {
      // @ts-ignore
      const queueName =
        // @ts-ignore
        window.__env__["QUEUE_NAME_NO_PARTITION_SESSION"] || "unpartitioned-queue-sessions";

      const queueClient = namespace.createQueueClient(queueName);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.UnpartitionedSubscriptionWithSessions: {
      const topicName =
        // @ts-ignore
        window.__env__["TOPIC_NAME_NO_PARTITION_SESSION"] || "unpartitioned-topic-sessions";
      const subscriptionName =
        // @ts-ignore
        window.__env__["SUBSCRIPTION_NAME_NO_PARTITION_SESSION"] ||
        "unpartitioned-topic-sessions-subscription";
      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.TopicFilterTestDefaultSubscription: {
      // @ts-ignore
      const topicName = window.__env__["TOPIC_FILTER_NAME"] || "topic-filter";
      const subscriptionName =
        // @ts-ignore
        window.__env__["TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME"] ||
        "topic-filter-default-subscription";

      return {
        senderClient: namespace.createTopicClient(topicName),
        receiverClient: namespace.createSubscriptionClient(topicName, subscriptionName)
      };
    }
    case TestClientType.TopicFilterTestSubscription: {
      // @ts-ignore
      const topicName = window.__env__["TOPIC_FILTER_NAME"] || "topic-filter";
      const subscriptionName =
        // @ts-ignore
        window.__env__["TOPIC_FILTER_SUBSCRIPTION_NAME"] || "topic-filter-subscription";
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
