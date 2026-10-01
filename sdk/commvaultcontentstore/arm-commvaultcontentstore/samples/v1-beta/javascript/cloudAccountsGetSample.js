// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CloudAccount
 *
 * @summary get a CloudAccount
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_Get_MaximumSet_Gen.json
 */
async function cloudAccountsGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.cloudAccounts.get("rgcommvault", "sample-cloudAccountName");
  console.log(result);
}

async function main() {
  await cloudAccountsGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
