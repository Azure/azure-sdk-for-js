// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a payment method owned by the caller.
 *
 * @summary gets a payment method owned by the caller.
 * x-ms-original-file: 2024-04-01/paymentMethodsGetByUser.json
 */
async function getPaymentMethodOwnedByUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.paymentMethods.getByUser("ABCDABCDABC0");
  console.log(result);
}

async function main(): Promise<void> {
  await getPaymentMethodOwnedByUser();
}

main().catch(console.error);
