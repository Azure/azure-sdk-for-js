// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an export pipeline from a container registry.
 *
 * @summary deletes an export pipeline from a container registry.
 * x-ms-original-file: 2025-06-01-preview/ExportPipelineDelete.json
 */
async function exportPipelineDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.exportPipelines.delete("myResourceGroup", "myRegistry", "myExportPipeline");
}

async function main(): Promise<void> {
  await exportPipelineDelete();
}

main().catch(console.error);
