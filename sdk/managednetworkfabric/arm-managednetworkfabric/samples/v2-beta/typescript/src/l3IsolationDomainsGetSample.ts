// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves details of this L3 Isolation Domain.
 *
 * @summary retrieves details of this L3 Isolation Domain.
 * x-ms-original-file: 2024-06-15-preview/L3IsolationDomains_Get.json
 */
async function l3IsolationDomainsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l3IsolationDomains.get("example-rg", "example-l3domain");
  console.log(result);
}

async function main(): Promise<void> {
  await l3IsolationDomainsGetMaximumSetGen();
}

main().catch(console.error);
