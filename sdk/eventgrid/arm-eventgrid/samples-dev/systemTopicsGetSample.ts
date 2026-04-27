// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of a system topic.
 *
 * @summary get properties of a system topic.
 * x-ms-original-file: 2025-07-15-preview/SystemTopics_Get.json
 */
async function systemTopicsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.systemTopics.get("examplerg", "exampleSystemTopic2");
  console.log(result);
}

async function main(): Promise<void> {
  await systemTopicsGet();
}

main().catch(console.error);
