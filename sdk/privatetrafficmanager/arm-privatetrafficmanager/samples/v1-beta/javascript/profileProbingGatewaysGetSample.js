// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a probing gateway associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`.
 *
 * @summary gets a probing gateway associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`.
 * x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_Get_MaximumSet_Gen.json
 */
async function profileProbingGatewaysGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profileProbingGateways.get(
    "rgprivateTrafficManager",
    "myProfile",
    "myProbingGateway",
  );
  console.log(result);
}

async function main() {
  await profileProbingGatewaysGetMaximumSet();
}

main().catch(console.error);
