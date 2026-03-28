// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a batch inference deployment (asynchronous).
 *
 * @summary update a batch inference deployment (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/BatchDeployment/update.json
 */
async function updateWorkspaceBatchDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.batchDeployments.update(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
    { properties: { description: "string" }, tags: {} },
  );
  console.log(result);
}

async function main() {
  await updateWorkspaceBatchDeployment();
}

main().catch(console.error);
