// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a data connection.
 *
 * @summary creates or updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsCosmosDbCreateOrUpdate.json
 */
async function kustoDataConnectionsCosmosDbCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase1",
    "dataConnectionTest",
    {
      kind: "CosmosDb",
      location: "westus",
      cosmosDbAccountResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.DocumentDb/databaseAccounts/cosmosDbAccountTest1",
      cosmosDbContainer: "cosmosDbContainerTest",
      cosmosDbDatabase: "cosmosDbDatabaseTest",
      managedIdentityResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedidentityTest1",
      mappingRuleName: "TestMapping",
      retrievalStartDate: new Date("2022-07-29T12:00:00.6554616Z"),
      tableName: "TestTable",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a data connection.
 *
 * @summary creates or updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsCreateOrUpdate.json
 */
async function kustoDataConnectionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "dataConnectionTest",
    {
      kind: "EventHub",
      location: "westus",
      consumerGroup: "testConsumerGroup1",
      eventHubResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.EventHub/namespaces/eventhubTestns1/eventhubs/eventhubTest1",
      managedIdentityResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedidentityTest1",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a data connection.
 *
 * @summary creates or updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsEventGridCreateOrUpdate.json
 */
async function kustoDataConnectionsEventGridCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "dataConnectionTest",
    {
      kind: "EventGrid",
      location: "westus",
      blobStorageEventType: "Microsoft.Storage.BlobCreated",
      consumerGroup: "$Default",
      dataFormat: "MULTIJSON",
      databaseRouting: "Single",
      eventGridResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/teststorageaccount/providers/Microsoft.EventGrid/eventSubscriptions/eventSubscriptionTest",
      eventHubResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.EventHub/namespaces/eventhubTestns1/eventhubs/eventhubTest2",
      ignoreFirstRecord: false,
      managedIdentityResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedidentityTest1",
      mappingRuleName: "TestMapping",
      storageAccountResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/teststorageaccount",
      tableName: "TestTable",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a data connection.
 *
 * @summary creates or updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsEventGridWithManagedIdentityCreateOrUpdate.json
 */
async function kustoDataConnectionsEventGridWithManagedIdentityCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "dataConnectionTest",
    {
      location: "westus",
      kind: "EventGridWithManagedIdentity",
      ignoreFirstRecord: false,
      storageAccountResourceIdForManagedIdentity:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/teststorageaccount",
      eventGridResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/teststorageaccount/providers/Microsoft.EventGrid/eventSubscriptions/eventSubscriptionTest",
      eventHubResourceIdForManagedIdentity:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.EventHub/namespaces/eventhubTestns1/eventhubs/eventhubTest2",
      consumerGroup: "$Default",
      tableName: "TestTable",
      mappingRuleName: "TestMapping",
      dataFormat: "MULTIJSON",
      blobStorageEventType: "Microsoft.Storage.BlobCreated",
      managedIdentityResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedidentityTest1",
      databaseRouting: "Single",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a data connection.
 *
 * @summary creates or updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsEventHubWithManagedIdentityCreateOrUpdate.json
 */
async function kustoDataConnectionsEventHubWithManagedIdentityCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "dataConnectionTest",
    {
      location: "westus",
      kind: "EventHubWithManagedIdentity",
      eventHubResourceIdForManagedIdentity:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.EventHub/namespaces/eventhubTestns1/eventhubs/eventhubTest1",
      managedIdentityResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedidentityTest1",
      consumerGroup: "testConsumerGroup1",
    },
  );
  console.log(result);
}

async function main() {
  await kustoDataConnectionsCosmosDbCreateOrUpdate();
  await kustoDataConnectionsCreateOrUpdate();
  await kustoDataConnectionsEventGridCreateOrUpdate();
  await kustoDataConnectionsEventGridWithManagedIdentityCreateOrUpdate();
  await kustoDataConnectionsEventHubWithManagedIdentityCreateOrUpdate();
}

main().catch(console.error);
