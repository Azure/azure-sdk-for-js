// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously updates a namespace topic with the specified parameters.
 *
 * @summary asynchronously updates a namespace topic with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopics_Update.json
 */
async function namespaceTopicsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaceTopics.update(
    "examplerg",
    "exampleNamespaceName1",
    "exampleNamespaceTopicName1",
    { eventRetentionInDays: 1 },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespaceTopicsUpdate();
}

main().catch(console.error);
