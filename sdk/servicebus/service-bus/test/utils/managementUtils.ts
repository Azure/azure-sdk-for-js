// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  QueueOptions,
  TopicOptions,
  SubscriptionOptions,
  ServiceBusAtomManagementClient,
  delay
} from "../../src";

import { EnvVarKeys, getEnvVars } from "./envVarUtils";

const env = getEnvVars();
let client: ServiceBusAtomManagementClient;

async function getManagementClient() {
  if (client == undefined) {
    client = await new ServiceBusAtomManagementClient(env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]);
  }
  return client;
}

/**
 * Utility to apply retries to `create` management operations.
 * Will ignore if given entity is already existing.
 * @param createEntityOperation
 * @param checkIfEntityExistsOperation
 */
async function retryCreateManagementEntityOperation(
  createEntityOperation: any,
  checkIfEntityExistsOperation: any
) {
  const retryAttempts = 5;
  const retryDelayInMs = 1000;

  let succeeded: boolean = false;
  let count = 0;
  while (count < retryAttempts) {
    try {
      await createEntityOperation();
      const entityExists = await checkIfEntityExistsOperation();
      if (entityExists) {
        succeeded = true;
        break;
      }
    } catch (err) {
      // Ignore error and wait before retrying
      await delay(retryDelayInMs);
    } finally {
      count++;
    }
  }

  if (!succeeded) {
    throw new Error("Error occurred while attempting to create a Service Bus entity");
  }
}

/**
 * Utility to apply retries to `delete` management operations.
 * Will exit if given entity is already deleted.
 * @param createEntityOperation
 * @param checkIfEntityExistsOperation
 */
async function retryDeleteManagementEntityOperation(
  deleteEntityOperation: any,
  checkIfEntityExistsOperation: any
) {
  const retryAttempts = 5;
  const retryDelayInMs = 1000;

  let succeeded: boolean = false;
  let count = 0;
  while (count < retryAttempts) {
    try {
      const entityExists = await checkIfEntityExistsOperation();
      if (!entityExists) {
        succeeded = true;
        break;
      }
      await deleteEntityOperation();
    } catch (err) {
      // Ignore error and wait before retrying
      await delay(retryDelayInMs);
    } finally {
      count++;
    }
  }

  if (!succeeded) {
    throw new Error("Error occurred while attempting to delete a Service Bus entity");
  }
}

export async function recreateQueue(queueName: string, parameters: QueueOptions): Promise<void> {
  await getManagementClient();

  const deleteQueueOperation = async () => {
    await client.deleteQueue(queueName);
  };

  const createQueueOperation = async () => {
    await client.createQueue(queueName, parameters);
  };

  const checkIfQueueExistsOperation = async () => {
    let queueDetails;
    try {
      queueDetails = await client.getQueueDetails(queueName);
    } catch (err) {
      // Ignore error if get() fails
    }
    if (
      queueDetails != undefined &&
      queueDetails.queueName.toLowerCase() == queueName.toLowerCase()
    ) {
      return true;
    }
    return false;
  };

  await retryDeleteManagementEntityOperation(deleteQueueOperation, checkIfQueueExistsOperation);
  await retryCreateManagementEntityOperation(createQueueOperation, checkIfQueueExistsOperation);
}

export async function recreateTopic(topicName: string, parameters: TopicOptions): Promise<void> {
  await getManagementClient();

  const deleteTopicOperation = async () => {
    await client.deleteTopic(topicName);
  };

  const createTopicOperation = async () => {
    await client.createTopic(topicName, parameters);
  };

  const checkIfTopicExistsOperation = async () => {
    let topicDetails;
    try {
      topicDetails = await client.getTopicDetails(topicName);
    } catch (err) {
      // Ignore error if get() fails
    }
    if (
      topicDetails != undefined &&
      topicDetails.topicName.toLowerCase() == topicName.toLowerCase()
    ) {
      return true;
    }
    return false;
  };

  await retryDeleteManagementEntityOperation(deleteTopicOperation, checkIfTopicExistsOperation);
  await retryCreateManagementEntityOperation(createTopicOperation, checkIfTopicExistsOperation);
}

export async function recreateSubscription(
  topicName: string,
  subscriptionName: string,
  parameters: SubscriptionOptions
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
    const subscriptionDetails = await client.getSubscriptionDetails(topicName, subscriptionName);
    if (
      subscriptionDetails != undefined &&
      subscriptionDetails.subscriptionName.toLowerCase() == subscriptionName.toLowerCase()
    ) {
      return true;
    }
    return false;
  };

  await retryCreateManagementEntityOperation(
    createSubscriptionOperation,
    checkIfSubscriptionExistsOperation
  );
}

/**
 * Utility function to get namespace string from given connection string
 * @param serviceBusConnectionString
 */
export function getNamespace(serviceBusConnectionString: string): string {
  return (serviceBusConnectionString.match("Endpoint=sb://(.*).servicebus.windows.net") || "")[1];
}
