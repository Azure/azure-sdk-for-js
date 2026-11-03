// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a resource group.
 *
 * @summary creates or updates a resource group.
 * x-ms-original-file: 2025-04-01/CreateResourceGroup.json
 */
async function createOrUpdateAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.resourceGroups.createOrUpdate("my-resource-group", {
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAResourceGroup();
}

main().catch(console.error);
