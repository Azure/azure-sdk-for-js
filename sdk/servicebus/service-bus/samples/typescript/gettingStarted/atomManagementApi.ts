/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

 Below are the management operations that you can do with queues. Simiilar support exists
 for Topics, Subscriptions and rules.
 
*/

import { ServiceBusAtomManagementClient, QueueResult, ListQueuesResult } from "../../../src";

async function main(): Promise<void> {
  const serviceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
    "<insert-connection-string>"
  );

  const createQueueResult: QueueResult = await serviceBusAtomManagementClient.createQueue(
    "testQueue",
    {
      RequiresSession: "false",
      EnablePartitioning: "false"
    }
  );
  console.log("Created queue: ", createQueueResult.QueueName);

  const getQueueResult: QueueResult = await serviceBusAtomManagementClient.getQueue("testQueue");
  console.log("Retrieved queue: ", getQueueResult);

  const createAnotherQueueResult: QueueResult = await serviceBusAtomManagementClient.createQueue(
    "anotheTestQueue",
    {
      RequiresSession: "false",
      EnablePartitioning: "true"
    }
  );
  console.log("Created another queue: ", createAnotherQueueResult.QueueName);

  const listQueuesResult: ListQueuesResult = await serviceBusAtomManagementClient.listQueues();
  console.log("Retrieved list of queues in given namespace: ");
  for (let i = 0; i < listQueuesResult.length; i++) {
    console.log(`Queue #${i + 1} - ${listQueuesResult[i].QueueName}`);
  }

  await serviceBusAtomManagementClient.deleteQueue("anotherTestQueue");
  console.log("Deleted queue: anotherTestQueue");

  const listQueuesAgainResult: ListQueuesResult = await serviceBusAtomManagementClient.listQueues();
  console.log("Retrieve list of queues again: ");
  for (let i = 0; i < listQueuesAgainResult.length; i++) {
    console.log(`Queue #${i + 1} - ${listQueuesAgainResult[i].QueueName}`);
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
