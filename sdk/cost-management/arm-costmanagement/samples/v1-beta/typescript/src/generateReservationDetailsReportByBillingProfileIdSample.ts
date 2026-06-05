// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates the reservations details report for provided date range asynchronously by billing profile. The Reservation usage details can be viewed by only certain enterprise roles by default. For more details on the roles see, https://docs.microsoft.com/en-us/azure/cost-management-billing/reservations/reservation-utilization#view-utilization-in-the-azure-portal-with-azure-rbac-access
 *
 * @summary generates the reservations details report for provided date range asynchronously by billing profile. The Reservation usage details can be viewed by only certain enterprise roles by default. For more details on the roles see, https://docs.microsoft.com/en-us/azure/cost-management-billing/reservations/reservation-utilization#view-utilization-in-the-azure-portal-with-azure-rbac-access
 * x-ms-original-file: 2025-03-01/GenerateReservationDetailsReportByBillingProfile.json
 */
async function reservationDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateReservationDetailsReport.byBillingProfileId(
    "00000000-0000-0000-0000-000000000000",
    "CZSFR-SDFXC-DSDF",
    "2020-01-01",
    "2020-01-30",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reservationDetails();
}

main().catch(console.error);
