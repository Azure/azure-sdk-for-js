// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerate a shared access key for a topic.
 *
 * @summary regenerate a shared access key for a topic.
 * x-ms-original-file: 2025-07-15-preview/Topics_RegenerateKey.json
 */
async function topicsRegenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.topics.regenerateKey("examplerg", "exampletopic2", {
    keyName: "key1",
  });
  console.log(result);
}

async function main() {
  await topicsRegenerateKey();
}

main().catch(console.error);
