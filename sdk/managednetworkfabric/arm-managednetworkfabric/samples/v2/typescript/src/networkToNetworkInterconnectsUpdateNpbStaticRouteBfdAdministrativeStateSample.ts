// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the NPB Static Route BFD Administrative State.
 *
 * @summary updates the NPB Static Route BFD Administrative State.
 * x-ms-original-file: 2025-07-15/NetworkToNetworkInterconnects_UpdateNpbStaticRouteBfdAdministrativeState.json
 */
async function networkToNetworkInterconnectsUpdateNpbStaticRouteBfdAdministrativeState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result =
    await client.networkToNetworkInterconnects.updateNpbStaticRouteBfdAdministrativeState(
      "example-rg",
      "example-fabric",
      "example-nni",
      { state: "Enable", resourceIds: [""] },
    );
  console.log(result);
}

async function main(): Promise<void> {
  await networkToNetworkInterconnectsUpdateNpbStaticRouteBfdAdministrativeState();
}

main().catch(console.error);
