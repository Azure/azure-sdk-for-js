// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the payment methods owned by the caller.
 *
 * @summary lists the payment methods owned by the caller.
 * x-ms-original-file: 2024-04-01/paymentMethodsListByUser.json
 */
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
