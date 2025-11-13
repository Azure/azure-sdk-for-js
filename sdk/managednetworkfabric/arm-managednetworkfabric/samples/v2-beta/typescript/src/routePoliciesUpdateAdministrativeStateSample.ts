// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updated the admin state for this Route Policy.
 *
 * @summary updated the admin state for this Route Policy.
 * x-ms-original-file: 2024-06-15-preview/RoutePolicies_UpdateAdministrativeState.json
 */
async function routePoliciesUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.routePolicies.updateAdministrativeState(
    "example-rg",
    "example-routePolicy",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await routePoliciesUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
