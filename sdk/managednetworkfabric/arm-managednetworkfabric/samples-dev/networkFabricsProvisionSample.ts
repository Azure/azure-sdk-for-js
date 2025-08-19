// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Provisions the underlying resources in the given Network Fabric instance.
 *
 * @summary Provisions the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkFabrics_provision_MaximumSet_Gen.json
 */

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkFabricsProvisionMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkFabricName = "example-fabric";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.beginProvisionAndWait(
    resourceGroupName,
    networkFabricName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsProvisionMaximumSetGen();
}

main().catch(console.error);
