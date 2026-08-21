// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list validation test category catalog entries for a subscription
 *
 * @summary list validation test category catalog entries for a subscription
 * x-ms-original-file: 2026-07-01-preview/ValidationTestCategories_ListBySubscription_MaximumSet_Gen.json
 */
async function validationTestCategoriesListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validationTestCategories.listBySubscription({
    filter: "yolfvidccdfa",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list validation test category catalog entries for a subscription
 *
 * @summary list validation test category catalog entries for a subscription
 * x-ms-original-file: 2026-07-01-preview/ValidationTestCategories_ListBySubscription_MinimumSet_Gen.json
 */
async function validationTestCategoriesListBySubscriptionMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validationTestCategories.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await validationTestCategoriesListBySubscriptionMaximumSet();
  await validationTestCategoriesListBySubscriptionMinimumSet();
}

main().catch(console.error);
