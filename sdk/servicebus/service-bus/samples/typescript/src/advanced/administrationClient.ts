/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: This sample uses the preview of the next version (v7) of the @azure/service-bus package.
For samples using the current stable version (v1) of the package, please use the link below:
  https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples-v1
  
  This sample demonstrates how the ServiceBusAdministrationClient can be used to manage the resources of a service bus namespace.

  See https://docs.microsoft.com/rest/api/servicebus/resource-provider-apis to learn more.
*/

import { ServiceBusAdministrationClient } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
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
  console.log("Error occurred: ", err);
  process.exit(1);
});
