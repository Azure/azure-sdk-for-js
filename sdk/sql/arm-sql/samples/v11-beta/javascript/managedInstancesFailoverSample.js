// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to failovers a managed instance.
 *
 * @summary failovers a managed instance.
 * x-ms-original-file: 2025-02-01-preview/FailoverManagedInstance.json
 */
async function failoverAManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.managedInstances.failover("group1", "instanceName", { replicaType: "Primary" });
}

async function main() {
  await failoverAManagedInstance();
}

main().catch(console.error);
