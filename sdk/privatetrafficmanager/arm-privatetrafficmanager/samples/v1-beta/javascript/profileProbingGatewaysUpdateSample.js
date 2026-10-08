// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`.
 *
 * @summary updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`.
 * x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_Update_MaximumSet_Gen.json
 */
async function profileProbingGatewaysUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profileProbingGateways.update(
    "rgprivateTrafficManager",
    "myProfile",
    "myProbingGateway",
    {
      properties: {
        probingGatewayId:
          "/subscriptions/A1B2C3D4-E5F6-7890-ABCD-1234567890EF/resourceGroups/rgProbingInfra/providers/Microsoft.Network/probingGateways/pgw-westus-001",
      },
    },
  );
  console.log(result);
}

async function main() {
  await profileProbingGatewaysUpdateMaximumSet();
}

main().catch(console.error);
