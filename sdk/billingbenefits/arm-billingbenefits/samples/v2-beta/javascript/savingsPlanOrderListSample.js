// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Savings plan orders.
 *
 * @summary list all Savings plan orders.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlanOrderList.json
 */
async function savingsPlanOrderList() {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlanOrder.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await savingsPlanOrderList();
}

main().catch(console.error);
