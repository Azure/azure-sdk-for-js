// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a FleetManagedNamespace
 *
 * @summary get a FleetManagedNamespace
 * x-ms-original-file: 2025-08-01-preview/FleetManagedNamespaces_Get.json
 */
async function fleetManagedNamespacesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetManagedNamespaces.get("rgfleets", "fleet1", "namespace1");
  console.log(result);
}

async function main(): Promise<void> {
  await fleetManagedNamespacesGet();
}

main().catch(console.error);
