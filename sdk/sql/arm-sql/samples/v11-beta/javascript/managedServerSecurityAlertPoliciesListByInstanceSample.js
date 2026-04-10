// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the managed server's threat detection policies.
 *
 * @summary get the managed server's threat detection policies.
 * x-ms-original-file: 2025-02-01-preview/ManagedServerSecurityAlertListByInstance.json
 */
async function getTheManagedServerThreatDetectionPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedServerSecurityAlertPolicies.listByInstance(
    "securityalert-4799",
    "securityalert-6440",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTheManagedServerThreatDetectionPolicies();
}

main().catch(console.error);
