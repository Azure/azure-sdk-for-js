// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ProtectionGroup
 *
 * @summary get a ProtectionGroup
 * x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Get_MaximumSet_Gen.json
 */
async function protectionGroupsGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.protectionGroups.get(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
  );
  console.log(result);
}

async function main() {
  await protectionGroupsGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
