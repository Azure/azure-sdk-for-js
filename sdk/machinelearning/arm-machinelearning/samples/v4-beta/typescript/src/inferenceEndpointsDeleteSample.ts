// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete InferenceEndpoint (asynchronous).
 *
 * @summary delete InferenceEndpoint (asynchronous).
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceEndpoint/delete.json
 */
async function deleteWorkspaceInferenceEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.inferenceEndpoints.delete(
    "test-rg",
    "my-aml-workspace",
    "string",
    "testEndpointName",
  );
}

async function main(): Promise<void> {
  await deleteWorkspaceInferenceEndpoint();
}

main().catch(console.error);
