// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the network dependencies for this container group to allow complete control of network setting and configuration. For container groups, this will always be an empty list.
 *
 * @summary gets all the network dependencies for this container group to allow complete control of network setting and configuration. For container groups, this will always be an empty list.
 * x-ms-original-file: 2026-07-01/ContainerGroupsGetOutboundNetworkDependenciesEndpoints.json
 */
async function containerGroupsGetOutboundNetworkDependenciesEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.getOutboundNetworkDependenciesEndpoints(
    "demo",
    "demo-cg",
  );
  console.log(result);
}

async function main() {
  await containerGroupsGetOutboundNetworkDependenciesEndpoints();
}

main().catch(console.error);
