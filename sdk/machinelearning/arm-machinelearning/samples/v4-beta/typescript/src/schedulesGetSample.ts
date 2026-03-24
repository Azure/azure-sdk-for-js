// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get schedule.
 *
 * @summary get schedule.
 * x-ms-original-file: 2025-12-01/Schedule/get.json
 */
async function getSchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.schedules.get("test-rg", "my-aml-workspace", "string");
  console.log(result);
}

async function main(): Promise<void> {
  await getSchedule();
}

main().catch(console.error);
