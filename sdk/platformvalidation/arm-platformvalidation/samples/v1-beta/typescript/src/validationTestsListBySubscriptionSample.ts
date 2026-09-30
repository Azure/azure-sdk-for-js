// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list validation test catalog entries for a subscription
 *
 * @summary list validation test catalog entries for a subscription
 * x-ms-original-file: 2026-08-01-preview/ValidationTests_ListBySubscription_MaximumSet_Gen.json
 */
async function validationTestsListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validationTests.listBySubscription({
    filter: "audience eq 'Public'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list validation test catalog entries for a subscription
 *
 * @summary list validation test catalog entries for a subscription
 * x-ms-original-file: 2026-08-01-preview/ValidationTests_ListBySubscription_MinimumSet_Gen.json
 */
async function validationTestsListBySubscriptionMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validationTests.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await validationTestsListBySubscriptionMaximumSet();
  await validationTestsListBySubscriptionMinimumSet();
}

main().catch(console.error);
