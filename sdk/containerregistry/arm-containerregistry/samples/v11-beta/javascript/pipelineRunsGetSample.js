// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the detailed information for a given pipeline run.
 *
 * @summary gets the detailed information for a given pipeline run.
 * x-ms-original-file: 2025-06-01-preview/PipelineRunGet.json
 */
async function pipelineRunGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.pipelineRuns.get("myResourceGroup", "myRegistry", "myPipelineRun");
  console.log(result);
}

async function main() {
  await pipelineRunGet();
}

main().catch(console.error);
