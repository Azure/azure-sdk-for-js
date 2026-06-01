// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ClusterMeshProfile resources by Fleet
 *
 * @summary list ClusterMeshProfile resources by Fleet
 * x-ms-original-file: 2026-03-02-preview/ClusterMeshProfiles_ListByFleet.json
 */
async function listTheClusterMeshProfileResourcesByFleet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusterMeshProfiles.listByFleet("rgfleets", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheClusterMeshProfileResourcesByFleet();
}

main().catch(console.error);
