// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Available Credit or Payment on Account Balance for a billing profile. The credit balance can be used to settle due or past due invoices and is supported for billing accounts with agreement type Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary the Available Credit or Payment on Account Balance for a billing profile. The credit balance can be used to settle due or past due invoices and is supported for billing accounts with agreement type Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/availableBalanceGetByBillingProfile.json
 */
async function availableBalanceGetByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.availableBalances.getByBillingProfile(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await availableBalanceGetByBillingProfile();
}

main().catch(console.error);
