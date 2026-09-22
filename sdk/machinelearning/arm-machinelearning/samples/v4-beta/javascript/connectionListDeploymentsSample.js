// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the deployments under the Azure OpenAI connection.
 *
 * @summary get all the deployments under the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/listDeployments.json
 */
async function listAzureOpenAIConnectionDeployments() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connection.listDeployments(
    "resourceGroup-1",
    "testworkspace",
    "testConnection",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAzureOpenAIConnectionDeployments();
}

main().catch(console.error);
