// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Private Traffic Manager endpoint.
 *
 * @summary updates a Private Traffic Manager endpoint.
 * x-ms-original-file: 2026-02-09-preview/Endpoints_Update_MaximumSet_Gen.json
 */
async function endpointsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "rgprivateTrafficManager",
    "myProfile",
    "myEndpoint",
    {
      properties: {
        target: "10.0.0.2",
        monitoringTarget: "10.0.0.2",
        endpointStatus: "Enabled",
        weight: 150,
        priority: 5,
        alwaysServe: "Disabled",
        healthPolicyId:
          "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/privateTrafficManagerProfiles/myProfile/healthPolicies/myHealthPolicy",
      },
    },
  );
  console.log(result);
}

async function main() {
  await endpointsUpdateMaximumSet();
}

main().catch(console.error);
