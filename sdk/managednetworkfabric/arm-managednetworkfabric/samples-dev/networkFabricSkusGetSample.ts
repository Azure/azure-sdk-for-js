// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Implements Network Fabric SKU GET method.
 *
 * @summary Implements Network Fabric SKU GET method.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkFabricSkus_Get_MaximumSet_Gen.json
 */
async function networkFabricSkusGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const networkFabricSkuName = "example-fabricsku";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabricSkus.get(networkFabricSkuName);
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricSkusGetMaximumSetGen();
}

main().catch(console.error);
