// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvaultcontentstore";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Storage
 *
 * @summary get a Storage
 * x-ms-original-file: 2026-07-03-preview/Storages_Get_MaximumSet_Gen.json
 */
async function storagesGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.storages.get(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-storageName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storagesGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
