// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Implements NetworkToNetworkInterconnects DELETE method.
 *
 * @summary Implements NetworkToNetworkInterconnects DELETE method.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkToNetworkInterconnects_Delete_MaximumSet_Gen.json
 */

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkToNetworkInterconnectsDeleteMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkFabricName = "example-fabric";
  const networkToNetworkInterconnectName = "example-nni";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkToNetworkInterconnects.beginDeleteAndWait(
    resourceGroupName,
    networkFabricName,
    networkToNetworkInterconnectName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkToNetworkInterconnectsDeleteMaximumSetGen();
}

main().catch(console.error);
