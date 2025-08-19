// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a list of container group profiles in a specified subscription and resource group. This operation returns properties of each container group profile including containers, image registry credentials, restart policy, IP address type, OS type volumes, current revision number, etc.
 *
 * @summary Get a list of container group profiles in a specified subscription and resource group. This operation returns properties of each container group profile including containers, image registry credentials, restart policy, IP address type, OS type volumes, current revision number, etc.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupProfilesListByResourceGroup.json
 */
async function containerGroupProfilesListByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerGroupProfiles.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await containerGroupProfilesListByResourceGroup();
}

main().catch(console.error);
