// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list validation test catalog entries for a subscription
 *
 * @summary list validation test catalog entries for a subscription
 * x-ms-original-file: 2026-07-01-preview/ValidationTests_ListBySubscription_MaximumSet_Gen.json
 */
async function validationTestsListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validationTests.listBySubscription({ filter: "yolfvidccdfa" })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list validation test catalog entries for a subscription
 *
 * @summary list validation test catalog entries for a subscription
 * x-ms-original-file: 2026-07-01-preview/ValidationTests_ListBySubscription_MinimumSet_Gen.json
 */
async function validationTestsListBySubscriptionMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
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
