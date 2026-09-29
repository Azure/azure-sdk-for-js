// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Private Traffic Manager profile.
 *
 * @summary create or update a Private Traffic Manager profile.
 * x-ms-original-file: 2026-02-09-preview/Profiles_CreateOrUpdate_MaximumSet_Gen.json
 */
async function profilesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.profiles.createOrUpdate("rgprivateTrafficManager", "myProfile", {
    properties: {
      customTopologyMapMode: "Disabled",
      dnsConfig: { recordType: "A", ttl: 10 },
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
          name: "eelctkkre",
        },
      ],
    },
    tags: { environment: "production" },
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await profilesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
