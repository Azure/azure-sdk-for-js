// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries status of flow log and traffic analytics (optional) on a specified resource.
 *
 * @summary queries status of flow log and traffic analytics (optional) on a specified resource.
 * x-ms-original-file: 2025-05-01/NetworkWatcherFlowLogStatusQuery.json
 */
async function getFlowLogStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.getFlowLogStatus("rg1", "nw1", {
    targetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityGroups/nsg1",
  });
  console.log(result);
}

async function main() {
  await getFlowLogStatus();
}

main().catch(console.error);
