// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 *
 * @summary regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 * x-ms-original-file: 2023-09-15-preview/DirectlineRegenerateKeys.json
 */
async function regenerateKeysForDirectLineChannelSite(): Promise<void> {
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
async function regenerateKeysForWebChatChannelSite(): Promise<void> {
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

async function main(): Promise<void> {
  await regenerateKeysForDirectLineChannelSite();
  await regenerateKeysForWebChatChannelSite();
}

main().catch(console.error);
