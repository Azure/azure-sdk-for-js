// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to see [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle.
 *
 * @summary see [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsGetAgentPoolAvailableVersions.json
 */
async function getAvailableVersionsForAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.getAvailableAgentPoolVersions("rg1", "clustername1");
  console.log(result);
}

async function main() {
  await getAvailableVersionsForAgentPool();
}

main().catch(console.error);
