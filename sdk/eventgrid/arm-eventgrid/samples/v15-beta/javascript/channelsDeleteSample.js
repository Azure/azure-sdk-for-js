// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an existing channel.
 *
 * @summary delete an existing channel.
 * x-ms-original-file: 2025-07-15-preview/Channels_Delete.json
 */
async function channelsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.channels.delete(
    "examplerg",
    "examplePartnerNamespaceName1",
    "exampleEventChannelName1",
  );
}

async function main() {
  await channelsDelete();
}

main().catch(console.error);
