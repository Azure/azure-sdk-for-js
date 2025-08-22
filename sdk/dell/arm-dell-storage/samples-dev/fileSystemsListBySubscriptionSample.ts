// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list FileSystemResource resources by subscription ID
 *
 * @summary list FileSystemResource resources by subscription ID
 * x-ms-original-file: 2025-03-21-preview/FileSystems_ListBySubscription_MaximumSet_Gen.json
 */

import { StorageClient } from "@azure/arm-dell-storage";
import { DefaultAzureCredential } from "@azure/identity";

async function fileSystemsListBySubscriptionMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4B6E265D-57CF-4A9D-8B35-3CC68ED9D208";
  const client = new StorageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FileSystemResource resources by subscription ID
 *
 * @summary list FileSystemResource resources by subscription ID
 * x-ms-original-file: 2025-03-21-preview/FileSystems_ListBySubscription_MinimumSet_Gen.json
 */
async function fileSystemsListBySubscriptionMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BF7E7352-2FE4-4163-9CF7-5FF8EC2E9B92";
  const client = new StorageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fileSystemsListBySubscriptionMaximumSetGen();
  await fileSystemsListBySubscriptionMinimumSetGen();
}

main().catch(console.error);
