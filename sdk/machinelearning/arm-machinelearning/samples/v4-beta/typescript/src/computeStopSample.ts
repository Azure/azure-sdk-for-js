// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to posts a stop action to a compute instance
 *
 * @summary posts a stop action to a compute instance
 * x-ms-original-file: 2025-12-01/Compute/stop.json
 */
async function stopComputeInstanceCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.compute.stop("testrg123", "workspaces123", "compute123");
}

async function main(): Promise<void> {
  await stopComputeInstanceCompute();
}

main().catch(console.error);
