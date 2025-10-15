// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the usages of file service in storage account.
 *
 * @summary Gets the usages of file service in storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileServicesListUsages.json
 */
async function listFileServiceUsages() {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4410";
  const accountName = "sto8607";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileServices.listServiceUsages(resourceGroupName, accountName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listFileServiceUsages();
}

main().catch(console.error);
