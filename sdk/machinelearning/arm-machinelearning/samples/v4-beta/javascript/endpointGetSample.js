// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets endpoint resource
 *
 * @summary gets endpoint resource
 * x-ms-original-file: 2026-03-15-preview/Endpoint/get.json
 */
async function getEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.endpoint.get("test-rg", "aml-workspace-name", "Azure.OpenAI");
  console.log(result);
}

async function main() {
  await getEndpoint();
}

main().catch(console.error);
