// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the reservations for a billing profile and the roll up counts of reservations group by provisioning state.
 *
 * @summary lists the reservations for a billing profile and the roll up counts of reservations group by provisioning state.
 * x-ms-original-file: 2024-04-01/reservationsListByBillingProfile.json
 */
async function reservationsListByBillingProfile() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservations.listByBillingProfile(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "AAAA-AAAA-AAA-AAA",
    { selectedState: "Succeeded" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await reservationsListByBillingProfile();
}

main().catch(console.error);
