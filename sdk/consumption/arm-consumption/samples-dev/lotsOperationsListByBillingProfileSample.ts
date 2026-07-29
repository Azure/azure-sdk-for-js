// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Azure credits for a billing account or a billing profile. The API is only supported for Microsoft Customer Agreements (MCA) billing accounts.
 *
 * @summary lists all Azure credits for a billing account or a billing profile. The API is only supported for Microsoft Customer Agreements (MCA) billing accounts.
 * x-ms-original-file: 2024-08-01/LotsListByBillingProfile.json
 */
async function lotsListByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByBillingProfile("1234:5678", "2468")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await lotsListByBillingProfile();
}

main().catch(console.error);
