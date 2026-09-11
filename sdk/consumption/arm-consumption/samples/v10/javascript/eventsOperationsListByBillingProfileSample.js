// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 *
 * @summary lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 * x-ms-original-file: 2026-06-01/EventsListByBillingProfile.json
 */
async function eventsListByBillingProfile() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.eventsOperations.listByBillingProfile(
    "1234:5678",
    "4268",
    "2019-09-01",
    "2019-10-31",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await eventsListByBillingProfile();
}

main().catch(console.error);
