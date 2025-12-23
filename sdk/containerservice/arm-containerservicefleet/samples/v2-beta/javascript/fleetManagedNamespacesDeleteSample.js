// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a FleetManagedNamespace
 *
 * @summary delete a FleetManagedNamespace
 * x-ms-original-file: 2025-08-01-preview/FleetManagedNamespaces_Delete.json
 */
async function fleetManagedNamespacesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.fleetManagedNamespaces.delete("rgfleets", "fleet1", "namespace1");
}

async function main() {
  await fleetManagedNamespacesDelete();
}

main().catch(console.error);
