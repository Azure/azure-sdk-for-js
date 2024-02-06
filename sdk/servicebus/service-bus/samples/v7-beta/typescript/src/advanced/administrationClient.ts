// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how the ServiceBusAdministrationClient can be used to manage the resources of a service bus namespace.
 *
 * See https://docs.microsoft.com/rest/api/servicebus/resource-provider-apis to learn more.
 *
 * @summary Demonstrates how to manage the resources of a service bus namespace.
 */

import { ServiceBusAdministrationClient } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  // You can also use AAD credentials from `@azure/identity` along with the host url
  // instead of the connection string for authentication.
  const serviceBusAdministrationClient = new ServiceBusAdministrationClient(connectionString);

  // Similarly, you can create topics and subscriptions as well.
  const createQueueResponse = await serviceBusAdministrationClient.createQueue(queueName);
  console.log("Created queue with name - ", createQueueResponse.name);

  const getQueueResponse = await serviceBusAdministrationClient.getQueue(queueName);
  console.log("(Current)max delivery count = ", getQueueResponse.maxDeliveryCount);

  getQueueResponse.maxDeliveryCount = 12;
  const updateQueueResponse = await serviceBusAdministrationClient.updateQueue(getQueueResponse);
  console.log("(Updated)max delivery count = ", updateQueueResponse.maxDeliveryCount);

  const queueRuntimeProperties = await serviceBusAdministrationClient.getQueueRuntimeProperties(
    queueName
  );
  console.log("Number of messages in the queue = ", queueRuntimeProperties.totalMessageCount);

  const namespaceInfo = await serviceBusAdministrationClient.getNamespaceProperties();
  console.log("Name of the namespace - ", namespaceInfo.name);

  await serviceBusAdministrationClient.deleteQueue(queueName);
  const queueExists = await serviceBusAdministrationClient.queueExists(queueName);
  if (queueExists == true) {
    console.log("Something went wrong, queue should have been deleted");
    return;
  }
  console.log(`Queue ${queueName} has been deleted`);
}

main().catch((err) => {
  console.log("Administration Client Sample - Error occurred: ", err);
  process.exit(1);
});
