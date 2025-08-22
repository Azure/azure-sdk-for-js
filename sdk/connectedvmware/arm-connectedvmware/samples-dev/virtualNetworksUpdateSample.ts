// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to API to update certain properties of the virtual network resource.
 *
 * @summary API to update certain properties of the virtual network resource.
 * x-ms-original-file: specification/connectedvmware/resource-manager/Microsoft.ConnectedVMwarevSphere/stable/2023-10-01/examples/UpdateVirtualNetwork.json
 */

import type {
  ResourcePatch,
  VirtualNetworksUpdateOptionalParams,
} from "@azure/arm-connectedvmware";
import { AzureArcVMwareManagementServiceAPI } from "@azure/arm-connectedvmware";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateVirtualNetwork(): Promise<void> {
  const subscriptionId =
    process.env["CONNECTEDVMWARE_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["CONNECTEDVMWARE_RESOURCE_GROUP"] || "testrg";
  const virtualNetworkName = "ProdNetwork";
  const body: ResourcePatch = { tags: { tag1: "value1", tag2: "value2" } };
  const options: VirtualNetworksUpdateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new AzureArcVMwareManagementServiceAPI(credential, subscriptionId);
  const result = await client.virtualNetworks.update(
    resourceGroupName,
    virtualNetworkName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVirtualNetwork();
}

main().catch(console.error);
