// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Sets the blob inventory policy to the specified storage account.
 *
 * @summary Sets the blob inventory policy to the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountSetBlobInventoryPolicy.json
 */
async function storageAccountSetBlobInventoryPolicy() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "sto9699";
  const blobInventoryPolicyName = "default";
  const properties = {
    policy: {
      type: "Inventory",
      enabled: true,
      rules: [
        {
          name: "inventoryPolicyRule1",
          definition: {
            format: "Csv",
            filters: {
              blobTypes: ["blockBlob", "appendBlob", "pageBlob"],
              creationTime: { lastNDays: 1000 },
              includeBlobVersions: true,
              includeSnapshots: true,
              prefixMatch: ["inventoryprefix1", "inventoryprefix2"],
            },
            objectType: "Blob",
            schedule: "Daily",
            schemaFields: [
              "Name",
              "Creation-Time",
              "Last-Modified",
              "Content-Length",
              "Content-MD5",
              "BlobType",
              "AccessTier",
              "AccessTierChangeTime",
              "Snapshot",
              "VersionId",
              "IsCurrentVersion",
              "Metadata",
            ],
          },
          destination: "container1",
          enabled: true,
        },
        {
          name: "inventoryPolicyRule2",
          definition: {
            format: "Parquet",
            objectType: "Container",
            schedule: "Weekly",
            schemaFields: [
              "Name",
              "Last-Modified",
              "Metadata",
              "LeaseStatus",
              "LeaseState",
              "LeaseDuration",
              "PublicAccess",
              "HasImmutabilityPolicy",
              "HasLegalHold",
            ],
          },
          destination: "container2",
          enabled: true,
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobInventoryPolicies.createOrUpdate(
    resourceGroupName,
    accountName,
    blobInventoryPolicyName,
    properties,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Sets the blob inventory policy to the specified storage account.
 *
 * @summary Sets the blob inventory policy to the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForHnsAccount.json
 */
async function storageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForHnsAccount() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "sto9699";
  const blobInventoryPolicyName = "default";
  const properties = {
    policy: {
      type: "Inventory",
      enabled: true,
      rules: [
        {
          name: "inventoryPolicyRule1",
          definition: {
            format: "Csv",
            filters: {
              blobTypes: ["blockBlob", "appendBlob", "pageBlob"],
              excludePrefix: ["excludeprefix1", "excludeprefix2"],
              includeBlobVersions: true,
              includeDeleted: true,
              includeSnapshots: true,
              prefixMatch: ["inventoryprefix1", "inventoryprefix2"],
            },
            objectType: "Blob",
            schedule: "Daily",
            schemaFields: [
              "Name",
              "Creation-Time",
              "Last-Modified",
              "Content-Length",
              "Content-MD5",
              "BlobType",
              "AccessTier",
              "AccessTierChangeTime",
              "Snapshot",
              "VersionId",
              "IsCurrentVersion",
              "ContentType",
              "ContentEncoding",
              "ContentLanguage",
              "ContentCRC64",
              "CacheControl",
              "Metadata",
              "DeletionId",
              "Deleted",
              "DeletedTime",
              "RemainingRetentionDays",
            ],
          },
          destination: "container1",
          enabled: true,
        },
        {
          name: "inventoryPolicyRule2",
          definition: {
            format: "Parquet",
            objectType: "Container",
            schedule: "Weekly",
            schemaFields: [
              "Name",
              "Last-Modified",
              "Metadata",
              "LeaseStatus",
              "LeaseState",
              "LeaseDuration",
              "PublicAccess",
              "HasImmutabilityPolicy",
              "HasLegalHold",
              "Etag",
              "DefaultEncryptionScope",
              "DenyEncryptionScopeOverride",
              "ImmutableStorageWithVersioningEnabled",
              "Deleted",
              "Version",
              "DeletedTime",
              "RemainingRetentionDays",
            ],
          },
          destination: "container2",
          enabled: true,
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobInventoryPolicies.createOrUpdate(
    resourceGroupName,
    accountName,
    blobInventoryPolicyName,
    properties,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Sets the blob inventory policy to the specified storage account.
 *
 * @summary Sets the blob inventory policy to the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForNonHnsAccount.json
 */
async function storageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForNonHnsAccount() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "sto9699";
  const blobInventoryPolicyName = "default";
  const properties = {
    policy: {
      type: "Inventory",
      enabled: true,
      rules: [
        {
          name: "inventoryPolicyRule1",
          definition: {
            format: "Csv",
            filters: {
              blobTypes: ["blockBlob", "appendBlob", "pageBlob"],
              excludePrefix: ["excludeprefix1", "excludeprefix2"],
              includeBlobVersions: true,
              includeDeleted: true,
              includeSnapshots: true,
              prefixMatch: ["inventoryprefix1", "inventoryprefix2"],
            },
            objectType: "Blob",
            schedule: "Daily",
            schemaFields: [
              "Name",
              "Creation-Time",
              "Last-Modified",
              "Content-Length",
              "Content-MD5",
              "BlobType",
              "AccessTier",
              "AccessTierChangeTime",
              "Snapshot",
              "VersionId",
              "IsCurrentVersion",
              "Tags",
              "ContentType",
              "ContentEncoding",
              "ContentLanguage",
              "ContentCRC64",
              "CacheControl",
              "Metadata",
              "Deleted",
              "RemainingRetentionDays",
            ],
          },
          destination: "container1",
          enabled: true,
        },
        {
          name: "inventoryPolicyRule2",
          definition: {
            format: "Parquet",
            objectType: "Container",
            schedule: "Weekly",
            schemaFields: [
              "Name",
              "Last-Modified",
              "Metadata",
              "LeaseStatus",
              "LeaseState",
              "LeaseDuration",
              "PublicAccess",
              "HasImmutabilityPolicy",
              "HasLegalHold",
              "Etag",
              "DefaultEncryptionScope",
              "DenyEncryptionScopeOverride",
              "ImmutableStorageWithVersioningEnabled",
              "Deleted",
              "Version",
              "DeletedTime",
              "RemainingRetentionDays",
            ],
          },
          destination: "container2",
          enabled: true,
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobInventoryPolicies.createOrUpdate(
    resourceGroupName,
    accountName,
    blobInventoryPolicyName,
    properties,
  );
  console.log(result);
}

async function main() {
  await storageAccountSetBlobInventoryPolicy();
  await storageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForHnsAccount();
  await storageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForNonHnsAccount();
}

main().catch(console.error);
