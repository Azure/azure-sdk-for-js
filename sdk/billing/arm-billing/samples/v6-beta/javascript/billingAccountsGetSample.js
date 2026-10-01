// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a billing account by its ID.
 *
 * @summary gets a billing account by its ID.
 * x-ms-original-file: 2024-04-01/billingAccountWithExpandForPONumber.json
 */
async function billingAccountWithExpandForPONumber() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.get("8608480");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a billing account by its ID.
 *
 * @summary gets a billing account by its ID.
 * x-ms-original-file: 2024-04-01/billingAccountWithRegistrationNumberWithDefaultType.json
 */
async function billingAccountWithRegistrationNumberWithDefaultType() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.get(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a billing account by its ID.
 *
 * @summary gets a billing account by its ID.
 * x-ms-original-file: 2024-04-01/billingAccountWithRegistrationNumberWithType.json
 */
async function billingAccountWithRegistrationNumberWithType() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.get(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a billing account by its ID.
 *
 * @summary gets a billing account by its ID.
 * x-ms-original-file: 2024-04-01/billingAccountsGet.json
 */
async function billingAccountsGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.get(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a billing account by its ID.
 *
 * @summary gets a billing account by its ID.
 * x-ms-original-file: 2024-04-01/billingAccountsGetEA.json
 */
async function billingAccountsGetEA() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.get("6575495");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a billing account by its ID.
 *
 * @summary gets a billing account by its ID.
 * x-ms-original-file: 2024-04-01/billingAccountsGetWithExpand.json
 */
async function billingAccountsGetWithExpand() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.get(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
  );
  console.log(result);
}

async function main() {
  await billingAccountWithExpandForPONumber();
  await billingAccountWithRegistrationNumberWithDefaultType();
  await billingAccountWithRegistrationNumberWithType();
  await billingAccountsGet();
  await billingAccountsGetEA();
  await billingAccountsGetWithExpand();
}

main().catch(console.error);
