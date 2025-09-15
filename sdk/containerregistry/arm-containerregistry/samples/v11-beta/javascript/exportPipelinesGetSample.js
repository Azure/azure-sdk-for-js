// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of the export pipeline.
 *
 * @summary gets the properties of the export pipeline.
 * x-ms-original-file: 2025-05-01-preview/ExportPipelineGet.json
 */
async function exportPipelineGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.exportPipelines.get(
    "myResourceGroup",
    "myRegistry",
    "myExportPipeline",
  );
  console.log(result);
}

async function main() {
  await exportPipelineGet();
}

main().catch(console.error);
