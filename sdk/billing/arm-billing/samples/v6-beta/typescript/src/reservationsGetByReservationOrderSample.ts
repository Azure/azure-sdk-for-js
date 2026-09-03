// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get specific Reservation details in the billing account.
 *
 * @summary get specific Reservation details in the billing account.
 * x-ms-original-file: 2024-04-01/reservationGetByBillingAccount.json
 */
async function reservationGetByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.getByReservationOrder(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get specific Reservation details in the billing account.
 *
 * @summary get specific Reservation details in the billing account.
 * x-ms-original-file: 2024-04-01/reservationGetByBillingAccountManagementGroup.json
 */
async function reservationGetByBillingAccountManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.getByReservationOrder(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get specific Reservation details in the billing account.
 *
 * @summary get specific Reservation details in the billing account.
 * x-ms-original-file: 2024-04-01/reservationGetByBillingAccountSingleResourceGroup.json
 */
async function reservationGetByBillingAccountSingleResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.getByReservationOrder(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get specific Reservation details in the billing account.
 *
 * @summary get specific Reservation details in the billing account.
 * x-ms-original-file: 2024-04-01/reservationGetByBillingAccountSingleScope.json
 */
async function reservationGetByBillingAccountSingleScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.getByReservationOrder(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reservationGetByBillingAccount();
  await reservationGetByBillingAccountManagementGroup();
  await reservationGetByBillingAccountSingleResourceGroup();
  await reservationGetByBillingAccountSingleScope();
}

main().catch(console.error);
