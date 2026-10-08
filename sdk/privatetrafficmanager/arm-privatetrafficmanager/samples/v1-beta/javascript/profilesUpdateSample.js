// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Traffic Manager profile.
 *
 * @summary updates a Traffic Manager profile.
 * x-ms-original-file: 2026-02-09-preview/Profiles_Update_MaximumSet_Gen.json
 */
async function profilesUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.update("rgprivateTrafficManager", "myProfile", {
    properties: {
      customTopologyMapMode: "Disabled",
      dnsConfig: { recordType: "A", ttl: 30 },
      topologyMapId:
        "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/topologyMaps/myTopologyMap",
      profileStatus: "Enabled",
      trafficRoutingMethod: "Priority",
      endpoints: [
        {
          target: "10.0.0.1",
          monitoringTarget: "10.0.0.1",
          endpointStatus: "Enabled",
          kind: "Endpoint",
          weight: 100,
          priority: 10,
          alwaysServe: "Enabled",
          healthPolicyId:
            "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/privateTrafficManagerProfiles/myProfile/healthPolicies/myHealthPolicy",
          name: "kbxbzdqlpxpwhdekpfudgyvchk",
        },
      ],
    },
    tags: { environment: "staging" },
  });
  console.log(result);
}

async function main() {
  await profilesUpdateMaximumSet();
}

main().catch(console.error);
