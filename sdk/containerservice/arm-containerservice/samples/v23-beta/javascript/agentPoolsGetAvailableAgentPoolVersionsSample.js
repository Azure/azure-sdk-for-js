// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to See [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle.
 *
 * @summary See [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/AgentPoolsGetAgentPoolAvailableVersions.json
 */
async function getAvailableVersionsForAgentPool() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.getAvailableAgentPoolVersions(
    resourceGroupName,
    resourceName,
  );
  console.log(result);
}

async function main() {
  await getAvailableVersionsForAgentPool();
}

main().catch(console.error);
