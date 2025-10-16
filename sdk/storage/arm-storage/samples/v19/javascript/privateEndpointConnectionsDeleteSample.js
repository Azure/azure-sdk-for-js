// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified private endpoint connection associated with the storage account.
 *
 * @summary Deletes the specified private endpoint connection associated with the storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountDeletePrivateEndpointConnection.json
 */
async function storageAccountDeletePrivateEndpointConnection() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const privateEndpointConnectionName = "{privateEndpointConnectionName}";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.delete(
    resourceGroupName,
    accountName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main() {
  await storageAccountDeletePrivateEndpointConnection();
}

main().catch(console.error);
