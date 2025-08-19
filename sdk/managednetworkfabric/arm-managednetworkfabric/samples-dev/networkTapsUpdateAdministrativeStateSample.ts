// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Implements the operation to the underlying resources.
 *
 * @summary Implements the operation to the underlying resources.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkTaps_UpdateAdministrativeState_MaximumSet_Gen.json
 */

import type { UpdateAdministrativeState } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkTapsUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkTapName = "example-networkTap";
  const body: UpdateAdministrativeState = {
    resourceIds: [""],
    state: "Enable",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkTaps.beginUpdateAdministrativeStateAndWait(
    resourceGroupName,
    networkTapName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkTapsUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
