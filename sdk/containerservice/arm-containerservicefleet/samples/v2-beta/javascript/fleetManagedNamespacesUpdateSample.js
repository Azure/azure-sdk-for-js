// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a FleetManagedNamespace
 *
 * @summary update a FleetManagedNamespace
 * x-ms-original-file: 2026-06-02-preview/FleetManagedNamespaces_Update.json
 */
async function fleetManagedNamespacesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetManagedNamespaces.update("rgfleets", "fleet1", "namespace1", {
    properties: {
      propagationPolicy: {
        placementProfile: {
          defaultClusterResourcePlacement: {
            rolloutStrategy: {
              type: "External",
              clusterUpdateStrategy: { name: "my-staged-update-strategy" },
            },
          },
        },
      },
    },
    tags: { tag2: "tagValue2" },
  });
  console.log(result);
}

async function main() {
  await fleetManagedNamespacesUpdate();
}

main().catch(console.error);
