// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a managed server's threat detection policy.
 *
 * @summary get a managed server's threat detection policy.
 * x-ms-original-file: 2025-02-01-preview/ManagedServerSecurityAlertGet.json
 */
async function getAManagedServerThreatDetectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedServerSecurityAlertPolicies.get(
    "securityalert-4799",
    "securityalert-6440",
    "Default",
  );
  console.log(result);
}

async function main() {
  await getAManagedServerThreatDetectionPolicy();
}

main().catch(console.error);
