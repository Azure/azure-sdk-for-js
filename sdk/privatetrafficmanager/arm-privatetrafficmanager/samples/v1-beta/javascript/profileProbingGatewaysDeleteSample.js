// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a probing gateway association from a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`.
 *
 * @summary deletes a probing gateway association from a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`.
 * x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_Delete_MaximumSet_Gen.json
 */
async function profileProbingGatewaysDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  await client.profileProbingGateways.delete(
    "rgprivateTrafficManager",
    "myProfile",
    "myProbingGateway",
  );
}

async function main() {
  await profileProbingGatewaysDeleteMaximumSet();
}

main().catch(console.error);
