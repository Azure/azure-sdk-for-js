// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the full endpoint URL of a partner destination channel.
 *
 * @summary get the full endpoint URL of a partner destination channel.
 * x-ms-original-file: 2025-07-15-preview/Channels_GetFullUrl.json
 */
async function channelsGetFullUrl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.channels.getFullUrl(
    "examplerg",
    "examplenamespace",
    "examplechannel",
  );
  console.log(result);
}

async function main() {
  await channelsGetFullUrl();
}

main().catch(console.error);
