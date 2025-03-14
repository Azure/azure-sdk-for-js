// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherClient } from "@azure/arm-databasewatcher";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SharedPrivateLinkResource
 *
 * @summary create a SharedPrivateLinkResource
 * x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_Create_MaximumSet_Gen.json
 */
async function sharedPrivateLinkResourcesCreateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "49e0fbd3-75e8-44e7-96fd-5b64d9ad818d";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const result = await client.sharedPrivateLinkResources.create(
    "apiTest-ddat4p",
    "databasemo3ej9ih",
    "monitoringh22eed",
    {
      properties: {
        privateLinkResourceId:
          "/subscriptions/49e0fbd3-75e8-44e7-96fd-5b64d9ad818d/resourceGroups/apiTest-ddat4p/providers/Microsoft.KeyVault/vaults/kvmo3ej9ih",
        groupId: "vault",
        requestMessage: "request message",
        dnsZone: "ec3ae9d410ba",
        status: "Pending",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sharedPrivateLinkResourcesCreateMaximumSet();
}

main().catch(console.error);
