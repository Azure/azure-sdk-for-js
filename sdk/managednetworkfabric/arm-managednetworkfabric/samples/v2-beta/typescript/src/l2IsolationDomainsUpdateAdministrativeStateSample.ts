// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables isolation domain across the fabric or on specified racks.
 *
 * @summary enables isolation domain across the fabric or on specified racks.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_UpdateAdministrativeState.json
 */
async function l2IsolationDomainsUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l2IsolationDomains.updateAdministrativeState(
    "example-rg",
    "example-l2domain",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await l2IsolationDomainsUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
