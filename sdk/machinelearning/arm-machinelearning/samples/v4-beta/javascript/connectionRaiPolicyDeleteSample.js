// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Content Filters associated with the Azure OpenAI connection.
 *
 * @summary deletes the specified Content Filters associated with the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/RaiPolicy/delete.json
 */
async function deleteRaiPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.connectionRaiPolicy.delete(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
    "raiPolicyName",
  );
}

async function main() {
  await deleteRaiPolicy();
}

main().catch(console.error);
