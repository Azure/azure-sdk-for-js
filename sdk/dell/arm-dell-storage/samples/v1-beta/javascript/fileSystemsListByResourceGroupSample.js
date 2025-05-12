// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageClient } = require("@azure/arm-dell-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list FileSystemResource resources by resource group
 *
 * @summary list FileSystemResource resources by resource group
 * x-ms-original-file: 2025-03-21-preview/FileSystems_ListByResourceGroup_MaximumSet_Gen.json
 */
async function fileSystemsListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4B6E265D-57CF-4A9D-8B35-3CC68ED9D208";
  const client = new StorageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listByResourceGroup("rgDell")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FileSystemResource resources by resource group
 *
 * @summary list FileSystemResource resources by resource group
 * x-ms-original-file: 2025-03-21-preview/FileSystems_ListByResourceGroup_MinimumSet_Gen.json
 */
async function fileSystemsListByResourceGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BF7E7352-2FE4-4163-9CF7-5FF8EC2E9B92";
  const client = new StorageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listByResourceGroup("rgDell")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await fileSystemsListByResourceGroupMaximumSetGen();
  await fileSystemsListByResourceGroupMinimumSetGen();
}

main().catch(console.error);
