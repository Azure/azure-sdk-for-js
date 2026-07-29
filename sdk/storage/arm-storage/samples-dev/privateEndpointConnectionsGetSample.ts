// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the storage account.
 *
 * @summary gets the specified private endpoint connection associated with the storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountGetPrivateEndpointConnection.json
 */
async function storageAccountGetPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "res6977",
    "sto2527",
    "{privateEndpointConnectionName}",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountGetPrivateEndpointConnection();
}

main().catch(console.error);
