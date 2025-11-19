// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes layer 3 connectivity between compute nodes by managed by named L3 Isolation name.
 *
 * @summary deletes layer 3 connectivity between compute nodes by managed by named L3 Isolation name.
 * x-ms-original-file: 2024-06-15-preview/L3IsolationDomains_Delete.json
 */
async function l3IsolationDomainsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.l3IsolationDomains.delete("example-rg", "example-l3domain");
}

async function main() {
  await l3IsolationDomainsDeleteMaximumSetGen();
}

main().catch(console.error);
