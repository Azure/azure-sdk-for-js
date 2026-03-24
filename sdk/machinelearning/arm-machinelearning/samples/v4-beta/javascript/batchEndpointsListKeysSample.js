// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists batch Inference Endpoint keys.
 *
 * @summary lists batch Inference Endpoint keys.
 * x-ms-original-file: 2025-12-01/Workspace/BatchEndpoint/listKeys.json
 */
async function listKeysWorkspaceBatchEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.batchEndpoints.listKeys(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
  );
  console.log(result);
}

async function main() {
  await listKeysWorkspaceBatchEndpoint();
}

main().catch(console.error);
