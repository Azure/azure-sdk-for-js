// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Inference Endpoints.
 *
 * @summary list Inference Endpoints.
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceEndpoint/list.json
 */
async function listWorkspaceInferenceEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.inferenceEndpoints.list("test-rg", "my-aml-workspace", "string", {
    count: 1,
    tags: "string",
    properties: "string",
    orderBy: "CreatedAtAsc",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceInferenceEndpoint();
}

main().catch(console.error);
