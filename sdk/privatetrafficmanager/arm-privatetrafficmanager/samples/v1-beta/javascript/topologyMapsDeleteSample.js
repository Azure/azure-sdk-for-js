// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Topology Map.
 *
 * @summary deletes a Topology Map.
 * x-ms-original-file: 2026-02-09-preview/TopologyMaps_Delete_MaximumSet_Gen.json
 */
async function topologyMapsDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  await client.topologyMaps.delete("rgprivateTrafficManager", "myTopologyMap");
}

async function main() {
  await topologyMapsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
