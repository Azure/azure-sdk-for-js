// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HyperExecuteClient } from "@azure/arm-lambdatesthyperexecute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list OrganizationResource resources by subscription ID
 *
 * @summary list OrganizationResource resources by subscription ID
 * x-ms-original-file: 2024-02-01/Organizations_ListBySubscription_MaximumSet_Gen.json
 */
async function organizationsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "171E7A75-341B-4472-BC4C-7603C5AB9F32";
  const client = new HyperExecuteClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list OrganizationResource resources by subscription ID
 *
 * @summary list OrganizationResource resources by subscription ID
 * x-ms-original-file: 2024-02-01/Organizations_ListBySubscription_MinimumSet_Gen.json
 */
async function organizationsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "171E7A75-341B-4472-BC4C-7603C5AB9F32";
  const client = new HyperExecuteClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await organizationsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
