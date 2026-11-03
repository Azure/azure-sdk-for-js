// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete  endpoint deployment resource by name
 *
 * @summary delete  endpoint deployment resource by name
 * x-ms-original-file: 2026-03-15-preview/Endpoint/Deployment/delete.json
 */
async function deleteEndpointDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.endpointDeployment.delete(
    "test-rg",
    "aml-workspace-name",
    "Azure.OpenAI",
    "testDeploymentName",
  );
}

async function main(): Promise<void> {
  await deleteEndpointDeployment();
}

main().catch(console.error);
