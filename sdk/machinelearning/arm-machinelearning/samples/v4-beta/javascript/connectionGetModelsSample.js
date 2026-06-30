// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get available models under the Azure OpenAI connection.
 *
 * @summary get available models under the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/getModels.json
 */
async function getAzureOpenAIConnectionModels() {
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

async function main() {
  await getAzureOpenAIConnectionModels();
}

main().catch(console.error);
