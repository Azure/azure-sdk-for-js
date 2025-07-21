// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a Bot Service. Bot Service is a resource group wide resource type.
 *
 * @summary creates a Bot Service. Bot Service is a resource group wide resource type.
 * x-ms-original-file: 2023-09-15-preview/CreateBot.json
 */
async function createBot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.bots.create("OneResourceGroupName", "samplebotname", {
    etag: "etag1",
    kind: "sdk",
    location: "West US",
    properties: {
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
      msaAppId: "exampleappid",
      msaAppMSIResourceId:
        "/subscriptions/foo/resourcegroups/bar/providers/microsoft.managedidentity/userassignedidentities/sampleId",
      msaAppTenantId: "exampleapptenantid",
      msaAppType: "UserAssignedMSI",
      publicNetworkAccess: "Enabled",
      schemaTransformationVersion: "1.0",
    },
    sku: { name: "S1" },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createBot();
}

main().catch(console.error);
