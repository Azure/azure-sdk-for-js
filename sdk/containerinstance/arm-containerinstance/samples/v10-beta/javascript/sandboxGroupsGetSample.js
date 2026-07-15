// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SandboxGroup
 *
 * @summary get a SandboxGroup
 * x-ms-original-file: 2026-06-01-preview/SandboxGroupsGet.json
 */
async function getASandboxGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.sandboxGroups.get("myResourceGroup", "mySandboxGroup");
  console.log(result);
}

async function main() {
  await getASandboxGroup();
}

main().catch(console.error);
