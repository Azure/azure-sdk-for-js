// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a stopped ContainerInstance compute resource.
 * This is a long-running operation that returns 202 Accepted.
 * Only applicable when computeType is ContainerInstance.
 *
 * @summary starts a stopped ContainerInstance compute resource.
 * This is a long-running operation that returns 202 Accepted.
 * Only applicable when computeType is ContainerInstance.
 * x-ms-original-file: 2026-05-15-preview/StartContainerInstanceCompute.json
 */
async function startContainerInstanceCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.computes.start("rgcognitiveservices", "myAccount", "myContainerInstance");
}

async function main() {
  await startContainerInstanceCompute();
}

main().catch(console.error);
