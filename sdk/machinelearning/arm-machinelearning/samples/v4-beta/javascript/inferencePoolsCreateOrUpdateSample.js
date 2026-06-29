// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update InferencePool (asynchronous).
 *
 * @summary create or update InferencePool (asynchronous).
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferencePool/createOrUpdate.json
 */
async function createOrUpdateWorkspaceInferencePool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.inferencePools.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    {
      identity: { type: "UserAssigned", userAssignedIdentities: { string: {} } },
      kind: "string",
      location: "string",
      properties: {
        description: "string",
        properties: [{ key: "string", value: "string" }],
        scaleUnitConfiguration: {
          disablePublicEgress: false,
          registries: ["string", "registryName1"],
        },
      },
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Free" },
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateWorkspaceInferencePool();
}

main().catch(console.error);
