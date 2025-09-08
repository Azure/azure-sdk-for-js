// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the specified container group profile in the specified subscription and resource group. The operation does not delete other resources provided by the user, such as volumes.
 *
 * @summary Delete the specified container group profile in the specified subscription and resource group. The operation does not delete other resources provided by the user, such as volumes.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupProfilesDelete.json
 */

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function containerGroupProfilesDelete(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupProfileName = "demo1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroupProfiles.delete(
    resourceGroupName,
    containerGroupProfileName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerGroupProfilesDelete();
}

main().catch(console.error);
