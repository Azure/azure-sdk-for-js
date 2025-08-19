// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Atomic update of the given Network Fabric instance. Sync update of NFA resources at Fabric level.
 *
 * @summary Atomic update of the given Network Fabric instance. Sync update of NFA resources at Fabric level.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkFabrics_CommitConfiguration_MaximumSet_Gen.json
 */
async function networkFabricsCommitConfigurationMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkFabricName = "example-fabric";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.beginCommitConfigurationAndWait(
    resourceGroupName,
    networkFabricName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsCommitConfigurationMaximumSetGen();
}

main().catch(console.error);
