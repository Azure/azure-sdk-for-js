// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the last completed troubleshooting result on a specified resource.
 *
 * @summary get the last completed troubleshooting result on a specified resource.
 * x-ms-original-file: 2025-05-01/NetworkWatcherTroubleshootResultQuery.json
 */
async function getTroubleshootResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.getTroubleshootingResult("rg1", "nw1", {
    targetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
  });
  console.log(result);
}

async function main() {
  await getTroubleshootResult();
}

main().catch(console.error);
