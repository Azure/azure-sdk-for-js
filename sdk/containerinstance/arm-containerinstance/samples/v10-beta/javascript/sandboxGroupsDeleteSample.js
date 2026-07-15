// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a SandboxGroup
 *
 * @summary delete a SandboxGroup
 * x-ms-original-file: 2026-06-01-preview/SandboxGroupsDelete.json
 */
async function deleteASandboxGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.sandboxGroups.delete("myResourceGroup", "mySandboxGroup");
}

async function main() {
  await deleteASandboxGroup();
}

main().catch(console.error);
