// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Bot Service
 *
 * @summary updates a Bot Service
 * x-ms-original-file: 2023-09-15-preview/UpdateBot.json
 */
async function updateBot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.bots.update("OneResourceGroupName", "samplebotname", {
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
      msaAppId: "msaappid",
      msaAppMSIResourceId:
        "/subscriptions/foo/resourcegroups/bar/providers/microsoft.managedidentity/userassignedidentities/sampleId",
      msaAppTenantId: "msaapptenantid",
      msaAppType: "UserAssignedMSI",
      publicNetworkAccess: "Enabled",
      schemaTransformationVersion: "1.0",
    },
    sku: { name: "S1" },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateBot();
}

main().catch(console.error);
