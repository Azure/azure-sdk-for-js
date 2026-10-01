// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list savings plans in an order by billing account.
 *
 * @summary list savings plans in an order by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlansListBySavingsPlanOrders.json
 */
async function savingsPlansInOrderList() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlans.listBySavingsPlanOrder(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await savingsPlansInOrderList();
}

main().catch(console.error);
