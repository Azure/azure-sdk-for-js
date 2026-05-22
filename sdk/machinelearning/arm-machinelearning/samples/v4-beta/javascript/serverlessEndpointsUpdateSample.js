// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Serverless Endpoint (asynchronous).
 *
 * @summary update Serverless Endpoint (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/ServerlessEndpoint/update.json
 */
async function updateWorkspaceServerlessEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.serverlessEndpoints.update("test-rg", "my-aml-workspace", "string", {
    identity: { type: "None", userAssignedIdentities: { string: {} } },
    sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Premium" },
    tags: {},
  });
  console.log(result);
}

async function main() {
  await updateWorkspaceServerlessEndpoint();
}

main().catch(console.error);
