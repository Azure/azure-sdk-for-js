// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "../../src";
import { QueueProperties } from "../../src/serializers/queueResourceSerializer";
import { TopicProperties } from "../../src/serializers/topicResourceSerializer";
import { SubscriptionProperties } from "../../src/serializers/subscriptionResourceSerializer";
import { ServiceBusManagementClient } from "../../src/serviceBusAtomManagementClient";

import { EnvVarNames, getEnvVars } from "./envVarUtils";
import chai from "chai";
const should = chai.should();

let client: ServiceBusManagementClient;

/**
 * Utility to fetch cached instance of `ServiceBusAtomManagementClient` else creates and returns
 * a new instance constructed based on the connection string configured in environment.
 */
async function getManagementClient() {
  if (client == undefined) {
    const env = getEnvVars();
    client = new ServiceBusManagementClient(env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]);
  }
  return client;
}

/**
 * Utility to apply retries to a given `operationCallBack`.
 * Default policy is performing linear retries of up to `5` attempts that are `1000 milliseconds` apart.
 * The retries will be preempted if given `breakConditionCallback` evaluates to `true` early on.
 * @param operationCallback
 * @param breakConditionCallback
 * @param operationDescription Text describing the operation. Used for logging purposes.
 */
async function retry(
  operationCallback: () => void,
  breakConditionCallback: () => Promise<boolean>,
  operationDescription: string
) {
  const retryAttempts = 5;
  const retryDelayInMs = 1000;

  let lastKnownError: Error | undefined = undefined;
  let succeeded: boolean = false;
  let count = 0;
  while (count < retryAttempts) {
    try {
      const breakConditionValue = await breakConditionCallback();
      if (breakConditionValue) {
        succeeded = true;
        break;
      }
      await operationCallback();
    } catch (err) {
      lastKnownError = err;
      // Ignore error and wait before retrying
      await delay(retryDelayInMs);
    } finally {
      count++;
    }
  }

  if (!succeeded) {
    if (lastKnownError != undefined) {
      lastKnownError.message = operationDescription + " : " + lastKnownError.message;
      throw lastKnownError;
    } else {
      throw new Error(`${operationDescription} failed without errors.`);
    }
  }
}

/**
 * Utility that deletes and creates a queue using given parameters.
 * @param queueName
 * @param parameters
 */
export async function recreateQueue(
  queueName: string,
  parameters?: Omit<QueueProperties, "name">
): Promise<void> {
  await getManagementClient();

  const deleteQueueOperation = async () => {
    await client.deleteQueue(queueName);
  };

  const createQueueOperation = async () => {
    await client.createQueue({ name: queueName, ...parameters });
  };

  const checkIfQueueExistsOperation = async () => {
    try {
      await client.getQueue(queueName);
    } catch (err) {
      return false;
    }
    return true;
  };

  await retry(
    deleteQueueOperation,
    async () => {
      return !(await checkIfQueueExistsOperation());
    },
    `Delete queue "${queueName}"`
  );
  await retry(createQueueOperation, checkIfQueueExistsOperation, `Create queue "${queueName}"`);
}

/**
 * Utility that deletes and creates a topic using given parameters.
 * @param topicName
 * @param parameters
 */
export async function recreateTopic(
  topicName: string,
  parameters?: Omit<TopicProperties, "name">
): Promise<void> {
  await getManagementClient();

  const deleteTopicOperation = async () => {
    await client.deleteTopic(topicName);
  };

  const createTopicOperation = async () => {
    await client.createTopic({ name: topicName, ...parameters });
  };

  const checkIfTopicExistsOperation = async () => {
    try {
      await client.getTopic(topicName);
    } catch (err) {
      return false;
    }
    return true;
  };

  await retry(
    deleteTopicOperation,
    async () => {
      return !(await checkIfTopicExistsOperation());
    },
    `Delete topic "${topicName}"`
  );
  await retry(createTopicOperation, checkIfTopicExistsOperation, `Create topic "${topicName}"`);
}

/**
 * Utility that creates a subscription using given parameters.
 * @param topicName
 * @param subscriptionName
 * @param parameters
 */
export async function recreateSubscription(
  topicName: string,
  subscriptionName: string,
  parameters?: Omit<SubscriptionProperties, "topicName" | "subscriptionName">
): Promise<void> {
  await getManagementClient();
  /*
    Unlike Queues/Topics, there is no need to delete the subscription because
    `recreateTopic` is called before `recreateSubscription` which would
    delete the topic and the subscriptions before creating a new topic.
  */

  const createSubscriptionOperation = async () => {
    await client.createSubscription({ topicName, subscriptionName, ...parameters });
  };

  const checkIfSubscriptionExistsOperation = async () => {
    try {
      await client.getSubscription(topicName, subscriptionName);
    } catch (err) {
      return false;
    }
    return true;
  };

  await retry(
    createSubscriptionOperation,
    checkIfSubscriptionExistsOperation,
    `Create subscription "${subscriptionName}"`
  );
}

/**
 * Utility that verifies the message count of an entity.
 *
 * @export
 * @param {number} expectedMessageCount
 * @param {string} [queueName]
 * @param {string} [topicName]
 * @param {string} [subscriptionName]
 * @returns {Promise<void>}
 */
export async function verifyMessageCount(
  expectedMessageCount: number,
  queueName?: string,
  topicName?: string,
  subscriptionName?: string
): Promise<void> {
  await getManagementClient();
  should.equal(
    queueName
      ? (await client.getQueueRuntimeProperties(queueName)).totalMessageCount
      : (await client.getSubscriptionRuntimeProperties(topicName!, subscriptionName!))
          .totalMessageCount,
    expectedMessageCount,
    `Unexpected number of messages are present in the entity.`
  );
}

/**
 * Utility function to get namespace string from given connection string
 * @param serviceBusConnectionString
 */
export function getNamespace(serviceBusConnectionString: string): string {
  return (serviceBusConnectionString.match("Endpoint=.*://(.*).servicebus.windows.net") || "")[1];
}
