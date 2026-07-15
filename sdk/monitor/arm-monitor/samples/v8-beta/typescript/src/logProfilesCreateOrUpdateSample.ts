// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a log profile in Azure Monitoring REST API.
 *
 * @summary create or update a log profile in Azure Monitoring REST API.
 * x-ms-original-file: 2016-03-01/createOrUpdateLogProfile.json
 */
async function createOrUpdateALogProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "df602c9c-7aa0-407d-a6fb-eb20c8bd1192";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.logProfiles.createOrUpdate("Rac46PostSwapRG", {
    location: "",
    categories: ["Write", "Delete", "Action"],
    locations: ["global"],
    retentionPolicy: { days: 3, enabled: true },
    serviceBusRuleId: "",
    storageAccountId:
      "/subscriptions/df602c9c-7aa0-407d-a6fb-eb20c8bd1192/resourceGroups/JohnKemTest/providers/Microsoft.Storage/storageAccounts/johnkemtest8162",
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateALogProfile();
}

main().catch(console.error);
