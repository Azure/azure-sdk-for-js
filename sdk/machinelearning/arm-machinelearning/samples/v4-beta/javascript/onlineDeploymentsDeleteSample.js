// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Inference Endpoint Deployment (asynchronous).
 *
 * @summary delete Inference Endpoint Deployment (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/OnlineDeployment/delete.json
 */
async function deleteWorkspaceOnlineDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.onlineDeployments.delete(
    "testrg123",
    "workspace123",
    "testEndpoint",
    "testDeployment",
  );
}

async function main() {
  await deleteWorkspaceOnlineDeployment();
}

main().catch(console.error);
