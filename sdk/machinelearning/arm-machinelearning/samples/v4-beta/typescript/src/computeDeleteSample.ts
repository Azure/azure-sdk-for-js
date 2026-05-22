// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specified Machine Learning compute.
 *
 * @summary deletes specified Machine Learning compute.
 * x-ms-original-file: 2025-12-01/Compute/delete.json
 */
async function deleteCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.compute.delete("testrg123", "workspaces123", "compute123", "Delete");
}

async function main(): Promise<void> {
  await deleteCompute();
}

main().catch(console.error);
