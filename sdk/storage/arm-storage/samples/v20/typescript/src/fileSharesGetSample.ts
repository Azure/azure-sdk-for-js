// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets properties of a specified share.
 *
 * @summary gets properties of a specified share.
 * x-ms-original-file: 2025-08-01/FileSharesGet.json
 */
async function getShares(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.get("res9871", "sto6217", "share1634");
  console.log(result);
}

/**
 * This sample demonstrates how to gets properties of a specified share.
 *
 * @summary gets properties of a specified share.
 * x-ms-original-file: 2025-08-01/FileSharesGet_PaidBursting.json
 */
async function getSharePaidBursting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.get("res9871", "sto6217", "share1634");
  console.log(result);
}

/**
 * This sample demonstrates how to gets properties of a specified share.
 *
 * @summary gets properties of a specified share.
 * x-ms-original-file: 2025-08-01/FileSharesGet_ProvisionedV2.json
 */
async function getShareProvisionedV2(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.get("res9871", "sto6217", "share1634");
  console.log(result);
}

/**
 * This sample demonstrates how to gets properties of a specified share.
 *
 * @summary gets properties of a specified share.
 * x-ms-original-file: 2025-08-01/FileSharesGet_Stats.json
 */
async function getShareStats(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.get("res9871", "sto6217", "share1634", {
    expand: "stats",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getShares();
  await getSharePaidBursting();
  await getShareProvisionedV2();
  await getShareStats();
}

main().catch(console.error);
