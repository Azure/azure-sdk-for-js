// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the storage account.
 *
 * @summary deletes the specified private endpoint connection associated with the storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountDeletePrivateEndpointConnection.json
 */
async function storageAccountDeletePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "res6977",
    "sto2527",
    "{privateEndpointConnectionName}",
  );
}

async function main() {
  await storageAccountDeletePrivateEndpointConnection();
}

main().catch(console.error);
