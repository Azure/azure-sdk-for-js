// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerate a shared access key for a namespace topic.
 *
 * @summary regenerate a shared access key for a namespace topic.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopics_RegenerateKey.json
 */
async function namespaceTopicsRegenerateKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaceTopics.regenerateKey(
    "examplerg",
    "examplenamespace2",
    "examplenamespacetopic2",
    { keyName: "key1" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespaceTopicsRegenerateKey();
}

main().catch(console.error);
