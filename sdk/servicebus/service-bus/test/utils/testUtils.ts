// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import {
  SendableMessageInfo,
  delay,
  MessagingError,
  ContextWithSettlement,
  ReceivedMessage
} from "../../src";
import { EnvVarNames, getEnvVars } from "./envVarUtils";
import { recreateQueue, recreateSubscription, recreateTopic } from "./managementUtils";

import * as dotenv from "dotenv";
import { ServiceBusSenderClient } from "../../src/senderClient";
import {
  ServiceBusReceiverClient,
  ReceiverClientTypeForUser
} from "../../src/serviceBusReceiverClient";
dotenv.config();

const defaultLockDuration = "PT30S"; // 30 seconds in ISO 8601 FORMAT - equivalent to "P0Y0M0DT0H0M30S"
const env = getEnvVars();

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
    received: ReceivedMessage,
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

async function recreateResources(
  entity: { type: "queue" | "subscription" } & {
    session: boolean;
    partitioned: boolean;
  },
  connectionString: string,
  receiveMode: "peekLock" | "receiveAndDelete"
): Promise<{
  senderClient: ServiceBusSenderClient;
  receiverClient: ReceiverClientTypeForUser;
}> {
  const prefix = entity.partitioned ? "partitioned-" : "unpartitioned-";
  const suffix = entity.session ? "-sessions" : "";
  let auth: any;
  let entityName: string;
  if (entity.type === "queue") {
    const queueName = prefix + "queue" + suffix;
    await recreateQueue(queueName, {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true,
      enablePartitioning: entity.partitioned,
      requiresSession: entity.session
    });
    auth = {
      connectionString,
      queueName: queueName
    };
    entityName = queueName;
  } else {
    const topicName = prefix + "topic" + suffix;
    const subscriptionName = prefix + "topic-subscription" + suffix;
    await recreateTopic(topicName, {
      enablePartitioning: entity.partitioned,
      enableBatchedOperations: true
    });
    await recreateSubscription(topicName, subscriptionName, {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true,
      requiresSession: entity.session
    });

    auth = {
      connectionString,
      topicName: topicName,
      subscriptionName: subscriptionName
    };
    entityName = topicName;
  }

  const receiverClient = () => {
    if (entity.session) {
      if (receiveMode === "peekLock") {
        return new ServiceBusReceiverClient(auth, receiveMode, {
          id: TestMessage.sessionId
        });
      } else {
        return new ServiceBusReceiverClient(auth, receiveMode, {
          id: TestMessage.sessionId
        });
      }
    } else {
      if (receiveMode === "peekLock") {
        return new ServiceBusReceiverClient(auth, receiveMode);
      } else {
        return new ServiceBusReceiverClient(auth, receiveMode);
      }
    }
  };
  return {
    senderClient: new ServiceBusSenderClient(connectionString, entityName),
    receiverClient: receiverClient()
  };
}

export async function getSenderReceiverClients(
  entityType: TestClientType,
  receiveMode: "peekLock" | "receiveAndDelete"
): Promise<{
  senderClient: ServiceBusSenderClient;
  receiverClient: ReceiverClientTypeForUser;
}> {
  const connectionString = env[EnvVarNames.SERVICEBUS_CONNECTION_STRING];
  switch (entityType) {
    case TestClientType.PartitionedQueue: {
      return recreateResources(
        {
          type: "queue",
          partitioned: true,
          session: false
        },
        connectionString,
        receiveMode
      );
    }

    case TestClientType.PartitionedSubscription: {
      return recreateResources(
        {
          type: "subscription",
          partitioned: true,
          session: false
        },
        connectionString,
        receiveMode
      );
    }

    case TestClientType.UnpartitionedQueue: {
      return recreateResources(
        {
          type: "queue",
          partitioned: false,
          session: false
        },
        connectionString,
        receiveMode
      );
    }

    case TestClientType.UnpartitionedSubscription:
    case TestClientType.TopicFilterTestDefaultSubscription:
    case TestClientType.TopicFilterTestSubscription: {
      return recreateResources(
        {
          type: "subscription",
          partitioned: false,
          session: false
        },
        connectionString,
        receiveMode
      );
    }

    case TestClientType.PartitionedQueueWithSessions: {
      return recreateResources(
        {
          type: "queue",
          partitioned: true,
          session: true
        },
        connectionString,
        receiveMode
      );
    }

    case TestClientType.PartitionedSubscriptionWithSessions: {
      return recreateResources(
        {
          type: "subscription",
          partitioned: true,
          session: true
        },
        connectionString,
        receiveMode
      );
    }

    case TestClientType.UnpartitionedQueueWithSessions: {
      return recreateResources(
        {
          type: "queue",
          partitioned: false,
          session: true
        },
        connectionString,
        receiveMode
      );
    }

    case TestClientType.UnpartitionedSubscriptionWithSessions: {
      return recreateResources(
        {
          type: "subscription",
          partitioned: false,
          session: true
        },
        connectionString,
        receiveMode
      );
    }

    default:
      break;
  }

  throw new Error("Cannot create sender/receiver clients for given client types");
}

/**
 * Purges the content in the Queue/Subscription corresponding to the receiverClient
 * @param receiverClient
 */
export async function purge(receiverClient: ReceiverClientTypeForUser): Promise<void> {
  let isEmpty = false;

  while (!isEmpty) {
    const peekedMsgs = await receiverClient.diagnostics.peek(10);
    if (peekedMsgs.length === 0) {
      isEmpty = true;
    } else {
      const msgsAndContext = await receiverClient.receiveBatch(peekedMsgs.length);
      for (let index = 0; index < msgsAndContext.messages.length; index++) {
        if (msgsAndContext.messages[index]) {
          await (msgsAndContext.context as ContextWithSettlement).complete(
            msgsAndContext.messages[index]
          );
        }
      }
      await receiverClient.close();
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
  return (serviceBusConnectionString.match("Endpoint=sb://(.*).servicebus.windows.net") || "")[1];
}

/**
 * Enum to abstract away string values used for referencing the Service Bus entity names.
 */
export enum EntityNames {
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

/**
 * Utility to check if given error is instance of `MessagingError`
 * @param err
 */
export function isMessagingError(err: any): err is MessagingError {
  return err.name === "MessagingError";
}
