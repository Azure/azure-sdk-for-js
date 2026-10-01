// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list savings plans in an order.
 *
 * @summary list savings plans in an order.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlansInOrderList.json
 */
async function savingsPlansInOrderList() {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlan.list("20000000-0000-0000-0000-000000000000")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await savingsPlansInOrderList();
}

main().catch(console.error);
