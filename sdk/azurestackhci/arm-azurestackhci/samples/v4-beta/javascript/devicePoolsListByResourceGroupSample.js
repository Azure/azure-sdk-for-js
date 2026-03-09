// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all device pools in a resource group.
 *
 * @summary list all device pools in a resource group.
 * x-ms-original-file: 2026-03-01-preview/DevicePools_ListByResourceGroup.json
 */
async function listDevicePoolsInAGivenResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devicePools.listByResourceGroup("test-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDevicePoolsInAGivenResourceGroup();
}

main().catch(console.error);
