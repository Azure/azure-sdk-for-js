// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a managed instance time zone.
 *
 * @summary gets a managed instance time zone.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceTimeZoneGet.json
 */
async function getManagedInstanceTimeZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "37d5e605-6142-4d79-b564-28b6dbfeec0f";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.timeZones.get("canadaeast", "Haiti Standard Time");
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedInstanceTimeZone();
}

main().catch(console.error);
