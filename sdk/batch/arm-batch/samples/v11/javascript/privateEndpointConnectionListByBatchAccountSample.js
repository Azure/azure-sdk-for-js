// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the private endpoint connections in the specified account.
 *
 * @summary lists all of the private endpoint connections in the specified account.
 * x-ms-original-file: 2025-06-01/PrivateEndpointConnectionsList.json
 */
async function listPrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnection.listByBatchAccount(
    "default-azurebatch-japaneast",
    "sampleacct",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateEndpointConnections();
}

main().catch(console.error);
