// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a data connection.
 *
 * @summary updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsCosmosDbUpdate.json
 */
async function kustoDataConnectionsCosmosDbUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.update(
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
 * This sample demonstrates how to updates a data connection.
 *
 * @summary updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsEventGridUpdate.json
 */
async function kustoDataConnectionsEventGridUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.update(
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
 * This sample demonstrates how to updates a data connection.
 *
 * @summary updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsEventGridWithManagedIdentityUpdate.json
 */
async function kustoDataConnectionsEventGridWithManagedIdentityUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.update(
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
 * This sample demonstrates how to updates a data connection.
 *
 * @summary updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsEventHubWithManagedIdentityUpdate.json
 */
async function kustoDataConnectionsEventHubWithManagedIdentityUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.update(
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

/**
 * This sample demonstrates how to updates a data connection.
 *
 * @summary updates a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsUpdate.json
 */
async function kustoDataConnectionsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.update(
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

async function main() {
  await kustoDataConnectionsCosmosDbUpdate();
  await kustoDataConnectionsEventGridUpdate();
  await kustoDataConnectionsEventGridWithManagedIdentityUpdate();
  await kustoDataConnectionsEventHubWithManagedIdentityUpdate();
  await kustoDataConnectionsUpdate();
}

main().catch(console.error);
