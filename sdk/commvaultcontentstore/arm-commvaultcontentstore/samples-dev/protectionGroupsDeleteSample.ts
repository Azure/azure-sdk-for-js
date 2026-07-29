// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvaultcontentstore";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ProtectionGroup
 *
 * @summary delete a ProtectionGroup
 * x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Delete_MaximumSet_Gen.json
 */
async function protectionGroupsDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  await client.protectionGroups.delete(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
  );
}

async function main(): Promise<void> {
  await protectionGroupsDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
