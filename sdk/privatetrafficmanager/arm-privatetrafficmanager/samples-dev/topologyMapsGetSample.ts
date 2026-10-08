// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateTrafficManagerManagementClient } from "@azure/arm-privatetrafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Topology Map.
 *
 * @summary gets a Topology Map.
 * x-ms-original-file: 2026-02-09-preview/TopologyMaps_Get_MaximumSet_Gen.json
 */
async function topologyMapsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.topologyMaps.get("rgprivateTrafficManager", "myTopologyMap");
  console.log(result);
}

async function main(): Promise<void> {
  await topologyMapsGetMaximumSet();
}

main().catch(console.error);
