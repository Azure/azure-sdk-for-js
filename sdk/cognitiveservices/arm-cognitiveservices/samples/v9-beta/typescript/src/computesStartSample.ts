// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a stopped ContainerInstance compute resource.
 * This is a long-running operation that returns 202 Accepted.
 * Only applicable when computeType is ContainerInstance.
 *
 * @summary starts a stopped ContainerInstance compute resource.
 * This is a long-running operation that returns 202 Accepted.
 * Only applicable when computeType is ContainerInstance.
 * x-ms-original-file: 2026-03-15-preview/StartContainerInstanceCompute.json
 */
async function startContainerInstanceCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.computes.start("rgcognitiveservices", "myAccount", "myContainerInstance");
}

async function main(): Promise<void> {
  await startContainerInstanceCompute();
}

main().catch(console.error);
