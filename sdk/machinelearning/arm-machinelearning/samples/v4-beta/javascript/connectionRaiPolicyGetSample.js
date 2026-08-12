// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Content Filters associated with the Azure OpenAI connection.
 *
 * @summary gets the specified Content Filters associated with the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/RaiPolicy/get.json
 */
async function getRaiPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.connectionRaiPolicy.get(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
    "raiPolicyName",
  );
  console.log(result);
}

async function main() {
  await getRaiPolicy();
}

main().catch(console.error);
