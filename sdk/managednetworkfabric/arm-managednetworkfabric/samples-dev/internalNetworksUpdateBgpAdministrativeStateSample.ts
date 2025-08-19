// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update BGP state for internalNetwork. Allowed only on edge devices.
 *
 * @summary Update BGP state for internalNetwork. Allowed only on edge devices.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/InternalNetworks_UpdateBgpAdministrativeState_MaximumSet_Gen.json
 */

import type { UpdateAdministrativeState } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function internalNetworksUpdateBgpAdministrativeStateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const l3IsolationDomainName = "example-l3domain";
  const internalNetworkName = "example-internalNetwork";
  const body: UpdateAdministrativeState = {
    resourceIds: [""],
    state: "Enable",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.internalNetworks.beginUpdateBgpAdministrativeStateAndWait(
    resourceGroupName,
    l3IsolationDomainName,
    internalNetworkName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internalNetworksUpdateBgpAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
