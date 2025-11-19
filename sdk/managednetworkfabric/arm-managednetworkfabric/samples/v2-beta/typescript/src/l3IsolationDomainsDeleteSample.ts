// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes layer 3 connectivity between compute nodes by managed by named L3 Isolation name.
 *
 * @summary deletes layer 3 connectivity between compute nodes by managed by named L3 Isolation name.
 * x-ms-original-file: 2024-06-15-preview/L3IsolationDomains_Delete.json
 */
async function l3IsolationDomainsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.l3IsolationDomains.delete("example-rg", "example-l3domain");
}

async function main(): Promise<void> {
  await l3IsolationDomainsDeleteMaximumSetGen();
}

main().catch(console.error);
