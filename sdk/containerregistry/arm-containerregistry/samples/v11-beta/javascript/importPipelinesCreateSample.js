// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an import pipeline for a container registry with the specified parameters.
 *
 * @summary creates an import pipeline for a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/ImportPipelineCreate.json
 */
async function importPipelineCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.importPipelines.create(
    "myResourceGroup",
    "myRegistry",
    "myImportPipeline",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/f9d7ebed-adbd-4cb4-b973-aaf82c136138/resourcegroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity2":
            {},
        },
      },
      location: "westus",
      properties: {
        options: ["OverwriteTags", "DeleteSourceBlobOnSuccess", "ContinueOnErrors"],
        source: {
          type: "AzureStorageBlobContainer",
          keyVaultUri: "https://myvault.vault.azure.net/secrets/acrimportsas",
          uri: "https://accountname.blob.core.windows.net/containername",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await importPipelineCreate();
}

main().catch(console.error);
