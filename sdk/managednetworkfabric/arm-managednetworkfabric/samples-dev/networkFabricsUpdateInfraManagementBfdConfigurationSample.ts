// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the Infra Management BFD Configuration of the underlying resources in the given Network Fabric instance.
 *
 * @summary Updates the Infra Management BFD Configuration of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkFabrics_UpdateInfraManagementBfdConfiguration_MaximumSet_Gen.json
 */

import type { UpdateAdministrativeState } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkFabricsUpdateInfraManagementBfdConfigurationMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkFabricName = "example-fabric";
  const body: UpdateAdministrativeState = {
    resourceIds: [""],
    state: "Enable",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.beginUpdateInfraManagementBfdConfigurationAndWait(
    resourceGroupName,
    networkFabricName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsUpdateInfraManagementBfdConfigurationMaximumSetGen();
}

main().catch(console.error);
