// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CommvaultPlan
 *
 * @summary get a CommvaultPlan
 * x-ms-original-file: 2026-07-03-preview/Plans_Get_MaximumSet_Gen.json
 */
async function plansGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.plans.get(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-planName",
  );
  console.log(result);
}

async function main() {
  await plansGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
