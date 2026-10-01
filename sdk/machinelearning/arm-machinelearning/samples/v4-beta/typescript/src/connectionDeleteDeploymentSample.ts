// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Azure OpenAI connection deployment resource by name
 *
 * @summary delete Azure OpenAI connection deployment resource by name
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/deleteDeployment.json
 */
async function deleteAzureOpenAIConnectionDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.connection.deleteDeployment(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
    "testDeploymentName",
  );
}

async function main(): Promise<void> {
  await deleteAzureOpenAIConnectionDeployment();
}

main().catch(console.error);
