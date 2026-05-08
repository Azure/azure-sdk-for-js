// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: 2025-08-01/FileSharesPut.json
 */
async function putShares(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create("res3376", "sto328", "share6185", {});
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: 2025-08-01/FileSharesPut_AccessTier.json
 */
async function putSharesWithAccessTier(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create("res346", "sto666", "share1235", {
    fileShareProperties: { accessTier: "Hot" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: 2025-08-01/FileSharesPut_NFS.json
 */
async function createNFSShares(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create("res346", "sto666", "share1235", {
    fileShareProperties: { enabledProtocols: "NFS" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: 2025-08-01/FileSharesPut_PaidBursting.json
 */
async function putSharesWithPaidBursting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create("res346", "sto666", "share1235", {
    fileShareProperties: {
      fileSharePaidBursting: {
        paidBurstingEnabled: true,
        paidBurstingMaxBandwidthMibps: 10340,
        paidBurstingMaxIops: 102400,
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @summary creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 * x-ms-original-file: 2025-08-01/FileSharesPut_ProvisionedV2.json
 */
async function putSharesProvisionedV2(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.create("res346", "sto666", "share1235", {
    fileShareProperties: { provisionedBandwidthMibps: 200, provisionedIops: 5000, shareQuota: 100 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putShares();
  await putSharesWithAccessTier();
  await createNFSShares();
  await putSharesWithPaidBursting();
  await putSharesProvisionedV2();
}

main().catch(console.error);
