// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Savings plan orders by billing account.
 *
 * @summary list all Savings plan orders by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlanOrderListByBillingAccount.json
 */
async function savingsPlanOrderList() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlanOrders.listByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await savingsPlanOrderList();
}

main().catch(console.error);
