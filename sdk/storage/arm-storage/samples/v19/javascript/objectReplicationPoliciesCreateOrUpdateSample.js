// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update the object replication policy of the storage account.
 *
 * @summary Create or update the object replication policy of the storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountCreateObjectReplicationPolicyOnDestination.json
 */
async function storageAccountCreateObjectReplicationPolicyOnDestination() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "dst112";
  const objectReplicationPolicyId = "default";
  const properties = {
    destinationAccount: "dst112",
    metrics: { enabled: true },
    rules: [
      {
        destinationContainer: "dcont139",
        filters: { prefixMatch: ["blobA", "blobB"] },
        sourceContainer: "scont139",
      },
    ],
    sourceAccount: "src1122",
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.objectReplicationPoliciesOperations.createOrUpdate(
    resourceGroupName,
    accountName,
    objectReplicationPolicyId,
    properties,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update the object replication policy of the storage account.
 *
 * @summary Create or update the object replication policy of the storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountCreateObjectReplicationPolicyOnSource.json
 */
async function storageAccountCreateObjectReplicationPolicyOnSource() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "src1122";
  const objectReplicationPolicyId = "2a20bb73-5717-4635-985a-5d4cf777438f";
  const properties = {
    destinationAccount: "dst112",
    metrics: { enabled: true },
    rules: [
      {
        destinationContainer: "dcont139",
        filters: {
          minCreationTime: "2020-02-19T16:05:00Z",
          prefixMatch: ["blobA", "blobB"],
        },
        ruleId: "d5d18a48-8801-4554-aeaa-74faf65f5ef9",
        sourceContainer: "scont139",
      },
    ],
    sourceAccount: "src1122",
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.objectReplicationPoliciesOperations.createOrUpdate(
    resourceGroupName,
    accountName,
    objectReplicationPolicyId,
    properties,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update the object replication policy of the storage account.
 *
 * @summary Create or update the object replication policy of the storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdateObjectReplicationPolicyOnDestination.json
 */
async function storageAccountUpdateObjectReplicationPolicyOnDestination() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "dst112";
  const objectReplicationPolicyId = "2a20bb73-5717-4635-985a-5d4cf777438f";
  const properties = {
    destinationAccount: "dst112",
    metrics: { enabled: true },
    rules: [
      {
        destinationContainer: "dcont139",
        filters: { prefixMatch: ["blobA", "blobB"] },
        ruleId: "d5d18a48-8801-4554-aeaa-74faf65f5ef9",
        sourceContainer: "scont139",
      },
      { destinationContainer: "dcont179", sourceContainer: "scont179" },
    ],
    sourceAccount: "src1122",
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.objectReplicationPoliciesOperations.createOrUpdate(
    resourceGroupName,
    accountName,
    objectReplicationPolicyId,
    properties,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update the object replication policy of the storage account.
 *
 * @summary Create or update the object replication policy of the storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdateObjectReplicationPolicyOnSource.json
 */
async function storageAccountUpdateObjectReplicationPolicyOnSource() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "src1122";
  const objectReplicationPolicyId = "2a20bb73-5717-4635-985a-5d4cf777438f";
  const properties = {
    destinationAccount: "dst112",
    metrics: { enabled: true },
    rules: [
      {
        destinationContainer: "dcont139",
        filters: { prefixMatch: ["blobA", "blobB"] },
        ruleId: "d5d18a48-8801-4554-aeaa-74faf65f5ef9",
        sourceContainer: "scont139",
      },
      {
        destinationContainer: "dcont179",
        ruleId: "cfbb4bc2-8b60-429f-b05a-d1e0942b33b2",
        sourceContainer: "scont179",
      },
    ],
    sourceAccount: "src1122",
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.objectReplicationPoliciesOperations.createOrUpdate(
    resourceGroupName,
    accountName,
    objectReplicationPolicyId,
    properties,
  );
  console.log(result);
}

async function main() {
  await storageAccountCreateObjectReplicationPolicyOnDestination();
  await storageAccountCreateObjectReplicationPolicyOnSource();
  await storageAccountUpdateObjectReplicationPolicyOnDestination();
  await storageAccountUpdateObjectReplicationPolicyOnSource();
}

main().catch(console.error);
