// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteInfo } from "@azure/arm-botservice";
import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 *
 * @summary Regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/DirectlineRegenerateKeys.json
 */
async function regenerateKeysForDirectLineChannelSite(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "DirectLineChannel";
  const parameters: SiteInfo = { key: "key1", siteName: "testSiteName" };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.directLine.regenerateKeys(
    resourceGroupName,
    resourceName,
    channelName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 *
 * @summary Regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/WebChatRegenerateKeys.json
 */
async function regenerateKeysForWebChatChannelSite(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "WebChatChannel";
  const parameters: SiteInfo = { key: "key1", siteName: "testSiteName" };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.directLine.regenerateKeys(
    resourceGroupName,
    resourceName,
    channelName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regenerateKeysForDirectLineChannelSite();
  await regenerateKeysForWebChatChannelSite();
}

main().catch(console.error);
