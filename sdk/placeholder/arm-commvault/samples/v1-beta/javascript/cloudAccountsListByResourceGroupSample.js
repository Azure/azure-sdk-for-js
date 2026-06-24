// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list CloudAccount resources by resource group
 *
 * @summary list CloudAccount resources by resource group
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_ListByResourceGroup_MaximumSet_Gen.json
 */
async function cloudAccountsListByResourceGroupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudAccounts.listByResourceGroup("rgcommvault")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudAccount resources by resource group
 *
 * @summary list CloudAccount resources by resource group
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_ListByResourceGroup_MinimumSet_Gen.json
 */
async function cloudAccountsListByResourceGroupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudAccounts.listByResourceGroup("rgcommvault")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cloudAccountsListByResourceGroupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await cloudAccountsListByResourceGroupMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
