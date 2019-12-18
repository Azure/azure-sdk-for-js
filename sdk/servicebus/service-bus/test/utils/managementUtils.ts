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
 * Utility to apply retries to management operations.
 * @param operation
 */
async function retryManagementOperation(operation: any) {
  const retryAttempts = 5;
  const retryDelayInMs = 1000;

  let succeeded: boolean = false;
  let count = 0;
  while (count < retryAttempts) {
    try {
      await operation();
      succeeded = true;
      break;
    } catch (err) {
      // Ignore error and wait before retrying
      await delay(retryDelayInMs);
    }
  }

  if (!succeeded) {
    throw new Error("Error occurred while attempting to create a Service Bus entity");
  }
}

export async function recreateQueue(queueName: string, parameters: QueueOptions): Promise<void> {
  await getManagementClient();
  try {
    await client.deleteQueue(queueName);
  } catch (err) {
    // Delete and ignore if already deleted
  }
  const createQueueOperation = async () => {
    await client.createQueue(queueName, parameters);
  };
  await retryManagementOperation(createQueueOperation);
}

export async function recreateTopic(topicName: string, parameters: TopicOptions): Promise<void> {
  await getManagementClient();
  try {
    await client.deleteTopic(topicName);
  } catch (err) {
    // Delete and ignore if already deleted
  }
  const createTopicOperation = async () => {
    await client.createTopic(topicName, parameters);
  };
  await retryManagementOperation(createTopicOperation);
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
  await retryManagementOperation(createSubscriptionOperation);
}

/**
 * Utility function to get namespace string from given connection string
 * @param serviceBusConnectionString
 */
export function getNamespace(serviceBusConnectionString: string): string {
  return (serviceBusConnectionString.match("Endpoint=sb://(.*).servicebus.windows.net") || "")[1];
}
