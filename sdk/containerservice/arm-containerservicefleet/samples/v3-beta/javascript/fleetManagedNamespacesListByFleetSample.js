// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list FleetManagedNamespace resources by Fleet
 *
 * @summary list FleetManagedNamespace resources by Fleet
 * x-ms-original-file: 2025-08-01-preview/FleetManagedNamespaces_ListByFleet.json
 */
async function fleetManagedNamespacesListByFleet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleetManagedNamespaces.listByFleet("rgfleets", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await fleetManagedNamespacesListByFleet();
}

main().catch(console.error);
