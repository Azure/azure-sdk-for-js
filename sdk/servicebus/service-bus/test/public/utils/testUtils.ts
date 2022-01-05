// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const assert = chai.assert;
import { ServiceBusReceivedMessage, ServiceBusMessage, delay } from "../../../src";
import * as dotenv from "dotenv";
dotenv.config();

export class TestMessage {
  static sessionId: string = "my-session";

  static getSample(randomTag?: string): ServiceBusMessage {
    if (randomTag == null) {
      randomTag = Math.random().toString();
    }

    return {
      body: `message body ${randomTag}`,
      messageId: `message id ${randomTag}`,
      partitionKey: `dummy partition key`,
      contentType: `content type ${randomTag}`,
      correlationId: `correlation id ${randomTag}`,
      timeToLive: 60 * 60 * 24,
      subject: `label ${randomTag}`,
      to: `to ${randomTag}`,
      replyTo: `reply to ${randomTag}`,
      scheduledEnqueueTimeUtc: new Date(),
      applicationProperties: {
        propOne: 1,
        propTwo: "two",
        propThree: true,
        propFour: Date(),
      },
    };
  }

  static getSessionSample(): ServiceBusMessage & Required<Pick<ServiceBusMessage, "sessionId">> {
    const randomNumber = Math.random();
    return {
      body: `message body ${randomNumber}`,
      messageId: `message id ${randomNumber}`,
      partitionKey: TestMessage.sessionId,
      contentType: `content type ${randomNumber}`,
      correlationId: `correlation id ${randomNumber}`,
      timeToLive: 60 * 60 * 24,
      subject: `label ${randomNumber}`,
      to: `to ${randomNumber}`,
      replyTo: `reply to ${randomNumber}`,
      scheduledEnqueueTimeUtc: new Date(),
      applicationProperties: {
        propOne: 1,
        propTwo: "two",
        propThree: true,
        propFour: Date(),
      },
      sessionId: TestMessage.sessionId,
      replyToSessionId: "some-other-session-id",
    };
  }

  /**
   * Compares all the properties set on the given sent message with those
   * on the received message
   */
  static checkMessageContents(
    sent: ServiceBusMessage,
    received: ServiceBusReceivedMessage,
    useSessions?: boolean,
    usePartitions?: boolean
  ): void {
    if (sent.applicationProperties) {
      if (!received.applicationProperties) {
        chai.assert.fail("Received message doesnt have any user properties");
        return;
      }
      const expectedUserProperties = sent.applicationProperties;
      const receivedUserProperties = received.applicationProperties;
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
  PartitionedQueue = "PartitionedQueue",
  PartitionedTopic = "PartitionedTopic",
  PartitionedSubscription = "PartitionedSubscription",
  UnpartitionedQueue = "UnpartitionedQueue",
  UnpartitionedTopic = "UnpartitionedTopic",
  UnpartitionedSubscription = "UnpartitionedSubscription",
  PartitionedQueueWithSessions = "PartitionedQueueWithSessions",
  PartitionedTopicWithSessions = "PartitionedTopicWithSessions",
  PartitionedSubscriptionWithSessions = "PartitionedSubscriptionWithSessions",
  UnpartitionedQueueWithSessions = "UnpartitionedQueueWithSessions",
  UnpartitionedTopicWithSessions = "UnpartitionedTopicWithSessions",
  UnpartitionedSubscriptionWithSessions = "UnpartitionedSubscriptionWithSessions",
}

/**
 * Maximum wait duration for the expected event to happen = `10000 ms`(default value is 10 seconds)(= maxWaitTimeInMilliseconds)
 * Keep checking whether the predicate is true after every `1000 ms`(default value is 1 second) (= delayBetweenRetriesInMilliseconds)
 */
export async function checkWithTimeout(
  predicate: () => boolean | Promise<boolean>,
  delayBetweenRetriesInMilliseconds: number = 1000,
  maxWaitTimeInMilliseconds: number = 10000
): Promise<boolean> {
  const maxTime = Date.now() + maxWaitTimeInMilliseconds;
  while (Date.now() < maxTime) {
    if (await predicate()) return true;
    await delay(delayBetweenRetriesInMilliseconds);
  }
  return false;
}

/**
 * Utility function to get namespace string from given connection string
 */
export function getNamespace(serviceBusConnectionString: string): string {
  return (serviceBusConnectionString.match("Endpoint=.*://(.*).servicebus.windows.net") || "")[1];
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
  SUBSCRIPTION_NAME_SESSION = "partitioned-topic-subscription-sessions",
  SUBSCRIPTION_NAME_NO_PARTITION_SESSION = "unpartitioned-topic-subscription-sessions",
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
  MANAGEMENT_NEW_ENTITY_2 = "management-new-entity-2",
}

/**
 * Asserts that `fn` throws an error and assert.deepEqual compares all fields common
 * between `expectedErr` and `err`.
 *
 * @param fn - A function to execute.
 * @param expectedErr - The error fields you expect.
 * @returns The error thrown, if equal to expectedErr.
 */
export function assertThrows<T>(
  fn: () => Promise<T>,
  expectedErr: Record<string, any>,
  assertMessage?: string
): Promise<Error> {
  const testShouldHaveThrownError = new Error(
    `assert failure, an error was expected, but none was thrown: ${assertMessage}`
  );

  return fn()
    .then(() => {
      // should not happen - we expected it to throw.
      throw testShouldHaveThrownError;
    })
    .catch((err) => {
      if (err === testShouldHaveThrownError) {
        throw err;
      }

      const comparableObj: Record<string, any> = {};

      for (const k in expectedErr) {
        comparableObj[k] = err[k];
      }

      assert.deepEqual(comparableObj, expectedErr);
      return err;
    });
}
