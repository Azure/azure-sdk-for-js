// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster. The operation returns properties of each egress endpoint.
 *
 * @summary gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster. The operation returns properties of each egress endpoint.
 * x-ms-original-file: 2025-10-02-preview/OutboundNetworkDependenciesEndpointsList.json
 */
async function listOutboundNetworkDependenciesEndpointsByManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listOutboundNetworkDependenciesEndpoints(
    "rg1",
    "clustername1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOutboundNetworkDependenciesEndpointsByManagedCluster();
}

main().catch(console.error);
