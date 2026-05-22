// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Batch Inference deployment (asynchronous).
 *
 * @summary delete Batch Inference deployment (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/BatchDeployment/delete.json
 */
async function deleteWorkspaceBatchDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.batchDeployments.delete(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
  );
}

async function main() {
  await deleteWorkspaceBatchDeployment();
}

main().catch(console.error);
