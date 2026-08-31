// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get available models under the Azure OpenAI connection.
 *
 * @summary get available models under the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/getModels.json
 */
async function getAzureOpenAIConnectionModels(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connection.getModels(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAzureOpenAIConnectionModels();
}

main().catch(console.error);
