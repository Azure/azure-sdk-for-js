// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the server's threat detection policies.
 *
 * @summary get the server's threat detection policies.
 * x-ms-original-file: 2025-02-01-preview/ServerSecurityAlertsListByServer.json
 */
async function listTheServerThreatDetectionPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverSecurityAlertPolicies.listByServer(
    "securityalert-4799",
    "securityalert-6440",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheServerThreatDetectionPolicies();
}

main().catch(console.error);
