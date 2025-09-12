// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the reservations in the billing account and the roll up counts of reservations group by provisioning states.
 *
 * @summary Lists the reservations in the billing account and the roll up counts of reservations group by provisioning states.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/reservationsListByBillingAccount.json
 */

import type { ReservationsListByBillingAccountOptionalParams } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reservationsListByBillingAccount(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const selectedState = "Succeeded";
  const options: ReservationsListByBillingAccountOptionalParams = {
    selectedState,
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservations.listByBillingAccount(billingAccountName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationsListByBillingAccount();
}

main().catch(console.error);
