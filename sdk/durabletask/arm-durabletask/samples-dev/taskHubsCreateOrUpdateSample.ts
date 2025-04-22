// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update a Task Hub
 *
 * @summary create or Update a Task Hub
 * x-ms-original-file: 2025-04-01-preview/TaskHubs_CreateOrUpdate.json
 */
async function taskHubsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.taskHubs.createOrUpdate("rgopenapi", "testscheduler", "testtaskhub", {
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await taskHubsCreateOrUpdate();
}

main().catch(console.error);
