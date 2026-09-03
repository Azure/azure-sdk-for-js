// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update InferenceEndpoint (asynchronous).
 *
 * @summary update InferenceEndpoint (asynchronous).
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceEndpoint/update.json
 */
async function updateWorkspaceInferenceEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.inferenceEndpoints.update(
    "test-rg",
    "my-aml-workspace",
    "string",
    "testEndpointName",
    { tags: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateWorkspaceInferenceEndpoint();
}

main().catch(console.error);
