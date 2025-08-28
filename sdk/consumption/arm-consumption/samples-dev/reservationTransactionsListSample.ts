// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List of transactions for reserved instances on billing account scope
 *
 * @summary List of transactions for reserved instances on billing account scope
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationTransactionsListByEnrollmentNumber.json
 */

import type { ReservationTransactionsListOptionalParams } from "@azure/arm-consumption";
import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reservationTransactionsByEnrollmentNumber(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const filter = "properties/eventDate+ge+2020-05-20+AND+properties/eventDate+le+2020-05-30";
  const billingAccountId = "123456";
  const options: ReservationTransactionsListOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reservationTransactions.list(billingAccountId, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationTransactionsByEnrollmentNumber();
}

main().catch(console.error);
