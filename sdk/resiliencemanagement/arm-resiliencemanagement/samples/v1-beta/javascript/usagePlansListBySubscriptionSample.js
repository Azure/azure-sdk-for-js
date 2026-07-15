// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list UsagePlan resources by subscription ID
 *
 * @summary list UsagePlan resources by subscription ID
 * x-ms-original-file: 2026-04-01-preview/UsagePlans_ListBySubscription_MaximumSet_Gen.json
 */
async function usagePlansListBySubscriptionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureResilienceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usagePlans.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await usagePlansListBySubscriptionMaximumSet();
}

main().catch(console.error);
