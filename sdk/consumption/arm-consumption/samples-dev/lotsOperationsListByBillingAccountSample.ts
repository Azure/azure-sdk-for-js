// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 *
 * @summary lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 * x-ms-original-file: 2024-08-01/LotsListByBillingAccount-Contributor.json
 */
async function lotsListByBillingAccountContributor(): Promise<void> {
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
 * x-ms-original-file: 2024-08-01/LotsListByBillingAccount-Primary.json
 */
async function lotsListByBillingAccountPrimary(): Promise<void> {
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
 * x-ms-original-file: 2024-08-01/LotsListByBillingAccount.json
 */
async function lotsListByBillingAccount(): Promise<void> {
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
 * x-ms-original-file: 2024-08-01/LotsListByBillingAccountWithFilters-Contributor.json
 */
async function lotsListByBillingAccountWithStatusFilterContributor(): Promise<void> {
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
 * x-ms-original-file: 2024-08-01/LotsListByBillingAccountWithFilters-Primary.json
 */
async function lotsListByBillingAccountWithStatusFilterPrimary(): Promise<void> {
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
 * x-ms-original-file: 2024-08-01/LotsListByBillingAccountWithFilters.json
 */
async function lotsListByBillingAccountWithStatusFilter(): Promise<void> {
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

async function main(): Promise<void> {
  await lotsListByBillingAccountContributor();
  await lotsListByBillingAccountPrimary();
  await lotsListByBillingAccount();
  await lotsListByBillingAccountWithStatusFilterContributor();
  await lotsListByBillingAccountWithStatusFilterPrimary();
  await lotsListByBillingAccountWithStatusFilter();
}

main().catch(console.error);
