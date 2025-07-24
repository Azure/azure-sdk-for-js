// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityEvalClient } from "@azure/arm-arizeaiobservabilityeval";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list OrganizationResource resources by subscription ID
 *
 * @summary list OrganizationResource resources by subscription ID
 * x-ms-original-file: 2024-10-01/Organizations_ListBySubscription_MaximumSet_Gen.json
 */
async function organizationsListBySubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4DEBE8B4-8BA4-42F8-AE50-FBEF318751D1";
  const client = new ObservabilityEvalClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationsListBySubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);
