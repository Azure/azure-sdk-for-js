// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Task
 *
 * @summary get a Task
 * x-ms-original-file: 2026-06-01-preview/Tasks_Get_MaximumSet_Gen.json
 */
async function tasksGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.tasks.get("rgwaves", "project1", "task1");
  console.log(result);
}

async function main(): Promise<void> {
  await tasksGetMaximumSet();
}

main().catch(console.error);
