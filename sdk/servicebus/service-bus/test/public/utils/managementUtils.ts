// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "../../../src";
import { CreateTopicOptions } from "../../../src";
import { CreateSubscriptionOptions } from "../../../src";
import { ServiceBusAdministrationClient } from "../../../src";

import { EnvVarNames, getEnvVars } from "./envVarUtils";
import chai from "chai";
import { CreateQueueOptions } from "../../../src";
const should = chai.should();

let client: ServiceBusAdministrationClient;

/**
 * Utility to fetch cached instance of `ServiceBusAtomManagementClient` else creates and returns
 * a new instance constructed based on the connection string configured in environment.
 */
function getManagementClient(): ServiceBusAdministrationClient {
  if (client === undefined) {
    const env = getEnvVars();
    client = new ServiceBusAdministrationClient(env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]);
  }
  return client;
}

/**
 * Utility to apply retries to a given `operationCallBack`.
 * Default policy is performing linear retries of up to `5` attempts that are `1000 milliseconds` apart.
 * The retries will be preempted if given `breakConditionCallback` evaluates to `true` early on.
 * @param operationDescription - Text describing the operation. Used for logging purposes.
 */
async function retry(
  operationCallback: () => void,
  breakConditionCallback: () => Promise<boolean>,
  operationDescription: string
): Promise<void> {
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
    } catch (err: any) {
      lastKnownError = err;
      // Ignore error and wait before retrying
      await delay(retryDelayInMs);
    } finally {
      count++;
    }
  }

  if (!succeeded) {
    if (lastKnownError !== undefined) {
      lastKnownError.message = operationDescription + " : " + lastKnownError.message;
      throw lastKnownError;
    } else {
      throw new Error(`${operationDescription} failed without errors.`);
    }
  }
}

/**
 * Utility that deletes and creates a queue using given parameters.
 */
export async function recreateQueue(
  queueName: string,
  parameters?: Omit<CreateQueueOptions, "name">
): Promise<void> {
  getManagementClient();

  const deleteQueueOperation = async (): Promise<void> => {
    await client.deleteQueue(queueName);
  };

  const createQueueOperation = async (): Promise<void> => {
    await client.createQueue(queueName, parameters);
  };

  const checkIfQueueExistsOperation = async (): Promise<boolean> => {
    try {
      await client.getQueue(queueName);
    } catch (err: any) {
      return false;
    }
    return true;
  };

  await retry(
    deleteQueueOperation,
    async (): Promise<boolean> => {
      return !(await checkIfQueueExistsOperation());
    },
    `Delete queue "${queueName}"`
  );
  await retry(createQueueOperation, checkIfQueueExistsOperation, `Create queue "${queueName}"`);
}

/**
 * Utility that deletes and creates a topic using given parameters.
 */
export async function recreateTopic(
  topicName: string,
  parameters?: Omit<CreateTopicOptions, "name">
): Promise<void> {
  getManagementClient();

  const deleteTopicOperation = async (): Promise<void> => {
    await client.deleteTopic(topicName);
  };

  const createTopicOperation = async (): Promise<void> => {
    await client.createTopic(topicName, parameters);
  };

  const checkIfTopicExistsOperation = async (): Promise<boolean> => {
    try {
      await client.getTopic(topicName);
    } catch (err: any) {
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
 */
export async function recreateSubscription(
  topicName: string,
  subscriptionName: string,
  parameters?: Omit<CreateSubscriptionOptions, "topicName" | "subscriptionName"> & {
    deleteFirst?: boolean;
  }
): Promise<void> {
  getManagementClient();
  /*
    Unlike Queues/Topics, there is no need to delete the subscription because
    `recreateTopic` is called before `recreateSubscription` which would
    delete the topic and the subscriptions before creating a new topic.
  */

  const createSubscriptionOperation = async (): Promise<void> => {
    await client.createSubscription(topicName, subscriptionName, parameters);
  };

  const deleteSubscriptionOperation = async (): Promise<void> => {
    await client.deleteSubscription(topicName, subscriptionName);
  };

  const checkIfSubscriptionExistsOperation = async (): Promise<boolean> => {
    try {
      await client.getSubscription(topicName, subscriptionName);
    } catch (err: any) {
      return false;
    }
    return true;
  };

  if (parameters?.deleteFirst) {
    await retry(
      deleteSubscriptionOperation,
      async () => !(await checkIfSubscriptionExistsOperation()),
      `Delete subscription "${subscriptionName}"`
    );
  }

  await retry(
    createSubscriptionOperation,
    checkIfSubscriptionExistsOperation,
    `Create subscription "${subscriptionName}"`
  );
}

/**
 * Utility that verifies the message count of an entity.
 */
export async function verifyMessageCount(
  expectedMessageCount: number,
  queueName?: string,
  topicName?: string,
  subscriptionName?: string
): Promise<void> {
  getManagementClient();
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
 */
export function getNamespace(serviceBusConnectionString: string): string {
  return (serviceBusConnectionString.match("Endpoint=.*://(.*).servicebus.windows.net") || "")[1];
}
