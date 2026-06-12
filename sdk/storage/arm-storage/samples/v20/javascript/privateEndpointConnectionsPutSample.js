// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the storage account.
 *
 * @summary update the state of specified private endpoint connection associated with the storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountPutPrivateEndpointConnection.json
 */
async function storageAccountPutPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.put(
    "res7687",
    "sto9699",
    "{privateEndpointConnectionName}",
    { privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" } },
  );
  console.log(result);
}

async function main() {
  await storageAccountPutPrivateEndpointConnection();
}

main().catch(console.error);
