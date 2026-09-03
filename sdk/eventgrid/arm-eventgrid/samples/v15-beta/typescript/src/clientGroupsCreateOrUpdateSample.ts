// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a client group with the specified parameters.
 *
 * @summary create or update a client group with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/ClientGroups_CreateOrUpdate.json
 */
async function clientGroupsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.clientGroups.createOrUpdate(
    "examplerg",
    "exampleNamespaceName1",
    "exampleClientGroupName1",
    { description: "This is a test client group", query: "attributes.b IN ['a', 'b', 'c']" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clientGroupsCreateOrUpdate();
}

main().catch(console.error);
