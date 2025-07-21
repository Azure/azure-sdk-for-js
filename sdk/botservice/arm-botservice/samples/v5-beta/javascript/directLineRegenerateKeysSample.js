// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 *
 * @summary regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 * x-ms-original-file: 2023-09-15-preview/DirectlineRegenerateKeys.json
 */
async function regenerateKeysForDirectLineChannelSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.directLine.regenerateKeys(
    "OneResourceGroupName",
    "samplebotname",
    "DirectLineChannel",
    { key: "key1", siteName: "testSiteName" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 *
 * @summary regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 * x-ms-original-file: 2023-09-15-preview/WebChatRegenerateKeys.json
 */
async function regenerateKeysForWebChatChannelSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.directLine.regenerateKeys(
    "OneResourceGroupName",
    "samplebotname",
    "WebChatChannel",
    { key: "key1", siteName: "testSiteName" },
  );
  console.log(result);
}

async function main() {
  await regenerateKeysForDirectLineChannelSite();
  await regenerateKeysForWebChatChannelSite();
}

main().catch(console.error);
