// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to posts a restart action to a compute instance
 *
 * @summary posts a restart action to a compute instance
 * x-ms-original-file: 2025-12-01/Compute/restart.json
 */
async function restartComputeInstanceCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.compute.restart("testrg123", "workspaces123", "compute123");
}

async function main() {
  await restartComputeInstanceCompute();
}

main().catch(console.error);
