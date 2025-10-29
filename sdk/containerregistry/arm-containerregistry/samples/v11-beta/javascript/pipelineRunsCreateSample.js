// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a pipeline run for a container registry with the specified parameters
 *
 * @summary creates a pipeline run for a container registry with the specified parameters
 * x-ms-original-file: 2025-06-01-preview/PipelineRunCreate_Export.json
 */
async function pipelineRunCreateExport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.pipelineRuns.create(
    "myResourceGroup",
    "myRegistry",
    "myPipelineRun",
    {
      properties: {
        request: {
          pipelineResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/exportPipelines/myExportPipeline",
          target: { type: "AzureStorageBlob", name: "myblob.tar.gz" },
          artifacts: [
            "sourceRepository/hello-world",
            "sourceRepository2@sha256:00000000000000000000000000000000000",
          ],
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a pipeline run for a container registry with the specified parameters
 *
 * @summary creates a pipeline run for a container registry with the specified parameters
 * x-ms-original-file: 2025-06-01-preview/PipelineRunCreate_Import.json
 */
async function pipelineRunCreateImport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.pipelineRuns.create(
    "myResourceGroup",
    "myRegistry",
    "myPipelineRun",
    {
      properties: {
        request: {
          pipelineResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/importPipelines/myImportPipeline",
          source: { type: "AzureStorageBlob", name: "myblob.tar.gz" },
          catalogDigest: "sha256@",
        },
        forceUpdateTag: "2020-03-04T17:23:21.9261521+00:00",
      },
    },
  );
  console.log(result);
}

async function main() {
  await pipelineRunCreateExport();
  await pipelineRunCreateImport();
}

main().catch(console.error);
