// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an existing permission binding.
 *
 * @summary delete an existing permission binding.
 * x-ms-original-file: 2025-07-15-preview/PermissionBindings_Delete.json
 */
async function permissionBindingsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.permissionBindings.delete(
    "examplerg",
    "exampleNamespaceName1",
    "examplePermissionBindingName1",
  );
}

async function main() {
  await permissionBindingsDelete();
}

main().catch(console.error);
