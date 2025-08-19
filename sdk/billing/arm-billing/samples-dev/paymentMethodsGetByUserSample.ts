// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a payment method owned by the caller.
 *
 * @summary Gets a payment method owned by the caller.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/paymentMethodsGetByUser.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getPaymentMethodOwnedByUser(): Promise<void> {
  const paymentMethodName = "ABCDABCDABC0";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.paymentMethods.getByUser(paymentMethodName);
  console.log(result);
}

async function main(): Promise<void> {
  await getPaymentMethodOwnedByUser();
}

main().catch(console.error);
