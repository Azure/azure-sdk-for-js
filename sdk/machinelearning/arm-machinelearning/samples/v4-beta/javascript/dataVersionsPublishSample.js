// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to publish version asset into registry.
 *
 * @summary publish version asset into registry.
 * x-ms-original-file: 2025-12-01/Workspace/DataVersionBase/publish.json
 */
async function publishWorkspaceDataVersionBase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.dataVersions.publish("test-rg", "my-aml-workspace", "string", "string", {
    destinationName: "string",
    destinationVersion: "string",
    registryName: "string",
  });
}

async function main() {
  await publishWorkspaceDataVersionBase();
}

main().catch(console.error);
