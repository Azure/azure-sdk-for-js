// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list FileShare resources by resource group
 *
 * @summary list FileShare resources by resource group
 * x-ms-original-file: 2026-06-01/FileShares_ListByParent_MaximumSet_Gen.json
 */
async function fileSharesListByParentMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.listByParent("rgfileshares")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FileShare resources by resource group
 *
 * @summary list FileShare resources by resource group
 * x-ms-original-file: 2026-06-01/FileShares_ListByParent_MinimumSet_Gen.json
 */
async function fileSharesListByParentMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.listByParent("rgfileshares")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fileSharesListByParentMaximumSet();
  await fileSharesListByParentMinimumSet();
}

main().catch(console.error);
