// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the reservations in the billing account and the roll up counts of reservations group by provisioning states.
 *
 * @summary lists the reservations in the billing account and the roll up counts of reservations group by provisioning states.
 * x-ms-original-file: 2024-04-01/reservationsListByBillingAccount.json
 */
async function reservationsListByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservations.listByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    { selectedState: "Succeeded" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await reservationsListByBillingAccount();
}

main().catch(console.error);
