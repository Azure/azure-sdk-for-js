// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete container group virtual network association links. The operation does not delete other resources provided by the user.
 *
 * @summary Delete container group virtual network association links. The operation does not delete other resources provided by the user.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/SubnetServiceAssociationLinkDelete.json
 */
async function subnetServiceAssociationLinkDelete(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const virtualNetworkName = "demo2";
  const subnetName = "demo3";
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.subnetServiceAssociationLink.beginDeleteAndWait(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await subnetServiceAssociationLinkDelete();
}

main().catch(console.error);
