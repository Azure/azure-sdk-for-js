// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a payment method linked with a billing profile. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary gets a payment method linked with a billing profile. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/paymentMethodsGetByBillingProfile.json
 */
async function paymentMethodsGetByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.paymentMethods.getByBillingProfile(
    "00000000-0000-0000-0000-000000000032:00000000-0000-0000-0000-000000000099_2019-05-31",
    "ABC1-A1CD-AB1-BP1",
    "ABCDABCDABC0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await paymentMethodsGetByBillingProfile();
}

main().catch(console.error);
