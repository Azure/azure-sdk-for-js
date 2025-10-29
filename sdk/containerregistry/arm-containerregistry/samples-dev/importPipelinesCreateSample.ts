// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an import pipeline for a container registry with the specified parameters.
 *
 * @summary creates an import pipeline for a container registry with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ImportPipelineCreate.json
 */
async function importPipelineCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.importPipelines.create(
    "myResourceGroup",
    "myRegistry",
    "myImportPipeline",
    {
      location: "westus",
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/f9d7ebed-adbd-4cb4-b973-aaf82c136138/resourcegroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity2":
            {},
        },
      },
      properties: {
        source: {
          type: "AzureStorageBlobContainer",
          uri: "https://accountname.blob.core.windows.net/containername",
          keyVaultUri: "https://myvault.vault.azure.net/secrets/acrimportsas",
          storageAccessMode: "SasToken",
        },
        options: ["OverwriteTags", "DeleteSourceBlobOnSuccess", "ContinueOnErrors"],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await importPipelineCreate();
}

main().catch(console.error);
