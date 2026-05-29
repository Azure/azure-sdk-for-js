// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the Available Credit or Payment on Account Balance for a billing account. The credit balance can be used to settle due or past due invoices and is supported for billing accounts with agreement type Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with agreement type Microsoft Customer Agreement or Microsoft Online Services Program.
 *
 * @summary the Available Credit or Payment on Account Balance for a billing account. The credit balance can be used to settle due or past due invoices and is supported for billing accounts with agreement type Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with agreement type Microsoft Customer Agreement or Microsoft Online Services Program.
 * x-ms-original-file: 2024-04-01/availableBalanceGetByBillingAccount.json
 */
async function availableBalanceGetByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.availableBalances.getByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
  );
  console.log(result);
}

async function main() {
  await availableBalanceGetByBillingAccount();
}

main().catch(console.error);
