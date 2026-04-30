// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete existing topic.
 *
 * @summary delete existing topic.
 * x-ms-original-file: 2025-07-15-preview/Topics_Delete.json
 */
async function topicsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.topics.delete("examplerg1", "exampletopic1");
}

async function main() {
  await topicsDelete();
}

main().catch(console.error);
