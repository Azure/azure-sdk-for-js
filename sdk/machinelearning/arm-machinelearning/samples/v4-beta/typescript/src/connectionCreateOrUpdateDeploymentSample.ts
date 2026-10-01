// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Azure OpenAI connection deployment resource with the specified parameters
 *
 * @summary create or update Azure OpenAI connection deployment resource with the specified parameters
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/createDeployment.json
 */
async function createAzureOpenAIConnectionDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.connection.createOrUpdateDeployment(
    "resourceGroup-1",
    "testworkspace",
    "testConnection",
    "text-davinci-003",
    {
      properties: {
        type: "Azure.OpenAI",
        model: { name: "text-davinci-003", format: "OpenAI", version: "1" },
        versionUpgradeOption: "OnceNewDefaultVersionAvailable",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAzureOpenAIConnectionDeployment();
}

main().catch(console.error);
