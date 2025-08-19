// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UpdateDeviceAdministrativeState } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the Administrative state of the Network Device.
 *
 * @summary Updates the Administrative state of the Network Device.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkDevices_UpdateAdministrativeState_MaximumSet_Gen.json
 */
async function networkDevicesUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkDeviceName = "example-device";
  const body: UpdateDeviceAdministrativeState = {
    resourceIds: [""],
    state: "RMA",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDevices.beginUpdateAdministrativeStateAndWait(
    resourceGroupName,
    networkDeviceName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkDevicesUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
