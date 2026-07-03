// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list sqlServerEsuLicense resources in the subscription
 *
 * @summary list sqlServerEsuLicense resources in the subscription
 * x-ms-original-file: 2026-03-01-preview/ListSubscriptionSqlServerEsuLicense.json
 */
async function getsAllSQLServerESULicensesInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlServerEsuLicenses.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAllSQLServerESULicensesInASubscription();
}

main().catch(console.error);
