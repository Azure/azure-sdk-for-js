// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvaultcontentstore";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to limits used for creation of resources.
 *
 * @summary limits used for creation of resources.
 * x-ms-original-file: 2026-07-03-preview/ProtectedItems_GetRestorePoints_MaximumSet_Gen.json
 */
async function protectedItemsGetRestorePointsMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.protectedItems.getRestorePoints(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
    "sample-protectedItemName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await protectedItemsGetRestorePointsMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
