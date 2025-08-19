// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the admin state of the Network Interface.
 *
 * @summary Update the admin state of the Network Interface.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkInterfaces_UpdateAdministrativeState_MaximumSet_Gen.json
 */

import type { UpdateAdministrativeState } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkInterfacesUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkDeviceName = "example-device";
  const networkInterfaceName = "example-interface";
  const body: UpdateAdministrativeState = {
    resourceIds: [""],
    state: "Enable",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkInterfaces.beginUpdateAdministrativeStateAndWait(
    resourceGroupName,
    networkDeviceName,
    networkInterfaceName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkInterfacesUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
