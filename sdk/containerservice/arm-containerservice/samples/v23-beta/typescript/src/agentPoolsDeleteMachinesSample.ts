// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentPoolDeleteMachinesParameter} from "@azure/arm-containerservice";
import {
  ContainerServiceClient,
} from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes specific machines in an agent pool.
 *
 * @summary Deletes specific machines in an agent pool.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/AgentPoolsDeleteMachines.json
 */
async function deleteSpecificMachinesInAnAgentPool(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const agentPoolName = "agentpool1";
  const machines: AgentPoolDeleteMachinesParameter = {
    machineNames: [
      "aks-nodepool1-42263519-vmss00000a",
      "aks-nodepool1-42263519-vmss00000b",
    ],
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

async function main(): Promise<void> {
  await deleteSpecificMachinesInAnAgentPool();
}

main().catch(console.error);
