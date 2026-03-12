// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Generates the reservations details report for provided date range asynchronously based on enrollment id. The Reservation usage details can be viewed only by certain enterprise roles. For more details on the roles see, https://learn.microsoft.com/azure/cost-management-billing/manage/understand-ea-roles#usage-and-costs-access-by-role
 *
 * @summary Generates the reservations details report for provided date range asynchronously based on enrollment id. The Reservation usage details can be viewed only by certain enterprise roles. For more details on the roles see, https://learn.microsoft.com/azure/cost-management-billing/manage/understand-ea-roles#usage-and-costs-access-by-role
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateReservationDetailsReportByBillingAccount.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reservationDetails(): Promise<void> {
  const billingAccountId = "9845612";
  const startDate = "2020-01-01";
  const endDate = "2020-01-30";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateReservationDetailsReport.beginByBillingAccountIdAndWait(
    billingAccountId,
    startDate,
    endDate,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reservationDetails();
}

main().catch(console.error);
