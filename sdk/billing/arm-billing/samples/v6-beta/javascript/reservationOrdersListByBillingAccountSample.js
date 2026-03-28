// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the ReservationOrders in the billing account.
 *
 * @summary list all the ReservationOrders in the billing account.
 * x-ms-original-file: 2024-04-01/reservationOrdersListByBillingAccount.json
 */
async function reservationOrderListByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationOrders.listByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await reservationOrderListByBillingAccount();
}

main().catch(console.error);
