// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list cloud validations by subscription
 *
 * @summary list cloud validations by subscription
 * x-ms-original-file: 2026-07-01-preview/CloudValidations_ListBySubscription_MaximumSet_Gen.json
 */
async function cloudValidationsListBySubscriptionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
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
 * x-ms-original-file: 2026-07-01-preview/CloudValidations_ListBySubscription_MinimumSet_Gen.json
 */
async function cloudValidationsListBySubscriptionMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
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
