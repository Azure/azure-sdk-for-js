// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list FileShare resources by subscription ID
 *
 * @summary list FileShare resources by subscription ID
 * x-ms-original-file: 2026-06-01/FileShares_ListBySubscription_MaximumSet_Gen.json
 */
async function fileSharesListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FileShare resources by subscription ID
 *
 * @summary list FileShare resources by subscription ID
 * x-ms-original-file: 2026-06-01/FileShares_ListBySubscription_MinimumSet_Gen.json
 */
async function fileSharesListBySubscriptionMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fileSharesListBySubscriptionMaximumSet();
  await fileSharesListBySubscriptionMinimumSet();
}

main().catch(console.error);
