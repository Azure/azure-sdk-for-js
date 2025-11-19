// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements L2 Isolation Domain GET method.
 *
 * @summary implements L2 Isolation Domain GET method.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_Get.json
 */
async function l2IsolationDomainsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l2IsolationDomains.get("example-rg", "example-l2domain");
  console.log(result);
}

async function main(): Promise<void> {
  await l2IsolationDomainsGetMaximumSetGen();
}

main().catch(console.error);
