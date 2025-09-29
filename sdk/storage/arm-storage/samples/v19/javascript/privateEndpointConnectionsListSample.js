// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all the private endpoint connections associated with the storage account.
 *
 * @summary List all the private endpoint connections associated with the storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountListPrivateEndpointConnections.json
 */
async function storageAccountListPrivateEndpointConnections() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(resourceGroupName, accountName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await storageAccountListPrivateEndpointConnections();
}

main().catch(console.error);
