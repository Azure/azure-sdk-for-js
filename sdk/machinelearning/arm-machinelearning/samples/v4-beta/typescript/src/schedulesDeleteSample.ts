// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete schedule.
 *
 * @summary delete schedule.
 * x-ms-original-file: 2025-12-01/Schedule/delete.json
 */
async function deleteSchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.schedules.delete("test-rg", "my-aml-workspace", "string");
}

async function main(): Promise<void> {
  await deleteSchedule();
}

main().catch(console.error);
