// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the Network Interface resource.
 *
 * @summary Delete the Network Interface resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkInterfaces_Delete_MaximumSet_Gen.json
 */

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkInterfacesDeleteMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "94D0FD57-C08B-4CA3-A926-6B76D8B7B956";
  const resourceGroupName =
    process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "rgNetworkDevices";
  const networkDeviceName = "sjzd";
  const networkInterfaceName = "emrgu";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkInterfaces.beginDeleteAndWait(
    resourceGroupName,
    networkDeviceName,
    networkInterfaceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkInterfacesDeleteMaximumSetGen();
}

main().catch(console.error);
