// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the configured and effective security group rules on the specified VM.
 *
 * @summary gets the configured and effective security group rules on the specified VM.
 * x-ms-original-file: 2025-05-01/NetworkWatcherSecurityGroupViewGet.json
 */
async function getSecurityGroupView() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.getVMSecurityRules("rg1", "nw1", {
    targetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
  });
  console.log(result);
}

async function main() {
  await getSecurityGroupView();
}

main().catch(console.error);
