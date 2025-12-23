// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the upgrade profile for an agent pool.
 *
 * @summary Gets the upgrade profile for an agent pool.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2025-10-01/examples/AgentPoolsGetUpgradeProfile.json
 */
async function getUpgradeProfileForAgentPool() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const agentPoolName = "agentpool1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.getUpgradeProfile(
    resourceGroupName,
    resourceName,
    agentPoolName,
  );
  console.log(result);
}

async function main() {
  await getUpgradeProfileForAgentPool();
}

main().catch(console.error);
