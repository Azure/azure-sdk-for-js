// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the container registries under the specified subscription.
 *
 * @summary lists all the container registries under the specified subscription.
 * x-ms-original-file: 2025-06-01-preview/RegistryList.json
 */
async function registryList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registries.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await registryList();
}

main().catch(console.error);
