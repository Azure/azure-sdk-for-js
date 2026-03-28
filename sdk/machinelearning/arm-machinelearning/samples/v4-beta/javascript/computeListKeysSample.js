// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets secrets related to Machine Learning compute (storage keys, service credentials, etc).
 *
 * @summary gets secrets related to Machine Learning compute (storage keys, service credentials, etc).
 * x-ms-original-file: 2025-12-01/Compute/listKeys.json
 */
async function listAKSComputeKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.listKeys("testrg123", "workspaces123", "compute123");
  console.log(result);
}

async function main() {
  await listAKSComputeKeys();
}

main().catch(console.error);
