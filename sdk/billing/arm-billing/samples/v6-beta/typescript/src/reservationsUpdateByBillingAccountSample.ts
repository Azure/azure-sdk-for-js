// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update reservation by billing account.
 *
 * @summary update reservation by billing account.
 * x-ms-original-file: 2024-04-01/reservationUpdateByBillingAccount.json
 */
async function reservationUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.reservations.updateByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
    { displayName: "NewName" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reservationUpdate();
}

main().catch(console.error);
