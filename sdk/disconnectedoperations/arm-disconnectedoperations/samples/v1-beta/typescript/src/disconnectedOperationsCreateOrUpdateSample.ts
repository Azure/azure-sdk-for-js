// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DisconnectedOperationsManagementClient } from "@azure/arm-disconnectedoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DisconnectedOperationCreateOrUpdate
 *
 * @summary create a DisconnectedOperationCreateOrUpdate
 * x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function disconnectedOperationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51DB5DE7-A66C-4789-BFFF-9F75C95A0201";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const result = await client.disconnectedOperations.createOrUpdate(
    "rgdisconnectedOperations",
    "demo-resource",
    {
      properties: { connectionIntent: "Disconnected" },
      tags: { key1: "value1" },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disconnectedOperationsCreateOrUpdate();
}

main().catch(console.error);
