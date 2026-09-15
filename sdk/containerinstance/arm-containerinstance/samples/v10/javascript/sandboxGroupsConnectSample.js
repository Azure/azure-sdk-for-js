// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an access token and endpoint for connecting to the SandboxGroup.
 *
 * @summary get an access token and endpoint for connecting to the SandboxGroup.
 * x-ms-original-file: 2026-07-01/SandboxGroupsConnect.json
 */
async function connectToASandboxGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.sandboxGroups.connect("myResourceGroup", "mySandboxGroup");
  console.log(result);
}

async function main() {
  await connectToASandboxGroup();
}

main().catch(console.error);
