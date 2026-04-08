// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a managed instance time zone.
 *
 * @summary gets a managed instance time zone.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceTimeZoneGet.json
 */
async function getManagedInstanceTimeZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "37d5e605-6142-4d79-b564-28b6dbfeec0f";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.timeZones.get("canadaeast", "Haiti Standard Time");
  console.log(result);
}

async function main() {
  await getManagedInstanceTimeZone();
}

main().catch(console.error);
