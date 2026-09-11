// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 *
 * @summary lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 * x-ms-original-file: 2026-06-01/LotsListByBillingAccount-Contributor.json
 */
async function lotsListByBillingAccountContributor() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByBillingAccount("1234:5678")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 *
 * @summary lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 * x-ms-original-file: 2026-06-01/LotsListByBillingAccount-Primary.json
 */
async function lotsListByBillingAccountPrimary() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByBillingAccount("1234:5678")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 *
 * @summary lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 * x-ms-original-file: 2026-06-01/LotsListByBillingAccount.json
 */
async function lotsListByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByBillingAccount("1234:5678")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 *
 * @summary lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 * x-ms-original-file: 2026-06-01/LotsListByBillingAccountWithFilters-Contributor.json
 */
async function lotsListByBillingAccountWithStatusFilterContributor() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByBillingAccount("1234:5678", {
    filter: "status eq 'active' AND source eq 'consumptioncommitment'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 *
 * @summary lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 * x-ms-original-file: 2026-06-01/LotsListByBillingAccountWithFilters-Primary.json
 */
async function lotsListByBillingAccountWithStatusFilterPrimary() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByBillingAccount("1234:5678", {
    filter: "status eq 'active' AND source eq 'consumptioncommitment'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 *
 * @summary lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 * x-ms-original-file: 2026-06-01/LotsListByBillingAccountWithFilters.json
 */
async function lotsListByBillingAccountWithStatusFilter() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByBillingAccount("1234:5678", {
    filter: "status eq 'active' AND source eq 'consumptioncommitment'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await lotsListByBillingAccountContributor();
  await lotsListByBillingAccountPrimary();
  await lotsListByBillingAccount();
  await lotsListByBillingAccountWithStatusFilterContributor();
  await lotsListByBillingAccountWithStatusFilterPrimary();
  await lotsListByBillingAccountWithStatusFilter();
}

main().catch(console.error);
