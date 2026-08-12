// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvaultcontentstore";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a CloudAccount
 *
 * @summary delete a CloudAccount
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_Delete_MaximumSet_Gen.json
 */
async function cloudAccountsDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  await client.cloudAccounts.delete("rgcommvault", "sample-cloudAccountName");
}

async function main(): Promise<void> {
  await cloudAccountsDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
