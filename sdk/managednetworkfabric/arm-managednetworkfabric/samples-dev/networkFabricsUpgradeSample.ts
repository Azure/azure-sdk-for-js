// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Upgrades the version of the underlying resources in the given Network Fabric instance.
 *
 * @summary Upgrades the version of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkFabrics_upgrade_MaximumSet_Gen.json
 */

import type { UpdateVersion } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkFabricsUpgradeMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkFabricName = "example-fabric";
  const body: UpdateVersion = { version: "version1" };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.beginUpgradeAndWait(
    resourceGroupName,
    networkFabricName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsUpgradeMaximumSetGen();
}

main().catch(console.error);
