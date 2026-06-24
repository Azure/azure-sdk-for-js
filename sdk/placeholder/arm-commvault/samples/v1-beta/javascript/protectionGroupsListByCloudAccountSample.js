// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ProtectionGroup resources by CloudAccount
 *
 * @summary list ProtectionGroup resources by CloudAccount
 * x-ms-original-file: 2026-07-03-preview/ProtectionGroups_ListByCloudAccount_MaximumSet_Gen.json
 */
async function protectionGroupsListByCloudAccountMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.protectionGroups.listByCloudAccount(
    "rgcommvault",
    "sample-cloudAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await protectionGroupsListByCloudAccountMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
