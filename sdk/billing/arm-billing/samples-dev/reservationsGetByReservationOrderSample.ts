// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get specific Reservation details in the billing account.
 *
 * @summary Get specific Reservation details in the billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/reservationGetByBillingAccount.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reservationGetByBillingAccount(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const reservationOrderId = "20000000-0000-0000-0000-000000000000";
  const reservationId = "30000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.getByReservationOrder(
    billingAccountName,
    reservationOrderId,
    reservationId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get specific Reservation details in the billing account.
 *
 * @summary Get specific Reservation details in the billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/reservationGetByBillingAccountManagementGroup.json
 */
async function reservationGetByBillingAccountManagementGroup(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const reservationOrderId = "20000000-0000-0000-0000-000000000000";
  const reservationId = "30000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.getByReservationOrder(
    billingAccountName,
    reservationOrderId,
    reservationId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get specific Reservation details in the billing account.
 *
 * @summary Get specific Reservation details in the billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/reservationGetByBillingAccountSingleResourceGroup.json
 */
async function reservationGetByBillingAccountSingleResourceGroup(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const reservationOrderId = "20000000-0000-0000-0000-000000000000";
  const reservationId = "30000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.getByReservationOrder(
    billingAccountName,
    reservationOrderId,
    reservationId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get specific Reservation details in the billing account.
 *
 * @summary Get specific Reservation details in the billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/reservationGetByBillingAccountSingleScope.json
 */
async function reservationGetByBillingAccountSingleScope(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const reservationOrderId = "20000000-0000-0000-0000-000000000000";
  const reservationId = "30000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.getByReservationOrder(
    billingAccountName,
    reservationOrderId,
    reservationId,
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
