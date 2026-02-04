// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific machines in an agent pool.
 *
 * @summary deletes specific machines in an agent pool.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsDeleteMachines.json
 */
async function deleteSpecificMachinesInAnAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.agentPools.deleteMachines("rg1", "clustername1", "agentpool1", {
    machineNames: ["aks-nodepool1-42263519-vmss00000a", "aks-nodepool1-42263519-vmss00000b"],
  });
}

async function main() {
  await deleteSpecificMachinesInAnAgentPool();
}

main().catch(console.error);
