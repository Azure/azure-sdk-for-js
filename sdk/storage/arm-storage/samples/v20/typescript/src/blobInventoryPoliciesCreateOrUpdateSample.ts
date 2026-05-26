// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets the blob inventory policy to the specified storage account.
 *
 * @summary sets the blob inventory policy to the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountSetBlobInventoryPolicy.json
 */
async function storageAccountSetBlobInventoryPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobInventoryPolicies.createOrUpdate(
    "res7687",
    "sto9699",
    "default",
    {
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
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to sets the blob inventory policy to the specified storage account.
 *
 * @summary sets the blob inventory policy to the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForHnsAccount.json
 */
async function storageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForHnsAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobInventoryPolicies.createOrUpdate(
    "res7687",
    "sto9699",
    "default",
    {
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
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to sets the blob inventory policy to the specified storage account.
 *
 * @summary sets the blob inventory policy to the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForNonHnsAccount.json
 */
async function storageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForNonHnsAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobInventoryPolicies.createOrUpdate(
    "res7687",
    "sto9699",
    "default",
    {
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
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountSetBlobInventoryPolicy();
  await storageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForHnsAccount();
  await storageAccountSetBlobInventoryPolicyIncludeDeleteAndNewSchemaForNonHnsAccount();
}

main().catch(console.error);
