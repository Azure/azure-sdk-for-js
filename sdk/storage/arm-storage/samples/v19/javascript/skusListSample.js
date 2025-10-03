// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the available SKUs supported by Microsoft.Storage for given subscription.
 *
 * @summary Lists the available SKUs supported by Microsoft.Storage for given subscription.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/SKUListWithLocationInfo.json
 */
async function skuListWithLocationInfo() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the available SKUs supported by Microsoft.Storage for given subscription.
 *
 * @summary Lists the available SKUs supported by Microsoft.Storage for given subscription.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/SKUList.json
 */
async function skuList() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await skuListWithLocationInfo();
  await skuList();
}

main().catch(console.error);
