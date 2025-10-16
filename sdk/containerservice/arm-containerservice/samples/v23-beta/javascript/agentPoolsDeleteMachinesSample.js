// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes specific machines in an agent pool.
 *
 * @summary Deletes specific machines in an agent pool.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/AgentPoolsDeleteMachines.json
 */
async function deleteSpecificMachinesInAnAgentPool() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const agentPoolName = "agentpool1";
  const machines = {
    machineNames: ["aks-nodepool1-42263519-vmss00000a", "aks-nodepool1-42263519-vmss00000b"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.beginDeleteMachinesAndWait(
    resourceGroupName,
    resourceName,
    agentPoolName,
    machines,
  );
  console.log(result);
}

async function main() {
  await deleteSpecificMachinesInAnAgentPool();
}

main().catch(console.error);
