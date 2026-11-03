// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get models under the Azure ML workspace for all Azure OpenAI connections that the user can deploy.
 *
 * @summary get models under the Azure ML workspace for all Azure OpenAI connections that the user can deploy.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/listConnectionModels.json
 */
async function getModelsUnderTheAzureMLWorkspaceForAllAzureOpenAIConnectionsThatTheUserCanDeploy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.connection.getAllModels("test-rg", "aml-workspace-name");
  console.log(result);
}

async function main() {
  await getModelsUnderTheAzureMLWorkspaceForAllAzureOpenAIConnectionsThatTheUserCanDeploy();
}

main().catch(console.error);
