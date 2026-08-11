// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the private endpoint connections associated with the storage account.
 *
 * @summary list all the private endpoint connections associated with the storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountListPrivateEndpointConnections.json
 */
async function storageAccountListPrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list("res6977", "sto2527")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storageAccountListPrivateEndpointConnections();
}

main().catch(console.error);
