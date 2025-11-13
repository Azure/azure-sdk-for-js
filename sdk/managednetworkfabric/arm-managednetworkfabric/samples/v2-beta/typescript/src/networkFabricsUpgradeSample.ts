// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrades the version of the underlying resources in the given Network Fabric instance.
 *
 * @summary upgrades the version of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_Upgrade.json
 */
async function networkFabricsUpgradeMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabrics.upgrade("example-rg", "example-fabric", {
    version: "3.x.x",
    action: "Start",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsUpgradeMaximumSetGen();
}

main().catch(console.error);
