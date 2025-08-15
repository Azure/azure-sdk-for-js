// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkInterface } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a Network Interface resource.
 *
 * @summary Create a Network Interface resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkInterfaces_Create_MaximumSet_Gen.json
 */
async function networkInterfacesCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkDeviceName = "example-device";
  const networkInterfaceName = "example-interface";
  const body: NetworkInterface = { annotation: "annotation" };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkInterfaces.beginCreateAndWait(
    resourceGroupName,
    networkDeviceName,
    networkInterfaceName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkInterfacesCreateMaximumSetGen();
}

main().catch(console.error);
