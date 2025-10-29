// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an import pipeline from a container registry.
 *
 * @summary deletes an import pipeline from a container registry.
 * x-ms-original-file: 2025-06-01-preview/ImportPipelineDelete.json
 */
async function importPipelineDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.importPipelines.delete("myResourceGroup", "myRegistry", "myImportPipeline");
}

async function main() {
  await importPipelineDelete();
}

main().catch(console.error);
