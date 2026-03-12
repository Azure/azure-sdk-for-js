// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the reservations for a billing profile and the roll up counts of reservations group by provisioning state.
 *
 * @summary Lists the reservations for a billing profile and the roll up counts of reservations group by provisioning state.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/reservationsListByBillingProfile.json
 */

import type { ReservationsListByBillingProfileOptionalParams } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reservationsListByBillingProfile(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingProfileName = "AAAA-AAAA-AAA-AAA";
  const selectedState = "Succeeded";
  const options: ReservationsListByBillingProfileOptionalParams = {
    selectedState,
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservations.listByBillingProfile(
    billingAccountName,
    billingProfileName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationsListByBillingProfile();
}

main().catch(console.error);
