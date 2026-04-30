// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a server's security alert policy.
 *
 * @summary get a server's security alert policy.
 * x-ms-original-file: 2025-02-01-preview/ServerSecurityAlertsGet.json
 */
async function getAServerThreatDetectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverSecurityAlertPolicies.get(
    "securityalert-4799",
    "securityalert-6440",
    "Default",
  );
  console.log(result);
}

async function main() {
  await getAServerThreatDetectionPolicy();
}

main().catch(console.error);
