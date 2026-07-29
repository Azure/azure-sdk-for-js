// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list credits under a subscription from primary service tenant.
 *
 * @summary list credits under a subscription from primary service tenant.
 * x-ms-original-file: 2025-12-01-preview/CreditsListBySubscription.json
 */
async function creditsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.credits.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await creditsListBySubscription();
}

main().catch(console.error);
