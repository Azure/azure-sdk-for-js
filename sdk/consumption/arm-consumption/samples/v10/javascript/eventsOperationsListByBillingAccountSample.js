// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 *
 * @summary lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 * x-ms-original-file: 2026-06-01/EventsGetByBillingAccount-Contributor.json
 */
async function eventsGetByBillingAccountContributor() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.eventsOperations.listByBillingAccount("1234:5678")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 *
 * @summary lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 * x-ms-original-file: 2026-06-01/EventsGetByBillingAccount-Primary.json
 */
async function eventsGetByBillingAccountPrimary() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.eventsOperations.listByBillingAccount("1234:5678")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 *
 * @summary lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 * x-ms-original-file: 2026-06-01/EventsGetByBillingAccount.json
 */
async function eventsGetByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.eventsOperations.listByBillingAccount("1234:5678")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 *
 * @summary lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 * x-ms-original-file: 2026-06-01/EventsGetByBillingAccountWithFilters-Contributor.json
 */
async function eventsGetByBillingAccountWithFiltersContributorJson() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.eventsOperations.listByBillingAccount("1234:5678", {
    filter: "lotid eq 'G202001083926600XXXXX' AND lotsource eq 'consumptioncommitment'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 *
 * @summary lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 * x-ms-original-file: 2026-06-01/EventsGetByBillingAccountWithFilters-Primary.json
 */
async function eventsGetByBillingAccountWithFiltersPrimary() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.eventsOperations.listByBillingAccount("1234:5678", {
    filter: "lotid eq 'G202001083926600XXXXX' AND lotsource eq 'consumptioncommitment'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 *
 * @summary lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 * x-ms-original-file: 2026-06-01/EventsGetByBillingAccountWithFilters.json
 */
async function eventsGetByBillingAccountWithFilters() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.eventsOperations.listByBillingAccount("1234:5678", {
    filter: "lotid eq 'G202001083926600XXXXX' AND lotsource eq 'consumptioncommitment'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await eventsGetByBillingAccountContributor();
  await eventsGetByBillingAccountPrimary();
  await eventsGetByBillingAccount();
  await eventsGetByBillingAccountWithFiltersContributorJson();
  await eventsGetByBillingAccountWithFiltersPrimary();
  await eventsGetByBillingAccountWithFilters();
}

main().catch(console.error);
