// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesPut_NFS.json
 */
async function createNfsShares() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res346";
  const accountName = "sto666";
  const shareName = "share1235";
  const fileShare = { enabledProtocols: "NFS" };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create(
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesPut.json
 */
async function putShares() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const shareName = "share6185";
  const fileShare = {};
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create(
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesPut_AccessTier.json
 */
async function putSharesWithAccessTier() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res346";
  const accountName = "sto666";
  const shareName = "share1235";
  const fileShare = { accessTier: "Hot" };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create(
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesPut_PaidBursting.json
 */
async function putSharesWithPaidBursting() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res346";
  const accountName = "sto666";
  const shareName = "share1235";
  const fileShare = {
    fileSharePaidBursting: {
      paidBurstingEnabled: true,
      paidBurstingMaxBandwidthMibps: 10340,
      paidBurstingMaxIops: 102400,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create(
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesPut_ProvisionedV2.json
 */
async function putSharesProvisionedV2() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res346";
  const accountName = "sto666";
  const shareName = "share1235";
  const fileShare = {
    provisionedBandwidthMibps: 200,
    provisionedIops: 5000,
    shareQuota: 100,
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create(
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
  );
  console.log(result);
}

async function main() {
  await createNfsShares();
  await putShares();
  await putSharesWithAccessTier();
  await putSharesWithPaidBursting();
  await putSharesProvisionedV2();
}

main().catch(console.error);
