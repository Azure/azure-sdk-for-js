// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the billing accounts that a user has access to.
 *
 * @summary lists the billing accounts that a user has access to.
 * x-ms-original-file: 2024-04-01/billingAccountForLegacyAccountDetails.json
 */
async function billingAccountForLegacyAccountDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingAccounts.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the billing accounts that a user has access to.
 *
 * @summary lists the billing accounts that a user has access to.
 * x-ms-original-file: 2024-04-01/billingAccountsList.json
 */
async function billingAccountsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingAccounts.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the billing accounts that a user has access to.
 *
 * @summary lists the billing accounts that a user has access to.
 * x-ms-original-file: 2024-04-01/billingAccountsListWithExpandForPONumber.json
 */
async function billingAccountsListWithExpandForPONumber(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingAccounts.list({
    expand: "soldTo,enrollmentDetails/poNumber",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingAccountForLegacyAccountDetails();
  await billingAccountsList();
  await billingAccountsListWithExpandForPONumber();
}

main().catch(console.error);
