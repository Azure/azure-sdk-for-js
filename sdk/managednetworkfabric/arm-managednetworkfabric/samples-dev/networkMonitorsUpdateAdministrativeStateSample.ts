// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables isolation domain across the fabric or on specified racks.
 *
 * @summary enables isolation domain across the fabric or on specified racks.
 * x-ms-original-file: 2024-06-15-preview/NetworkMonitors_UpdateAdministrativeState.json
 */
async function networkMonitorsUpdateAdministrativeState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkMonitors.updateAdministrativeState(
    "example-rg",
    "example-monitor",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkMonitorsUpdateAdministrativeState();
}

main().catch(console.error);
