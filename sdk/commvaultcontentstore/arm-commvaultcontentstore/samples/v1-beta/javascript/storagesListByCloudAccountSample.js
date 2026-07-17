// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Storage resources by CloudAccount
 *
 * @summary list Storage resources by CloudAccount
 * x-ms-original-file: 2026-07-03-preview/Storages_ListByCloudAccount_MaximumSet_Gen.json
 */
async function storagesListByCloudAccountMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storages.listByCloudAccount(
    "rgcommvault",
    "sample-cloudAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storagesListByCloudAccountMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
