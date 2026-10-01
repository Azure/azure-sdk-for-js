// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update InferenceEndpoint (asynchronous).
 *
 * @summary create or update InferenceEndpoint (asynchronous).
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceEndpoint/createOrUpdate.json
 */
async function createOrUpdateWorkspaceInferenceEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.inferenceEndpoints.createOrUpdate(
    "test-rg1",
    "my-aml-workspace",
    "string",
    "testEndpointName",
    {
      identity: { type: "SystemAssigned", userAssignedIdentities: { string: {} } },
      kind: "string",
      location: "string",
      properties: {
        description: "string",
        authMode: "AAD",
        groupName: "string",
        properties: [{ key: "string", value: "string" }],
        requestConfiguration: { maxConcurrentRequestsPerInstance: 1, requestTimeout: "PT5M" },
      },
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Standard" },
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateWorkspaceInferenceEndpoint();
}

main().catch(console.error);
