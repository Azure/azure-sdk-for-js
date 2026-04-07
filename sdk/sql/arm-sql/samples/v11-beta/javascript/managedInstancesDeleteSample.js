// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a managed instance.
 *
 * @summary deletes a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceDelete.json
 */
async function deleteManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedInstances.delete("testrg", "testinstance");
}

async function main() {
  await deleteManagedInstance();
}

main().catch(console.error);
