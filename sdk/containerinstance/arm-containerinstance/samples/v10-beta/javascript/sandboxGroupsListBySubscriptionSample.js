// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list SandboxGroup resources by subscription ID
 *
 * @summary list SandboxGroup resources by subscription ID
 * x-ms-original-file: 2026-06-01-preview/SandboxGroupsListBySubscription.json
 */
async function listSandboxGroupsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sandboxGroups.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSandboxGroupsBySubscription();
}

main().catch(console.error);
