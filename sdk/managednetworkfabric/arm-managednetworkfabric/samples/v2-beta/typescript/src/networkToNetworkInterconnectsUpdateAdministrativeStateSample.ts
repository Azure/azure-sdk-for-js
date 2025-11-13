// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Admin State.
 *
 * @summary updates the Admin State.
 * x-ms-original-file: 2024-06-15-preview/NetworkToNetworkInterconnects_UpdateAdministrativeState.json
 */
async function networkToNetworkInterconnectsUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkToNetworkInterconnects.updateAdministrativeState(
    "example-rg",
    "example-nf",
    "example-nni",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkToNetworkInterconnectsUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
