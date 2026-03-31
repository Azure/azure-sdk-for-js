// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the current network topology by resource group.
 *
 * @summary gets the current network topology by resource group.
 * x-ms-original-file: 2025-05-01/NetworkWatcherTopologyGet.json
 */
async function getTopology() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.getTopology("rg1", "nw1", {
    targetResourceGroupName: "rg2",
  });
  console.log(result);
}

async function main() {
  await getTopology();
}

main().catch(console.error);
