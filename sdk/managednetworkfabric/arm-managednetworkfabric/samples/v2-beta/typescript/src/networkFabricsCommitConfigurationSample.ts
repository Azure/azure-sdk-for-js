// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to atomic update of the given Network Fabric instance. Sync update of NFA resources at Fabric level.
 *
 * @summary atomic update of the given Network Fabric instance. Sync update of NFA resources at Fabric level.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_CommitConfiguration.json
 */
async function networkFabricsCommitConfigurationMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabrics.commitConfiguration(
    "example-rg",
    "example-networkFabric",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsCommitConfigurationMaximumSetGen();
}

main().catch(console.error);
