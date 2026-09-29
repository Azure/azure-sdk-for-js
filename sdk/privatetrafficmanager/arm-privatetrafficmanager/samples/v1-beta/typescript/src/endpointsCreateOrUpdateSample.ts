// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatetrafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Private Traffic Manager endpoint.
 *
 * @summary create or update a Private Traffic Manager endpoint.
 * x-ms-original-file: 2026-02-09-preview/Endpoints_CreateOrUpdate_MaximumSet_Gen.json
 */
async function endpointsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "rgprivateTrafficManager",
    "myProfile",
    "myEndpoint",
    {
      properties: {
        target: "10.0.0.1",
        monitoringTarget: "10.0.0.1",
        endpointStatus: "Enabled",
        kind: "Endpoint",
        weight: 100,
        priority: 10,
        alwaysServe: "Enabled",
        healthPolicyId:
          "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/privateTrafficManagerProfiles/myProfile/healthPolicies/myHealthPolicy",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
