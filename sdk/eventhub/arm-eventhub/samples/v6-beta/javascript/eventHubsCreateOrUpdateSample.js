// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @summary creates or updates a new Event Hub as a nested resource within a Namespace.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubCreate.json
 */
async function ehEventHubCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdate(
    "Default-NotificationHubs-AustraliaEast",
    "sdk-Namespace-5357",
    "sdk-EventHub-6547",
    {
      captureDescription: {
        destination: {
          name: "EventHubArchive.AzureBlockBlob",
          identity: {
            type: "UserAssigned",
            userAssignedIdentity:
              "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud2",
          },
          archiveNameFormat:
            "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
          blobContainer: "container",
          storageAccountResourceId:
            "/subscriptions/e2f361f0-3b27-4503-a9cc-21cfba380093/resourceGroups/Default-Storage-SouthCentralUS/providers/Microsoft.ClassicStorage/storageAccounts/arjunteststorage",
        },
        enabled: true,
        encoding: "Avro",
        intervalInSeconds: 120,
        sizeLimitInBytes: 10485763,
      },
      partitionCount: 4,
      status: "Active",
      userMetadata: "key",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @summary creates or updates a new Event Hub as a nested resource within a Namespace.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubWithCompactPolicyCreate.json
 */
async function ehEventHubWithCompactPolicyCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdate(
    "Default-NotificationHubs-AustraliaEast",
    "sdk-Namespace-5357",
    "sdk-EventHub-6547",
    {
      captureDescription: {
        destination: {
          name: "EventHubArchive.AzureBlockBlob",
          identity: {
            type: "UserAssigned",
            userAssignedIdentity:
              "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud2",
          },
          archiveNameFormat:
            "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
          blobContainer: "container",
          storageAccountResourceId:
            "/subscriptions/e2f361f0-3b27-4503-a9cc-21cfba380093/resourceGroups/Default-Storage-SouthCentralUS/providers/Microsoft.ClassicStorage/storageAccounts/arjunteststorage",
        },
        enabled: true,
        encoding: "Avro",
        intervalInSeconds: 120,
        sizeLimitInBytes: 10485763,
      },
      messageRetentionInDays: 4,
      messageTimestampDescription: { timestampType: "LogAppend" },
      partitionCount: 4,
      retentionDescription: {
        cleanupPolicy: "Compact",
        minCompactionLagTimeInMinutes: 10,
        tombstoneRetentionTimeInHours: 1,
      },
      status: "Active",
      userMetadata: "key",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @summary creates or updates a new Event Hub as a nested resource within a Namespace.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubWithDeleteOrCompactPolicyCreate.json
 */
async function ehEventHubWithDeleteOrCompactPolicyCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdate(
    "Default-NotificationHubs-AustraliaEast",
    "sdk-Namespace-5357",
    "sdk-EventHub-6547",
    {
      captureDescription: {
        destination: {
          name: "EventHubArchive.AzureBlockBlob",
          identity: {
            type: "UserAssigned",
            userAssignedIdentity:
              "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud2",
          },
          archiveNameFormat:
            "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
          blobContainer: "container",
          storageAccountResourceId:
            "/subscriptions/e2f361f0-3b27-4503-a9cc-21cfba380093/resourceGroups/Default-Storage-SouthCentralUS/providers/Microsoft.ClassicStorage/storageAccounts/arjunteststorage",
        },
        enabled: true,
        encoding: "Avro",
        intervalInSeconds: 120,
        sizeLimitInBytes: 10485763,
      },
      messageRetentionInDays: 4,
      messageTimestampDescription: { timestampType: "LogAppend" },
      partitionCount: 4,
      retentionDescription: { cleanupPolicy: "DeleteOrCompact", retentionTimeInHours: 24 },
      status: "Active",
      userMetadata: "key",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @summary creates or updates a new Event Hub as a nested resource within a Namespace.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubWithDeletePolicyCreate.json
 */
async function ehEventHubWithDeletePolicyCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdate(
    "Default-NotificationHubs-AustraliaEast",
    "sdk-Namespace-5357",
    "sdk-EventHub-6547",
    {
      captureDescription: {
        destination: {
          name: "EventHubArchive.AzureBlockBlob",
          identity: {
            type: "UserAssigned",
            userAssignedIdentity:
              "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud2",
          },
          archiveNameFormat:
            "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
          blobContainer: "container",
          storageAccountResourceId:
            "/subscriptions/e2f361f0-3b27-4503-a9cc-21cfba380093/resourceGroups/Default-Storage-SouthCentralUS/providers/Microsoft.ClassicStorage/storageAccounts/arjunteststorage",
        },
        enabled: true,
        encoding: "Avro",
        intervalInSeconds: 120,
        sizeLimitInBytes: 10485763,
      },
      messageRetentionInDays: 4,
      messageTimestampDescription: { timestampType: "LogAppend" },
      partitionCount: 4,
      retentionDescription: { cleanupPolicy: "Delete", retentionTimeInHours: 24 },
      status: "Active",
      userMetadata: "key",
    },
  );
  console.log(result);
}

async function main() {
  await ehEventHubCreate();
  await ehEventHubWithCompactPolicyCreate();
  await ehEventHubWithDeleteOrCompactPolicyCreate();
  await ehEventHubWithDeletePolicyCreate();
}

main().catch(console.error);
