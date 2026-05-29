// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the available SKUs supported by Microsoft.Storage for given subscription.
 *
 * @summary lists the available SKUs supported by Microsoft.Storage for given subscription.
 * x-ms-original-file: 2025-08-01/SKUList.json
 */
async function skuList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the available SKUs supported by Microsoft.Storage for given subscription.
 *
 * @summary lists the available SKUs supported by Microsoft.Storage for given subscription.
 * x-ms-original-file: 2025-08-01/SKUListWithLocationInfo.json
 */
async function skuListWithLocationInfo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await skuList();
  await skuListWithLocationInfo();
}

main().catch(console.error);
