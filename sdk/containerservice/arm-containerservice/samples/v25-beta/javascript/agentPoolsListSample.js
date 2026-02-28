// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of agent pools in the specified managed cluster.
 *
 * @summary gets a list of agent pools in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsList.json
 */
async function listAgentPoolsByManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agentPools.list("rg1", "clustername1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAgentPoolsByManagedCluster();
}

main().catch(console.error);
