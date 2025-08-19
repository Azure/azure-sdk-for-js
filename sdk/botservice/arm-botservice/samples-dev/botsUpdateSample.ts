// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BotsUpdateOptionalParams } from "@azure/arm-botservice";
import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a Bot Service
 *
 * @summary Updates a Bot Service
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/UpdateBot.json
 */
async function updateBot(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const location = "West US";
  const tags = { tag1: "value1", tag2: "value2" };
  const sku = { name: "S1" };
  const kind = "sdk";
  const etag = "etag1";
  const properties = {
    description: "The description of the bot",
    cmekKeyVaultUrl: "https://myCmekKey",
    developerAppInsightKey: "appinsightskey",
    developerAppInsightsApiKey: "appinsightsapikey",
    developerAppInsightsApplicationId: "appinsightsappid",
    disableLocalAuth: true,
    displayName: "The Name of the bot",
    endpoint: "http://mybot.coffee",
    iconUrl: "http://myicon",
    isCmekEnabled: true,
    luisAppIds: ["luisappid1", "luisappid2"],
    luisKey: "luiskey",
    msaAppId: "msaappid",
    msaAppMSIResourceId:
      "/subscriptions/foo/resourcegroups/bar/providers/microsoft.managedidentity/userassignedidentities/sampleId",
    msaAppTenantId: "msaapptenantid",
    msaAppType: "UserAssignedMSI",
    publicNetworkAccess: "Enabled",
    schemaTransformationVersion: "1.0",
  };
  const options: BotsUpdateOptionalParams = {
    location,
    tags,
    sku,
    kind,
    etag,
    properties,
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.bots.update(resourceGroupName, resourceName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await updateBot();
}

main().catch(console.error);
