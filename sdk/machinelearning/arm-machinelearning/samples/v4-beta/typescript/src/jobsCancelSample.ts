// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels a Job (asynchronous).
 *
 * @summary cancels a Job (asynchronous).
 * x-ms-original-file: 2025-12-01/Job/cancel.json
 */
async function cancelJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.jobs.cancel("test-rg", "my-aml-workspace", "string");
}

async function main(): Promise<void> {
  await cancelJob();
}

main().catch(console.error);
