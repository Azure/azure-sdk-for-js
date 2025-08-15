// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureLargeInstanceTagsUpdate } from "@azure/arm-largeinstance";
import { LargeInstanceManagementClient } from "@azure/arm-largeinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patches the Tags field of an Azure Large Instance for the specified
subscription, resource group, and instance name.
 *
 * @summary Patches the Tags field of an Azure Large Instance for the specified
subscription, resource group, and instance name.
 * x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_PatchTags_Delete.json
 */
async function azureLargeInstanceDeleteTag(): Promise<void> {
  const subscriptionId =
    process.env["LARGEINSTANCE_SUBSCRIPTION_ID"] || "f0f4887f-d13c-4943-a8ba-d7da28d2a3fd";
  const resourceGroupName = process.env["LARGEINSTANCE_RESOURCE_GROUP"] || "myResourceGroup";
  const azureLargeInstanceName = "myALInstance";
  const tagsParameter: AzureLargeInstanceTagsUpdate = { tags: {} };
  const credential = new DefaultAzureCredential();
  const client = new LargeInstanceManagementClient(credential, subscriptionId);
  const result = await client.azureLargeInstanceOperations.update(
    resourceGroupName,
    azureLargeInstanceName,
    tagsParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Patches the Tags field of an Azure Large Instance for the specified
subscription, resource group, and instance name.
 *
 * @summary Patches the Tags field of an Azure Large Instance for the specified
subscription, resource group, and instance name.
 * x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_PatchTags.json
 */
async function azureLargeInstanceUpdateTag(): Promise<void> {
  const subscriptionId =
    process.env["LARGEINSTANCE_SUBSCRIPTION_ID"] || "f0f4887f-d13c-4943-a8ba-d7da28d2a3fd";
  const resourceGroupName = process.env["LARGEINSTANCE_RESOURCE_GROUP"] || "myResourceGroup";
  const azureLargeInstanceName = "myALInstance";
  const tagsParameter: AzureLargeInstanceTagsUpdate = {
    tags: { testkey: "testvalue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new LargeInstanceManagementClient(credential, subscriptionId);
  const result = await client.azureLargeInstanceOperations.update(
    resourceGroupName,
    azureLargeInstanceName,
    tagsParameter,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureLargeInstanceDeleteTag();
  await azureLargeInstanceUpdateTag();
}

main().catch(console.error);
