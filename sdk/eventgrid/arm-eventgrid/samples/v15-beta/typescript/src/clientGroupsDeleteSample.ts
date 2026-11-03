// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an existing client group.
 *
 * @summary delete an existing client group.
 * x-ms-original-file: 2025-07-15-preview/ClientGroups_Delete.json
 */
async function clientGroupsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.clientGroups.delete("examplerg", "exampleNamespaceName1", "exampleClientGroupName1");
}

async function main(): Promise<void> {
  await clientGroupsDelete();
}

main().catch(console.error);
