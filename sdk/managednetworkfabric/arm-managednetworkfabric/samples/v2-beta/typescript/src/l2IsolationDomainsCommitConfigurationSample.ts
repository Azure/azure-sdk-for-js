// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to commits the configuration of the given resources.
 *
 * @summary commits the configuration of the given resources.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_CommitConfiguration.json
 */
async function l2IsolationDomainsCommitConfigurationMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l2IsolationDomains.commitConfiguration(
    "example-rg",
    "example-l2domain",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await l2IsolationDomainsCommitConfigurationMaximumSetGen();
}

main().catch(console.error);
