// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

import {
  ServiceBusAtomManagementClient,
  ServiceClientOptions,
  logPolicy,
  HttpOperationResponse
} from "@azure/service-bus";

async function main(): Promise<void> {
  const clientOptions: ServiceClientOptions = {
    requestPolicyFactories: [logPolicy()]
  };

  const serviceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
    "<insert-connection-string>",
    clientOptions
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
