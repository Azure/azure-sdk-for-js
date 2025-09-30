// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FileSharesGetOptionalParams} from "@azure/arm-storage";
import {
  StorageManagementClient,
} from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets properties of a specified share.
 *
 * @summary Gets properties of a specified share.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesGet_PaidBursting.json
 */
async function getSharePaidBursting(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9871";
  const accountName = "sto6217";
  const shareName = "share1634";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.get(
    resourceGroupName,
    accountName,
    shareName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets properties of a specified share.
 *
 * @summary Gets properties of a specified share.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesGet_ProvisionedV2.json
 */
async function getShareProvisionedV2(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9871";
  const accountName = "sto6217";
  const shareName = "share1634";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.get(
    resourceGroupName,
    accountName,
    shareName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets properties of a specified share.
 *
 * @summary Gets properties of a specified share.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesGet_Stats.json
 */
async function getShareStats(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9871";
  const accountName = "sto6217";
  const shareName = "share1634";
  const expand = "stats";
  const options: FileSharesGetOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.get(
    resourceGroupName,
    accountName,
    shareName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets properties of a specified share.
 *
 * @summary Gets properties of a specified share.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileSharesGet.json
 */
async function getShares(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9871";
  const accountName = "sto6217";
  const shareName = "share1634";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.get(
    resourceGroupName,
    accountName,
    shareName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSharePaidBursting();
  await getShareProvisionedV2();
  await getShareStats();
  await getShares();
}

main().catch(console.error);
