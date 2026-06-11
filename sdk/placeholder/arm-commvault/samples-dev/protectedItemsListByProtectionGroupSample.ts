// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ProtectedItem resources by ProtectionGroup
 *
 * @summary list ProtectedItem resources by ProtectionGroup
 * x-ms-original-file: 2026-07-03-preview/ProtectedItems_ListByProtectionGroup_MaximumSet_Gen.json
 */
async function protectedItemsListByProtectionGroupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.protectedItems.listByProtectionGroup(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await protectedItemsListByProtectionGroupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
