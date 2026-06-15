// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all shares.
 *
 * @summary lists all shares.
 * x-ms-original-file: 2026-04-01/DeletedFileSharesList.json
 */
async function listDeletedShares(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.list("res9290", "sto1590", { expand: "deleted" })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all shares.
 *
 * @summary lists all shares.
 * x-ms-original-file: 2026-04-01/FileShareSnapshotsList.json
 */
async function listShareSnapshots(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.list("res9290", "sto1590", { expand: "snapshots" })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all shares.
 *
 * @summary lists all shares.
 * x-ms-original-file: 2026-04-01/FileSharesList.json
 */
async function listShares(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.list("res9290", "sto1590")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all shares.
 *
 * @summary lists all shares.
 * x-ms-original-file: 2026-04-01/FileSharesList_PaidBursting.json
 */
async function listSharesPaidBursting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.list("res9290", "sto1590")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all shares.
 *
 * @summary lists all shares.
 * x-ms-original-file: 2026-04-01/FileSharesList_ProvisionedV2.json
 */
async function listSharesProvisionedV2(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.list("res9290", "sto1590")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDeletedShares();
  await listShareSnapshots();
  await listShares();
  await listSharesPaidBursting();
  await listSharesProvisionedV2();
}

main().catch(console.error);
