// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a permission binding with the specified parameters.
 *
 * @summary create or update a permission binding with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PermissionBindings_CreateOrUpdate.json
 */
async function permissionBindingsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.permissionBindings.createOrUpdate(
    "examplerg",
    "exampleNamespaceName1",
    "examplePermissionBindingName1",
    {
      clientGroupName: "exampleClientGroupName1",
      permission: "Publisher",
      topicSpaceName: "exampleTopicSpaceName1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await permissionBindingsCreateOrUpdate();
}

main().catch(console.error);
