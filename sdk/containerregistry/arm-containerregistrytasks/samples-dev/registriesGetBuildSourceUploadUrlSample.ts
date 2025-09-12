// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the upload location for the user to be able to upload the source.
 *
 * @summary Get the upload location for the user to be able to upload the source.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/RegistryTasks/preview/2025-03-01-preview/examples/RegistriesGetBuildSourceUploadUrl.json
 */
async function registriesGetBuildSourceUploadUrl(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryTasksManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.registries.getBuildSourceUploadUrl(
    resourceGroupName,
    registryName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await registriesGetBuildSourceUploadUrl();
}

main().catch(console.error);
