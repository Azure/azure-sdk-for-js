// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific machine in the specified agent pool.
 *
 * @summary get a specific machine in the specified agent pool.
 * x-ms-original-file: 2025-10-02-preview/MachineGet.json
 */
async function getAMachineInAnAgentPoolsByManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.machines.get(
    "rg1",
    "clustername1",
    "agentpool1",
    "aks-nodepool1-42263519-vmss00000t",
  );
  console.log(result);
}

async function main() {
  await getAMachineInAnAgentPoolsByManagedCluster();
}

main().catch(console.error);
