// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an export pipeline for a container registry with the specified parameters.
 *
 * @summary creates an export pipeline for a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/ExportPipelineCreate.json
 */
async function exportPipelineCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.exportPipelines.create(
    "myResourceGroup",
    "myRegistry",
    "myExportPipeline",
    {
      identity: { type: "SystemAssigned" },
      location: "westus",
      properties: {
        options: ["OverwriteBlobs"],
        target: {
          type: "AzureStorageBlobContainer",
          keyVaultUri: "https://myvault.vault.azure.net/secrets/acrexportsas",
          uri: "https://accountname.blob.core.windows.net/containername",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await exportPipelineCreate();
}

main().catch(console.error);
