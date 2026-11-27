// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Task
 *
 * @summary delete a Task
 * x-ms-original-file: 2026-06-01-preview/Tasks_Delete_MaximumSet_Gen.json
 */
async function tasksDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  await client.tasks.delete("rgwaves", "project1", "task1");
}

async function main(): Promise<void> {
  await tasksDeleteMaximumSet();
}

main().catch(console.error);
