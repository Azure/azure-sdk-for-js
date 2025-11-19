// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes layer 2 connectivity between compute nodes by managed by named L2 Isolation name.
 *
 * @summary deletes layer 2 connectivity between compute nodes by managed by named L2 Isolation name.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_Delete.json
 */
async function l2IsolationDomainsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.l2IsolationDomains.delete("example-rg", "example-l2domain");
}

async function main(): Promise<void> {
  await l2IsolationDomainsDeleteMaximumSetGen();
}

main().catch(console.error);
