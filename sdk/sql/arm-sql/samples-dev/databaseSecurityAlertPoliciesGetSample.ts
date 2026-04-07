// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a database's security alert policy.
 *
 * @summary gets a database's security alert policy.
 * x-ms-original-file: 2025-02-01-preview/DatabaseSecurityAlertGet.json
 */
async function getADatabaseThreatDetectionPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseSecurityAlertPolicies.get(
    "securityalert-6852",
    "securityalert-2080",
    "testdb",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADatabaseThreatDetectionPolicy();
}

main().catch(console.error);
