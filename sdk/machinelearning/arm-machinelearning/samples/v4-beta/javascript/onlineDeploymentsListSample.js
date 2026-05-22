// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Inference Endpoint Deployments.
 *
 * @summary list Inference Endpoint Deployments.
 * x-ms-original-file: 2025-12-01/OnlineDeployment/list.json
 */
async function listOnlineDeployments() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.onlineDeployments.list(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    { orderBy: "string", top: 1 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOnlineDeployments();
}

main().catch(console.error);
