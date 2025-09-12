// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the detailed information for a given pipeline run.
 *
 * @summary Gets the detailed information for a given pipeline run.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2025-05-01-preview/examples/PipelineRunGet.json
 */
async function pipelineRunGet(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const pipelineRunName = "myPipelineRun";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.pipelineRuns.get(
    resourceGroupName,
    registryName,
    pipelineRunName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await pipelineRunGet();
}

main().catch(console.error);
