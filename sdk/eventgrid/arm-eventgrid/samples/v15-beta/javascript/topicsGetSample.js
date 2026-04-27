// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of a topic.
 *
 * @summary get properties of a topic.
 * x-ms-original-file: 2025-07-15-preview/Topics_Get.json
 */
async function topicsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.topics.get("examplerg", "exampletopic2");
  console.log(result);
}

async function main() {
  await topicsGet();
}

main().catch(console.error);
