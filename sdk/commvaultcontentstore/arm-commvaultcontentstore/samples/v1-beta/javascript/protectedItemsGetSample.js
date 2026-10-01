// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ProtectedItem
 *
 * @summary get a ProtectedItem
 * x-ms-original-file: 2026-07-03-preview/ProtectedItems_Get_MaximumSet_Gen.json
 */
async function protectedItemsGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.protectedItems.get(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
    "sample-protectedItemName",
  );
  console.log(result);
}

async function main() {
  await protectedItemsGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
