// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the administrative state of the L3 Isolation Domain resource.
 *
 * @summary updates the administrative state of the L3 Isolation Domain resource.
 * x-ms-original-file: 2025-07-15/L3IsolationDomains_UpdateAdministrativeState.json
 */
async function l3IsolationDomainsUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.l3IsolationDomains.updateAdministrativeState(
    "example-rg",
    "example-l3domain",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await l3IsolationDomainsUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
