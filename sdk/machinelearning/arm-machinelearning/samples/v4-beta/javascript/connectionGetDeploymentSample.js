// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get deployments under the Azure OpenAI connection by name.
 *
 * @summary get deployments under the Azure OpenAI connection by name.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/getDeployment.json
 */
async function getAzureOpenAIConnectionDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.connection.getDeployment(
    "resourceGroup-1",
    "testworkspace",
    "testConnection",
    "text-davinci-003",
  );
  console.log(result);
}

async function main() {
  await getAzureOpenAIConnectionDeployment();
}

main().catch(console.error);
