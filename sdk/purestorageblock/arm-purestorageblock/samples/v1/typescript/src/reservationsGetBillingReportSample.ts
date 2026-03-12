// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides a summarized report along with actions for resources billed via given reservation
 *
 * @summary provides a summarized report along with actions for resources billed via given reservation
 * x-ms-original-file: 2024-11-01/Reservations_GetBillingReport_MaximumSet_Gen.json
 */
async function reservationsGetBillingReportMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.getBillingReport("rgpurestorage", "reservationname");
  console.log(result);
}

async function main(): Promise<void> {
  await reservationsGetBillingReportMaximumSet();
}

main().catch(console.error);
