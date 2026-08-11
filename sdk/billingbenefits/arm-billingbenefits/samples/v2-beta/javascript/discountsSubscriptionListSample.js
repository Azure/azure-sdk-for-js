// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list discounts at subscription level
 *
 * @summary list discounts at subscription level
 * x-ms-original-file: 2025-12-01-preview/DiscountList.json
 */
async function discountSubscriptionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.discounts.subscriptionList()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await discountSubscriptionList();
}

main().catch(console.error);
