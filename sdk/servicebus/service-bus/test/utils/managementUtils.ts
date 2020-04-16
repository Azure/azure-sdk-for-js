// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { delay } from "../../src";
import { QueueOptions } from "../../src/serializers/queueResourceSerializer";
import { TopicOptions } from "../../src/serializers/topicResourceSerializer";
import { SubscriptionOptions } from "../../src/serializers/subscriptionResourceSerializer";
import { ServiceBusAtomManagementClient } from "../../src/serviceBusAtomManagementClient";

import { EnvVarNames, getEnvVars } from "./envVarUtils";

let client: ServiceBusAtomManagementClient;

/**
 * Utility to fetch cached instance of `ServiceBusAtomManagementClient` else creates and returns
 * a new instance constructed based on the connection string configured in environmet.
 */
async function getManagementClient() {
  if (client == undefined) {
    const env = getEnvVars();
    client = new ServiceBusAtomManagementClient(env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]);
  }
  return client;
}

/**
 * Utility to apply retries to a given `operationCallBack`.
 * Default policy is performing linear retries of upto `5` attempts that are `1000 milliseconds` apart.
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
export async function recreateQueue(queueName: string, parameters?: QueueOptions): Promise<void> {
  await getManagementClient();

  const deleteQueueOperation = async () => {
    await client.deleteQueue(queueName);
  };

  const createQueueOperation = async () => {
    await client.createQueue(queueName, parameters);
  };

  const checkIfQueueExistsOperation = async () => {
    try {
      await client.getQueueDetails(queueName);
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
export async function recreateTopic(topicName: string, parameters?: TopicOptions): Promise<void> {
  await getManagementClient();

  const deleteTopicOperation = async () => {
    await client.deleteTopic(topicName);
  };

  const createTopicOperation = async () => {
    await client.createTopic(topicName, parameters);
  };

  const checkIfTopicExistsOperation = async () => {
    try {
      await client.getTopicDetails(topicName);
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
  parameters?: SubscriptionOptions
): Promise<void> {
  await getManagementClient();
  /*
    Unlike Queues/Topics, there is no need to delete the subscription because
    `recreateTopic` is called before `recreateSubscription` which would
    delete the topic and the subscriptions before creating a new topic.
  */

  const createSubscriptionOperation = async () => {
    await client.createSubscription(topicName, subscriptionName, parameters);
  };

  const checkIfSubscriptionExistsOperation = async () => {
    try {
      await client.getSubscriptionDetails(topicName, subscriptionName);
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
 * Utility function to get namespace string from given connection string
 * @param serviceBusConnectionString
 */
export function getNamespace(serviceBusConnectionString: string): string {
  return (serviceBusConnectionString.match("Endpoint=sb://(.*).servicebus.windows.net") || "")[1];
}
