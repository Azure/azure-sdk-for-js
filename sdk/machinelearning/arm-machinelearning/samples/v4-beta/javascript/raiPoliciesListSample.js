// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary list the specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-03-15-preview/Endpoint/RaiPolicy/list.json
 */
async function listRaiPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiPolicies.list(
    "test-rg",
    "aml-workspace-name",
    "Azure.OpenAI",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRaiPolicies();
}

main().catch(console.error);
