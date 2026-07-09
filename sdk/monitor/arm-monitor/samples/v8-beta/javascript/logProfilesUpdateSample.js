// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing LogProfilesResource. To update other fields use the CreateOrUpdate method.
 *
 * @summary updates an existing LogProfilesResource. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: 2016-03-01/patchLogProfile.json
 */
async function patchALogProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "df602c9c-7aa0-407d-a6fb-eb20c8bd1192";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.logProfiles.update("Rac46PostSwapRG", {
    categories: ["Write", "Delete", "Action"],
    locations: ["global"],
    retentionPolicy: { days: 3, enabled: true },
    serviceBusRuleId: "",
    storageAccountId:
      "/subscriptions/df602c9c-7aa0-407d-a6fb-eb20c8bd1192/resourceGroups/JohnKemTest/providers/Microsoft.Storage/storageAccounts/johnkemtest8162",
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await patchALogProfile();
}

main().catch(console.error);
