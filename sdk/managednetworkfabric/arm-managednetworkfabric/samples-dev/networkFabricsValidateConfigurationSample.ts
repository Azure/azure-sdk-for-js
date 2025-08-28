// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validates the configuration of the underlying resources in the given Network Fabric instance.
 *
 * @summary Validates the configuration of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkFabrics_ValidateConfiguration_MaximumSet_Gen.json
 */

import type { ValidateConfigurationProperties } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkFabricsValidateConfigurationMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkFabricName = "example-fabric";
  const body: ValidateConfigurationProperties = { validateAction: "Cabling" };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.beginValidateConfigurationAndWait(
    resourceGroupName,
    networkFabricName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsValidateConfigurationMaximumSetGen();
}

main().catch(console.error);
