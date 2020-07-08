/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: This sample uses the preview of the next version of the @azure/service-bus package.
  For samples using the current stable version of the package, please use the link below:
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples
  
  This sample demonstrates how the ServiceBusManagementClient can be used to list the entities of a service bus namespace.

  See https://docs.microsoft.com/en-us/rest/api/servicebus/resource-provider-apis to learn more.
*/

import { ServiceBusManagementClient } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";

export async function main() {
  const serviceBusManagementClient = new ServiceBusManagementClient(connectionString);
  const baseQueueName = "random-queue";
  const numberOfQueues = 7;

  // Create queues in order to list them later
  for (let i = 0; i < numberOfQueues; i++) {
    await serviceBusManagementClient.createQueue(baseQueueName + "_" + i);
  }

  // This sample leverages `getQueues()` as an example, you can iterate over topics, subscriptions, and rules
  // as well as on the runtime info of entities by using methods like `getQueuesRuntimeInfo()`
  // 1. List Queues
  let i = 1;
  let iter = serviceBusManagementClient.getQueues();
  for await (const queue of iter) {
    console.log(`Queue ${i++}: ${queue.name}`);
  }

  // 2. Same as the previous example
  i = 1;
  for await (const queue of serviceBusManagementClient.getQueues()) {
    console.log(`Queue ${i++}: ${queue.name}`);
  }

  // 3. Generator syntax .next()
  i = 1;
  iter = serviceBusManagementClient.getQueues();
  let queueItem = await iter.next();
  while (!queueItem.done) {
    console.log(`Queue ${i++}: ${queueItem.value.name}`);
    queueItem = await iter.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  // 4. list queues by page
  i = 1;
  for await (const response of serviceBusManagementClient.getQueues().byPage()) {
    for (const queue of response) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const response of serviceBusManagementClient.getQueues().byPage({ maxPageSize: 2 })) {
    for (const queue of response) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  // 6. Generator syntax .next()
  i = 1;
  let iterator = serviceBusManagementClient.getQueues().byPage({ maxPageSize: 3 });
  let response = await iterator.next();
  while (!response.done) {
    if (response.value) {
      for (const queue of response.value) {
        console.log(`Queue ${i++}: ${queue.name}`);
      }
    }
    response = await iterator.next();
  }

  // 7. Passing marker as an argument (similar to the previous example)
  i = 1;
  iterator = serviceBusManagementClient.getQueues().byPage({ maxPageSize: 2 });
  response = await iterator.next();
  // Prints 2 queue names
  if (!response.done) {
    for (const queue of response.value) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  // Gets next marker
  let marker = response.value.continuationToken;
  // Passing next marker as continuationToken
  iterator = serviceBusManagementClient.getQueues().byPage({
    continuationToken: marker,
    maxPageSize: 10
  });
  response = await iterator.next();
  // Prints 10 queue names
  if (!response.done) {
    for (const queue of response.value) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  for (let i = 0; i < numberOfQueues; i++) {
    await serviceBusManagementClient.deleteQueue(baseQueueName + "_" + i);
  }
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
