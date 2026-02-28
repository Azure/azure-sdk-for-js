// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade
 *
 * @summary upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsUpgradeNodeImageVersion.json
 */
async function upgradeAgentPoolNodeImageVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.agentPools.upgradeNodeImageVersion("rg1", "clustername1", "agentpool1");
}

async function main() {
  await upgradeAgentPoolNodeImageVersion();
}

main().catch(console.error);
