// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list CloudAccount resources by subscription ID
 *
 * @summary list CloudAccount resources by subscription ID
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_ListBySubscription_MaximumSet_Gen.json
 */
async function cloudAccountsListBySubscriptionMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudAccounts.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudAccount resources by subscription ID
 *
 * @summary list CloudAccount resources by subscription ID
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_ListBySubscription_MinimumSet_Gen.json
 */
async function cloudAccountsListBySubscriptionMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudAccounts.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cloudAccountsListBySubscriptionMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await cloudAccountsListBySubscriptionMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
