// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of managed instance time zones by location.
 *
 * @summary gets a list of managed instance time zones by location.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceTimeZoneListByLocation.json
 */
async function listManagedInstanceTimeZonesByLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "37d5e605-6142-4d79-b564-28b6dbfeec0f";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.timeZones.listByLocation("canadaeast")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedInstanceTimeZonesByLocation();
}

main().catch(console.error);
