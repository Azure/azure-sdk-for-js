// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Completes the upgrade operation for the specified agent pool.
 *
 * @summary Completes the upgrade operation for the specified agent pool.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/AgentPoolsCompleteUpgrade.json
 */
async function completeAgentPoolUpgrade(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const agentPoolName = "agentpool1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.beginCompleteUpgradeAndWait(
    resourceGroupName,
    resourceName,
    agentPoolName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await completeAgentPoolUpgrade();
}

main().catch(console.error);
