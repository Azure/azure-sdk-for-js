// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list cloud validations by subscription
 *
 * @summary list cloud validations by subscription
 * x-ms-original-file: 2026-08-01-preview/CloudValidations_ListBySubscription_MaximumSet_Gen.json
 */
async function cloudValidationsListBySubscriptionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudValidations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list cloud validations by subscription
 *
 * @summary list cloud validations by subscription
 * x-ms-original-file: 2026-08-01-preview/CloudValidations_ListBySubscription_MinimumSet_Gen.json
 */
async function cloudValidationsListBySubscriptionMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudValidations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cloudValidationsListBySubscriptionMaximumSet();
  await cloudValidationsListBySubscriptionMinimumSet();
}

main().catch(console.error);
