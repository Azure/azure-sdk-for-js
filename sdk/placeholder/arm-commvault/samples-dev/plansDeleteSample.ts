// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a CommvaultPlan
 *
 * @summary delete a CommvaultPlan
 * x-ms-original-file: 2026-07-03-preview/Plans_Delete_MaximumSet_Gen.json
 */
async function plansDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  await client.plans.delete("rgcommvault", "sample-cloudAccountName", "sample-planName");
}

async function main(): Promise<void> {
  await plansDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
