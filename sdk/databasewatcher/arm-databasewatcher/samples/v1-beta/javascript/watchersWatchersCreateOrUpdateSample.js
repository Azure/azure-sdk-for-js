// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DatabaseWatcherClient } = require("@azure/arm-databasewatcher");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Watcher
 *
 * @summary create a Watcher
 * x-ms-original-file: 2025-01-02/Watchers_CreateOrUpdate_MaximumSet_Gen.json
 */
async function watchersCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const result = await client.watchers.createOrUpdate("rgWatcher", "testWatcher", {
    properties: {
      status: "Starting",
      defaultAlertRuleIdentityResourceId:
        "/subscriptions/469DD77C-C8DB-47B7-B9E1-72D29F8C878B/resourceGroups/rgWatcher/providers/Microsoft.ManagedIdentity/userAssignedIdentities/3pmtest",
      datastore: {
        adxClusterResourceId:
          "/subscriptions/49e0fbd3-75e8-44e7-96fd-5b64d9ad818d/resourceGroups/apiTest/providers/Microsoft.Kusto/clusters/apiTestKusto",
        kustoClusterUri: "https://kustouri-adx.eastus.kusto.windows.net",
        kustoClusterDisplayName: "kustoUri-adx",
        kustoDataIngestionUri: "https://ingest-kustouri-adx.eastus.kusto.windows.net",
        kustoDatabaseName: "kustoDatabaseName1",
        kustoManagementUrl: "https://portal.azure.com/",
        kustoOfferingType: "adx",
      },
    },
    identity: { type: "SystemAssigned" },
    tags: {},
    location: "eastus2",
  });
  console.log(result);
}

async function main() {
  await watchersCreateOrUpdateMaximumSet();
}

main().catch(console.error);
