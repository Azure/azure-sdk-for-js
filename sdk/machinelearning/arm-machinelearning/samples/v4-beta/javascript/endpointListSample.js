// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list All the endpoints under this workspace
 *
 * @summary list All the endpoints under this workspace
 * x-ms-original-file: 2026-03-15-preview/Endpoint/list.json
 */
async function listEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpoint.list("test-rg", "aml-workspace-name", {
    endpointType: "Azure.OpenAI",
    skip: "skip_string",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEndpoint();
}

main().catch(console.error);
