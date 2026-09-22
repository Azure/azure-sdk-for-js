// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the upload location for the user to be able to upload the source.
 *
 * @summary get the upload location for the user to be able to upload the source.
 * x-ms-original-file: 2025-03-01-preview/RegistriesGetBuildSourceUploadUrl.json
 */
async function registriesGetBuildSourceUploadUrl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.registries.getBuildSourceUploadUrl("myResourceGroup", "myRegistry");
  console.log(result);
}

async function main() {
  await registriesGetBuildSourceUploadUrl();
}

main().catch(console.error);
