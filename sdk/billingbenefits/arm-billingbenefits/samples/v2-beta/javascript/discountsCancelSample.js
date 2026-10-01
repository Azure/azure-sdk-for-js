// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel discount. Stops applying the benefit.
 *
 * @summary cancel discount. Stops applying the benefit.
 * x-ms-original-file: 2025-12-01-preview/DiscountCancel.json
 */
async function discountCancel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.discounts.cancel("testrg", "testdiscount");
  console.log(result);
}

async function main() {
  await discountCancel();
}

main().catch(console.error);
