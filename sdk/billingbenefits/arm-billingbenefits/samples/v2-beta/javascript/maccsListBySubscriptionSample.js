// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list MACCs under a subscription from primary service tenant.
 *
 * @summary list MACCs under a subscription from primary service tenant.
 * x-ms-original-file: 2025-12-01-preview/MaccsListBySubscription.json
 */
async function maccsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maccs.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list MACCs under a subscription from primary service tenant.
 *
 * @summary list MACCs under a subscription from primary service tenant.
 * x-ms-original-file: 2025-12-01-preview/MaccsWithMilestonesListBySubscription.json
 */
async function maccsWithMilestonesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maccs.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await maccsListBySubscription();
  await maccsWithMilestonesListBySubscription();
}

main().catch(console.error);
