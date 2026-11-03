// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a savings plan order by billing account.
 *
 * @summary get a savings plan order by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlanOrderExpandedScheduleGetByBillingAccount.json
 */
async function savingsPlanOrderWithExpandedPaymentsGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlanOrders.getByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a savings plan order by billing account.
 *
 * @summary get a savings plan order by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlanOrderGetByBillingAccount.json
 */
async function savingsPlanOrderGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlanOrders.getByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await savingsPlanOrderWithExpandedPaymentsGet();
  await savingsPlanOrderGet();
}

main().catch(console.error);
