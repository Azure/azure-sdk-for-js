// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the subscriptions for a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary Lists the subscriptions for a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingSubscriptionsListByCustomer.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingSubscriptionsListByCustomer(): Promise<void> {
  const billingAccountName =
    "a1a9c77e-4cec-4a6c-a089-867d973a6074:a80d3b1f-c626-4e5e-82ed-1173bd91c838_2019-05-31";
  const billingProfileName = "ea36e548-1505-41db-bebc-46fff3d37998";
  const customerName = "Q7GV-UUVA-PJA-TGB";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingSubscriptions.listByCustomer(
    billingAccountName,
    billingProfileName,
    customerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await billingSubscriptionsListByCustomer();
}

main().catch(console.error);
