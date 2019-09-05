// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

import { ServiceBusAtomManagementClient, HttpOperationResponse } from "@azure/service-bus";

async function main(): Promise<void> {
  const serviceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
    "<insert-connection-string>"
  );

  const response: HttpOperationResponse = await serviceBusAtomManagementClient.createQueue(
    "testQueuePath4",
    {
      LockDuration: "PT1M",
      MaxSizeInMegabytes: "1024",
      RequiresDuplicateDetection: "false",
      RequiresSession: "false",
      DeadLetteringOnMessageExpiration: "false",
      MaxDeliveryCount: "10",
      EnableBatchedOperations: "true",
      EnablePartitioning: "false"
    }
  );

  console.log(JSON.stringify(response.parsedBody, undefined, 2));
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
