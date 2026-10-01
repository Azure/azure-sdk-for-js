// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to for the specified Azure region (location), subscription, and resource provider, get the history of the quota requests for the past year. To select specific quota requests, use the oData filter.
 *
 * @summary for the specified Azure region (location), subscription, and resource provider, get the history of the quota requests for the past year. To select specific quota requests, use the oData filter.
 * x-ms-original-file: 2020-10-25/getQuotaRequestsHistory.json
 */
async function quotaRequestHistory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.quotaRequestStatus.list(
    "3f75fdf7-977e-44ad-990d-99f14f0f299f",
    "Microsoft.Compute",
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await quotaRequestHistory();
}

main().catch(console.error);
