// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a server's security alert policy.
 *
 * @summary get a server's security alert policy.
 * x-ms-original-file: 2025-02-01-preview/ServerSecurityAlertsGet.json
 */
async function getAServerThreatDetectionPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverSecurityAlertPolicies.get(
    "securityalert-4799",
    "securityalert-6440",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAServerThreatDetectionPolicy();
}

main().catch(console.error);
