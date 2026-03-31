// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to initiate troubleshooting on a specified resource.
 *
 * @summary initiate troubleshooting on a specified resource.
 * x-ms-original-file: 2025-05-01/NetworkWatcherTroubleshootGet.json
 */
async function getTroubleshooting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.getTroubleshooting("rg1", "nw1", {
    storageId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/st1",
    storagePath: "https://st1.blob.core.windows.net/cn1",
    targetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
  });
  console.log(result);
}

async function main() {
  await getTroubleshooting();
}

main().catch(console.error);
