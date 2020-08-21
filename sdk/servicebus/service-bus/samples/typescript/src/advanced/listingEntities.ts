/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: This sample uses the preview of the next version of the @azure/service-bus package.
  For samples using the current stable version of the package, please use the link below:
  https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples-v1
  
  This sample demonstrates how the ServiceBusManagementClient can be used to list the entities of a service bus namespace.

  See https://docs.microsoft.com/rest/api/servicebus/resource-provider-apis to learn more.
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

  // This sample leverages `listQueues()` as an example, you can iterate over topics, subscriptions, and rules
  // as well as on the runtime info of entities by using methods like `listQueuesRuntimeProperties()`
  // 1. List Queues
  let i = 1;
  let queues = serviceBusManagementClient.listQueues();
  for await (const queue of queues) {
    console.log(`Queue ${i++}: ${queue.name}`);
  }

  // 2. Same as the previous example
  i = 1;
  for await (const queue of serviceBusManagementClient.listQueues()) {
    console.log(`Queue ${i++}: ${queue.name}`);
  }

  // 3. Generator syntax .next()
  i = 1;
  queues = serviceBusManagementClient.listQueues();
  let queueItem = await queues.next();
  while (!queueItem.done) {
    console.log(`Queue ${i++}: ${queueItem.value.name}`);
    queueItem = await queues.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  // 4. list queues by page
  i = 1;
  for await (const queuesPage of serviceBusManagementClient.listQueues().byPage()) {
    for (const queue of queuesPage) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const queuesPage of serviceBusManagementClient
    .listQueues()
    .byPage({ maxPageSize: 2 })) {
    for (const queue of queuesPage) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  // 6. Generator syntax .next()
  i = 1;
  let iterator = serviceBusManagementClient.listQueues().byPage({ maxPageSize: 3 });
  let queuesPage = await iterator.next();
  while (!queuesPage.done) {
    if (queuesPage.value) {
      for (const queue of queuesPage.value) {
        console.log(`Queue ${i++}: ${queue.name}`);
      }
    }
    queuesPage = await iterator.next();
  }

  // 7. Passing marker as an argument (similar to the previous example)
  i = 1;
  iterator = serviceBusManagementClient.listQueues().byPage({ maxPageSize: 2 });
  queuesPage = await iterator.next();
  // Prints 2 queue names
  if (!queuesPage.done) {
    for (const queue of queuesPage.value) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  // lists next marker
  let marker = queuesPage.value.continuationToken;
  // Passing next marker as continuationToken
  iterator = serviceBusManagementClient.listQueues().byPage({
    continuationToken: marker,
    maxPageSize: 10
  });
  queuesPage = await iterator.next();
  // Prints 10 queue names
  if (!queuesPage.done) {
    for (const queue of queuesPage.value) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  // Delete all the newly created queues
  for (let i = 0; i < numberOfQueues; i++) {
    await serviceBusManagementClient.deleteQueue(baseQueueName + "_" + i);
  }
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
