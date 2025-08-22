// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a payment method owned by the caller.
 *
 * @summary Deletes a payment method owned by the caller.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/paymentMethodsDeleteByUser.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deletePaymentMethodOwnedByUser(): Promise<void> {
  const paymentMethodName = "ABCDABCDABC0";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.paymentMethods.deleteByUser(paymentMethodName);
  console.log(result);
}

async function main(): Promise<void> {
  await deletePaymentMethodOwnedByUser();
}

main().catch(console.error);
