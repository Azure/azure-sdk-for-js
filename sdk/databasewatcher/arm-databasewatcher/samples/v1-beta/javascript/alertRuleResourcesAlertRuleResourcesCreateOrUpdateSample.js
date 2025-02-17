// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DatabaseWatcherClient } = require("@azure/arm-databasewatcher");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AlertRuleResource
 *
 * @summary create a AlertRuleResource
 * x-ms-original-file: 2025-01-02/AlertRuleResources_CreateOrUpdate_MaximumSet_Gen.json
 */
async function alertRuleResourcesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const result = await client.alertRuleResources.createOrUpdate(
    "rgWatcher",
    "testWatcher",
    "testAlert",
    {
      properties: {
        alertRuleResourceId:
          "/subscriptions/469DD77C-C8DB-47B7-B9E1-72D29F8C878Be/resourceGroups/rgWatcher/providers/microsoft.insights/scheduledqueryrules/alerts-demo",
        creationTime: new Date("2024-07-25T15:38:47.798Z"),
        alertRuleTemplateVersion: "1.0",
        alertRuleTemplateId: "someTemplateId",
        createdWithProperties: "CreatedWithActionGroup",
      },
    },
  );
  console.log(result);
}

async function main() {
  await alertRuleResourcesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
