// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about an available Service Fabric cluster code version.
 *
 * @summary gets information about an available Service Fabric cluster code version.
 * x-ms-original-file: 2026-03-01-preview/ClusterVersionsGet_example.json
 */
async function getClusterVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusterVersions.get("eastus", "6.1.480.9494");
  console.log(result);
}

async function main() {
  await getClusterVersion();
}

main().catch(console.error);
