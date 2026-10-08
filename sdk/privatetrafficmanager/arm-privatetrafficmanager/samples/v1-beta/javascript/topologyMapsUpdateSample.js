// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Topology Map.
 *
 * @summary updates a Topology Map.
 * x-ms-original-file: 2026-02-09-preview/TopologyMaps_Update_MaximumSet_Gen.json
 */
async function topologyMapsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.topologyMaps.update("rgprivateTrafficManager", "myTopologyMap", {
    properties: { catchAllSiteName: "mySite" },
    tags: { environment: "staging" },
  });
  console.log(result);
}

async function main() {
  await topologyMapsUpdateMaximumSet();
}

main().catch(console.error);
