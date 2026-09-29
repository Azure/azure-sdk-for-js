// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Topology Map.
 *
 * @summary gets a Topology Map.
 * x-ms-original-file: 2026-02-09-preview/TopologyMaps_Get_MaximumSet_Gen.json
 */
async function topologyMapsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.topologyMaps.get("rgprivateTrafficManager", "myTopologyMap");
  console.log(result);
}

async function main() {
  await topologyMapsGetMaximumSet();
}

main().catch(console.error);
