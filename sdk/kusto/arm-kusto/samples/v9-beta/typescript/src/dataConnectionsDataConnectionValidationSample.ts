// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the data connection parameters are valid.
 *
 * @summary checks that the data connection parameters are valid.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionEventGridValidationAsync.json
 */
async function kustoDataConnectionEventGridValidation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.dataConnectionValidation(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    {
      dataConnectionName: "dataConnectionTest",
      properties: {
        kind: "EventGrid",
        blobStorageEventType: "Microsoft.Storage.BlobCreated",
        consumerGroup: "$Default",
        dataFormat: "MULTIJSON",
        databaseRouting: "Single",
        eventGridResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/teststorageaccount/providers/Microsoft.EventGrid/eventSubscriptions/eventSubscriptionTest",
        eventHubResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.EventHub/namespaces/eventhubTestns1/eventhubs/eventhubTest1",
        ignoreFirstRecord: false,
        managedIdentityResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedidentityTest1",
        mappingRuleName: "TestMapping",
        storageAccountResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/teststorageaccount",
        tableName: "TestTable",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to checks that the data connection parameters are valid.
 *
 * @summary checks that the data connection parameters are valid.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionEventGridWithManagedIdentityValidationAsync.json
 */
async function kustoDataConnectionEventGridWithManagedIdentityValidationAsync(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.dataConnectionValidation(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    {
      dataConnectionName: "dataConnectionTest",
      properties: {
        kind: "EventGridWithManagedIdentity",
        consumerGroup: "$Default",
        eventHubResourceIdForManagedIdentity:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.EventHub/namespaces/eventhubTestns1/eventhubs/eventhubTest1",
        eventGridResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/teststorageaccount/providers/Microsoft.EventGrid/eventSubscriptions/eventSubscriptionTest",
        tableName: "TestTable",
        mappingRuleName: "TestMapping",
        dataFormat: "MULTIJSON",
        storageAccountResourceIdForManagedIdentity:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/teststorageaccount",
        ignoreFirstRecord: false,
        blobStorageEventType: "Microsoft.Storage.BlobCreated",
        managedIdentityResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedidentityTest1",
        databaseRouting: "Single",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to checks that the data connection parameters are valid.
 *
 * @summary checks that the data connection parameters are valid.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionEventHubWithManagedIdentityValidationAsync.json
 */
async function kustoDataConnectionEventHubWithManagedIdentityValidationAsync(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.dataConnectionValidation(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    {
      dataConnectionName: "dataConnectionTest",
      properties: {
        kind: "EventHubWithManagedIdentity",
        consumerGroup: "testConsumerGroup1",
        eventHubResourceIdForManagedIdentity:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.EventHub/namespaces/eventhubTestns1/eventhubs/eventhubTest1",
        managedIdentityResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedidentityTest1",
        compression: "None",
        tableName: "TestTable",
        mappingRuleName: "TestMapping",
        dataFormat: "MULTIJSON",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to checks that the data connection parameters are valid.
 *
 * @summary checks that the data connection parameters are valid.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionValidationAsync.json
 */
async function kustoDataConnectionValidation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.dataConnectionValidation(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    {
      dataConnectionName: "dataConnectionTest",
      properties: {
        kind: "EventHub",
        compression: "None",
        consumerGroup: "testConsumerGroup1",
        dataFormat: "MULTIJSON",
        eventHubResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.EventHub/namespaces/eventhubTestns1/eventhubs/eventhubTest1",
        managedIdentityResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedidentityTest1",
        mappingRuleName: "TestMapping",
        tableName: "TestTable",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoDataConnectionEventGridValidation();
  await kustoDataConnectionEventGridWithManagedIdentityValidationAsync();
  await kustoDataConnectionEventHubWithManagedIdentityValidationAsync();
  await kustoDataConnectionValidation();
}

main().catch(console.error);
