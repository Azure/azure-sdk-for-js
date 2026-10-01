// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates payment terms on a billing account with agreement type 'Microsoft Customer Agreement' and account type 'Enterprise'.
 *
 * @summary validates payment terms on a billing account with agreement type 'Microsoft Customer Agreement' and account type 'Enterprise'.
 * x-ms-original-file: 2024-04-01/paymentTermInvalid.json
 */
async function paymentTermInvalid(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.validatePaymentTerms(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    [
      {
        endDate: new Date("2023-01-25T22:39:34.2606750Z"),
        startDate: new Date("2023-02-05T22:39:34.2606750Z"),
        term: "net10",
      },
    ],
  );
  console.log(result);
}

/**
 * This sample demonstrates how to validates payment terms on a billing account with agreement type 'Microsoft Customer Agreement' and account type 'Enterprise'.
 *
 * @summary validates payment terms on a billing account with agreement type 'Microsoft Customer Agreement' and account type 'Enterprise'.
 * x-ms-original-file: 2024-04-01/paymentTermValid.json
 */
async function paymentTermValid(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.validatePaymentTerms(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    [
      {
        endDate: new Date("2023-01-25T22:39:34.2606750Z"),
        startDate: new Date("2023-01-05T22:39:34.2606750Z"),
        term: "net10",
      },
    ],
  );
  console.log(result);
}

async function main(): Promise<void> {
  await paymentTermInvalid();
  await paymentTermValid();
}

main().catch(console.error);
