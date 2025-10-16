// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FileShare} from "@azure/arm-storage";
import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 *
 * @summary Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileShareAclsPatch.json
 */
async function updateShareAcls(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const shareName = "share6185";
  const fileShare: FileShare = {
    signedIdentifiers: [
      {
        accessPolicy: {
          expiryTime: new Date("2021-05-01T08:49:37.0000000Z"),
          permission: "rwd",
          startTime: new Date("2021-04-01T08:49:37.0000000Z"),
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.update(
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 *
 * @summary Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesPatch_PaidBursting.json
 */
async function updateSharePaidBursting(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const shareName = "share6185";
  const fileShare: FileShare = {
    fileSharePaidBursting: {
      paidBurstingEnabled: true,
      paidBurstingMaxBandwidthMibps: 10340,
      paidBurstingMaxIops: 102400,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.update(
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 *
 * @summary Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesPatch_ProvisionedV2.json
 */
async function updateShareProvisionedV2(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const shareName = "share6185";
  const fileShare: FileShare = {
    provisionedBandwidthMibps: 200,
    provisionedIops: 5000,
    shareQuota: 100,
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.update(
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 *
 * @summary Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesPatch.json
 */
async function updateShares(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const shareName = "share6185";
  const fileShare: FileShare = { metadata: { type: "image" } };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.update(
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateShareAcls();
  await updateSharePaidBursting();
  await updateShareProvisionedV2();
  await updateShares();
}

main().catch(console.error);
