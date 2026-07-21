// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a shared private link resource
 *
 * @summary create or update a shared private link resource
 * x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_CreateOrUpdate.json
 */
async function signalRSharedPrivateLinkResourcesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRSharedPrivateLinkResources.createOrUpdate(
    "upstream",
    "myResourceGroup",
    "mySignalRService",
    {
      groupId: "sites",
      privateLinkResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.Web/sites/myWebApp",
      requestMessage: "Please approve",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalRSharedPrivateLinkResourcesCreateOrUpdate();
}

main().catch(console.error);
