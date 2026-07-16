// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts a running ContainerInstance compute resource.
 * This is a long-running operation that returns 202 Accepted.
 * Only applicable when computeType is ContainerInstance.
 *
 * @summary restarts a running ContainerInstance compute resource.
 * This is a long-running operation that returns 202 Accepted.
 * Only applicable when computeType is ContainerInstance.
 * x-ms-original-file: 2026-05-15-preview/RestartContainerInstanceCompute.json
 */
async function restartContainerInstanceCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.computes.restart("rgcognitiveservices", "myAccount", "myContainerInstance");
}

async function main(): Promise<void> {
  await restartContainerInstanceCompute();
}

main().catch(console.error);
