// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of the import pipeline.
 *
 * @summary gets the properties of the import pipeline.
 * x-ms-original-file: 2025-05-01-preview/ImportPipelineGet.json
 */
async function importPipelineGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.importPipelines.get(
    "myResourceGroup",
    "myRegistry",
    "myImportPipeline",
  );
  console.log(result);
}

async function main() {
  await importPipelineGet();
}

main().catch(console.error);
