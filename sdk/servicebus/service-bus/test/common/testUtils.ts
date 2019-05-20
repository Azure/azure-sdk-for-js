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
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { SBQueue, SBTopic, SBSubscription } from "@azure/arm-servicebus/esm/models";
import { Constants, getEnvVars } from "./environmentVariables";

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

async function recreateQueue(queueName: string, parameters: SBQueue): Promise<void> {
  const env = getEnvVars();
  await msRestNodeAuth
    .loginWithServicePrincipalSecret(
      env[Constants.AAD_CLIENT_ID],
      env[Constants.AAD_CLIENT_SECRET],
      env[Constants.AAD_TENANT_ID]
    )
    .then(async (creds) => {
      const client = await new ServiceBusManagementClient(
        creds,
        env[Constants.AZURE_SUBSCRIPTION_ID]
      );
      await client.queues.deleteMethod(
        env[Constants.RESOURCE_GROUP],
        _constructServiceBusNamespaceString(env[Constants.SERVICEBUS_CONNECTION_STRING]),
        queueName,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
      await client.queues.createOrUpdate(
        env[Constants.RESOURCE_GROUP],
        _constructServiceBusNamespaceString(env[Constants.SERVICEBUS_CONNECTION_STRING]),
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
    .loginWithServicePrincipalSecret(
      env[Constants.AAD_CLIENT_ID],
      env[Constants.AAD_CLIENT_SECRET],
      env[Constants.AAD_TENANT_ID]
    )
    .then(async (creds) => {
      const client = await new ServiceBusManagementClient(
        creds,
        env[Constants.AZURE_SUBSCRIPTION_ID]
      );
      await client.topics.deleteMethod(
        env[Constants.RESOURCE_GROUP],
        _constructServiceBusNamespaceString(env[Constants.SERVICEBUS_CONNECTION_STRING]),
        topicName,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
      await client.topics.createOrUpdate(
        env[Constants.RESOURCE_GROUP],
        _constructServiceBusNamespaceString(env[Constants.SERVICEBUS_CONNECTION_STRING]),
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
    .loginWithServicePrincipalSecret(
      env[Constants.AAD_CLIENT_ID],
      env[Constants.AAD_CLIENT_SECRET],
      env[Constants.AAD_TENANT_ID]
    )
    .then(async (creds) => {
      const client = await new ServiceBusManagementClient(
        creds,
        env[Constants.AZURE_SUBSCRIPTION_ID]
      );
      /*
        Unlike Queues/Topics, there is no need to delete the subscription because
        `recreateTopic` is called before `recreateSubscription` which would
        delete the topic and the subscriptions before creating a new topic.
      */
      await client.subscriptions.createOrUpdate(
        env[Constants.RESOURCE_GROUP],
        _constructServiceBusNamespaceString(env[Constants.SERVICEBUS_CONNECTION_STRING]),
        topicName,
        subscriptionName,
        parameters,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
    });
}

export async function getTopicClientWithTwoSubscriptionClients(
  namespace: ServiceBusClient
): Promise<{
  topicClient: TopicClient;
  subscriptionClients: SubscriptionClient[];
}> {
  const env = getEnvVars();
  const subscriptionClients: SubscriptionClient[] = [];

  if (env[Constants.CLEAN_NAMESPACE]) {
    await recreateTopic(env[Constants.TOPIC_FILTER_NAME], {
      enableBatchedOperations: true
    });
    await recreateSubscription(
      env[Constants.TOPIC_FILTER_NAME],
      env[Constants.TOPIC_FILTER_SUBSCRIPTION_NAME],
      {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      }
    );
    await recreateSubscription(
      env[Constants.TOPIC_FILTER_NAME],
      env[Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME],
      {
        lockDuration: defaultLockDuration,
        enableBatchedOperations: true
      }
    );
  }

  subscriptionClients.push(
    namespace.createSubscriptionClient(
      env[Constants.TOPIC_FILTER_NAME],
      env[Constants.TOPIC_FILTER_SUBSCRIPTION_NAME]
    )
  );
  subscriptionClients.push(
    namespace.createSubscriptionClient(
      env[Constants.TOPIC_FILTER_NAME],
      env[Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME]
    )
  );

  return {
    topicClient: namespace.createTopicClient(env[Constants.TOPIC_FILTER_NAME]),
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
  const env = getEnvVars();

  switch (receiverClientType) {
    case TestClientType.PartitionedQueue: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateQueue(env[Constants.QUEUE_NAME], {
          lockDuration: defaultLockDuration,
          enablePartitioning: true,
          enableBatchedOperations: true
        });
      }
      const queueClient = namespace.createQueueClient(env[Constants.QUEUE_NAME]);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.PartitionedSubscription: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateTopic(env[Constants.TOPIC_NAME], {
          enablePartitioning: true,
          enableBatchedOperations: true
        });
        await recreateSubscription(env[Constants.TOPIC_NAME], env[Constants.SUBSCRIPTION_NAME], {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        });
      }
      return {
        senderClient: namespace.createTopicClient(env[Constants.TOPIC_NAME]),
        receiverClient: namespace.createSubscriptionClient(
          env[Constants.TOPIC_NAME],
          env[Constants.SUBSCRIPTION_NAME]
        )
      };
    }
    case TestClientType.UnpartitionedQueue: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateQueue(env[Constants.QUEUE_NAME_NO_PARTITION], {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true
        });
      }
      const queueClient = namespace.createQueueClient(env[Constants.QUEUE_NAME_NO_PARTITION]);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.UnpartitionedSubscription: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateTopic(env[Constants.TOPIC_NAME_NO_PARTITION], {
          enableBatchedOperations: true
        });
        await recreateSubscription(
          env[Constants.TOPIC_NAME_NO_PARTITION],
          env[Constants.SUBSCRIPTION_NAME_NO_PARTITION],
          {
            lockDuration: defaultLockDuration,
            enableBatchedOperations: true
          }
        );
      }
      return {
        senderClient: namespace.createTopicClient(env[Constants.TOPIC_NAME_NO_PARTITION]),
        receiverClient: namespace.createSubscriptionClient(
          env[Constants.TOPIC_NAME_NO_PARTITION],
          env[Constants.SUBSCRIPTION_NAME_NO_PARTITION]
        )
      };
    }
    case TestClientType.PartitionedQueueWithSessions: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateQueue(env[Constants.QUEUE_NAME_SESSION], {
          lockDuration: defaultLockDuration,
          enablePartitioning: true,
          enableBatchedOperations: true,
          requiresSession: true
        });
      }
      const queueClient = namespace.createQueueClient(env[Constants.QUEUE_NAME_SESSION]);
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.PartitionedSubscriptionWithSessions: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateTopic(env[Constants.TOPIC_NAME_SESSION], {
          enablePartitioning: true,
          enableBatchedOperations: true
        });
        await recreateSubscription(
          env[Constants.TOPIC_NAME_SESSION],
          env[Constants.SUBSCRIPTION_NAME_SESSION],
          {
            lockDuration: defaultLockDuration,
            enableBatchedOperations: true,
            requiresSession: true
          }
        );
      }
      return {
        senderClient: namespace.createTopicClient(env[Constants.TOPIC_NAME_SESSION]),
        receiverClient: namespace.createSubscriptionClient(
          env[Constants.TOPIC_NAME_SESSION],
          env[Constants.SUBSCRIPTION_NAME_SESSION]
        )
      };
    }
    case TestClientType.UnpartitionedQueueWithSessions: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateQueue(env[Constants.QUEUE_NAME_NO_PARTITION_SESSION], {
          lockDuration: defaultLockDuration,
          enableBatchedOperations: true,
          requiresSession: true
        });
      }
      const queueClient = namespace.createQueueClient(
        env[Constants.QUEUE_NAME_NO_PARTITION_SESSION]
      );
      return {
        senderClient: queueClient,
        receiverClient: queueClient
      };
    }
    case TestClientType.UnpartitionedSubscriptionWithSessions: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateTopic(env[Constants.TOPIC_NAME_NO_PARTITION_SESSION], {
          enableBatchedOperations: true
        });
        await recreateSubscription(
          env[Constants.TOPIC_NAME_NO_PARTITION_SESSION],
          env[Constants.SUBSCRIPTION_NAME_NO_PARTITION_SESSION],
          {
            lockDuration: defaultLockDuration,
            enableBatchedOperations: true,
            requiresSession: true
          }
        );
      }
      return {
        senderClient: namespace.createTopicClient(env[Constants.TOPIC_NAME_NO_PARTITION_SESSION]),
        receiverClient: namespace.createSubscriptionClient(
          env[Constants.TOPIC_NAME_NO_PARTITION_SESSION],
          env[Constants.SUBSCRIPTION_NAME_NO_PARTITION_SESSION]
        )
      };
    }
    case TestClientType.TopicFilterTestDefaultSubscription: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateTopic(env[Constants.TOPIC_FILTER_NAME], {
          enableBatchedOperations: true
        });
        await recreateSubscription(
          env[Constants.TOPIC_FILTER_NAME],
          env[Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME],
          {
            lockDuration: defaultLockDuration,
            enableBatchedOperations: true
          }
        );
      }
      return {
        senderClient: namespace.createTopicClient(env[Constants.TOPIC_FILTER_NAME]),
        receiverClient: namespace.createSubscriptionClient(
          env[Constants.TOPIC_FILTER_NAME],
          env[Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME]
        )
      };
    }
    case TestClientType.TopicFilterTestSubscription: {
      if (env[Constants.CLEAN_NAMESPACE]) {
        await recreateTopic(env[Constants.TOPIC_FILTER_NAME], {
          enableBatchedOperations: true
        });
        await recreateSubscription(
          env[Constants.TOPIC_FILTER_NAME],
          env[Constants.TOPIC_FILTER_SUBSCRIPTION_NAME],
          {
            lockDuration: defaultLockDuration,
            enableBatchedOperations: true
          }
        );
      }
      return {
        senderClient: namespace.createTopicClient(env[Constants.TOPIC_FILTER_NAME]),
        receiverClient: namespace.createSubscriptionClient(
          env[Constants.TOPIC_FILTER_NAME],
          env[Constants.TOPIC_FILTER_SUBSCRIPTION_NAME]
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

function _constructServiceBusNamespaceString(serviceBusConnectionString: string): string {
  return (serviceBusConnectionString.match("Endpoint=sb://(.*).servicebus.windows.net") || "")[1];
}

export function getServiceBusClient(): ServiceBusClient {
  const env = getEnvVars();
  return ServiceBusClient.createFromConnectionString(env[Constants.SERVICEBUS_CONNECTION_STRING]);
}
