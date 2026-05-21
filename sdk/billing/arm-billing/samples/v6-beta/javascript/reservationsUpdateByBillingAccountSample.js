// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update reservation by billing account.
 *
 * @summary update reservation by billing account.
 * x-ms-original-file: 2024-04-01/reservationUpdateByBillingAccount.json
 */
async function reservationUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.updateByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
    { displayName: "NewName" },
  );
  console.log(result);
}

async function main() {
  await reservationUpdate();
}

main().catch(console.error);
