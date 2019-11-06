/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

 This sample demonstrates how to carry out management operations using connection string as the means of authenticating to Azure Service Bus. 
 While this sample shows queue related management operations, you can do the same for Topics, Subscriptions and rules.

*/

import {
  ServiceBusAtomManagementClient,
  CreateQueueResponse,
  GetQueueResponse,
  ListQueuesResponse
} from "@azure/service-bus";

async function main(): Promise<void> {
  const serviceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
    "<insert-connection-string>"
  );

  const createQueueResult: CreateQueueResponse = await serviceBusAtomManagementClient.createQueue(
    "testQueue",
    {
      enablePartitioning: true,
      requiresSession: true,
      lockDuration: "PT1M"
    }
  );
  console.log("Created queue: ", createQueueResult.queueName);

  const getQueueResult: GetQueueResponse = await serviceBusAtomManagementClient.getQueueDetails(
    "testQueue"
  );
  console.log("Retrieved queue: ", getQueueResult);

  const createAnotherQueueResult: CreateQueueResponse = await serviceBusAtomManagementClient.createQueue(
    "anotheTestQueue",
    {
      enablePartitioning: false,
      requiresSession: false,
      lockDuration: "PT3M"
    }
  );
  console.log("Created another queue: ", createAnotherQueueResult.queueName);

  const listQueuesResult: ListQueuesResponse = await serviceBusAtomManagementClient.listQueues();
  console.log("Retrieved list of queues in given namespace: ");
  for (let i = 0; i < listQueuesResult.length; i++) {
    console.log(`Queue #${i + 1} - ${listQueuesResult[i].queueName}`);
  }

  await serviceBusAtomManagementClient.deleteQueue("anotherTestQueue");
  console.log("Deleted queue: anotherTestQueue");

  const listQueuesAgainResult: ListQueuesResponse = await serviceBusAtomManagementClient.listQueues();
  console.log("Retrieve list of queues again: ");
  for (let i = 0; i < listQueuesAgainResult.length; i++) {
    console.log(`Queue #${i + 1} - ${listQueuesAgainResult[i].queueName}`);
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
