// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how the ServiceBusAdministrationClient can be used to list the entities of a service bus namespace.
 *
 * See https://docs.microsoft.com/rest/api/servicebus/resource-provider-apis to learn more.
 *
 * @summary Demonstrates how the ServiceBusAdministrationClient can be used to list the entities of a service bus namespace
 */
const { ServiceBusAdministrationClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";

async function main() {
  const serviceBusAdministrationClient = new ServiceBusAdministrationClient(connectionString);
  const baseQueueName = "random-queue";
  const numberOfQueues = 7;

  // Create queues in order to list them later
  for (let i = 0; i < numberOfQueues; i++) {
    await serviceBusAdministrationClient.createQueue(baseQueueName + "_" + i);
  }

  // for (let i = 0; i < numberOfQueues; i++) {
  //   try {
  //     await serviceBusAdministrationClient.createQueue(baseQueueName + "_" + i);
  //   } catch (error) {
  //     if (error.statusCode !== 409) {
  //       throw error;
  //     }
  //   }
  // }

  // This sample leverages `listQueues()` as an example, you can iterate over topics, subscriptions, and rules
  // as well as on the runtime info of entities by using methods like `listQueuesRuntimeProperties()`
  // 1. List Queues
  let i = 1;
  let queues = serviceBusAdministrationClient.listQueues();
  for await (const queue of queues) {
    console.log(`Queue ${i++}: ${queue.name}`);
  }

  // 2. Same as the previous example
  i = 1;
  for await (const queue of serviceBusAdministrationClient.listQueues()) {
    console.log(`Queue ${i++}: ${queue.name}`);
  }

  // 3. Generator syntax .next()
  i = 1;
  queues = serviceBusAdministrationClient.listQueues();
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
  for await (const queuesPage of serviceBusAdministrationClient.listQueues().byPage()) {
    for (const queue of queuesPage) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const queuesPage of serviceBusAdministrationClient
    .listQueues()
    .byPage({ maxPageSize: 2 })) {
    for (const queue of queuesPage) {
      console.log(`Queue ${i++}: ${queue.name}`);
    }
  }

  // 6. Generator syntax .next()
  i = 1;
  let iterator = serviceBusAdministrationClient.listQueues().byPage({ maxPageSize: 3 });
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
  iterator = serviceBusAdministrationClient.listQueues().byPage({ maxPageSize: 2 });
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
  iterator = serviceBusAdministrationClient.listQueues().byPage({
    continuationToken: marker,
    maxPageSize: 10,
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
    await serviceBusAdministrationClient.deleteQueue(baseQueueName + "_" + i);
  }
}

main().catch((err) => {
  console.log("Listing Entities Sample: ", err);
  process.exit(1);
});

module.exports = { main };
