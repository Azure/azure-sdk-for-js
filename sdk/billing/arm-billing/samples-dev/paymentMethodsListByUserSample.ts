// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the payment methods owned by the caller.
 *
 * @summary Lists the payment methods owned by the caller.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/paymentMethodsListByUser.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPaymentMethodOwnedByUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.paymentMethods.listByUser()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listPaymentMethodOwnedByUser();
}

main().catch(console.error);
