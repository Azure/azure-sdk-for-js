// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a management operation on a managed instance.
 *
 * @summary gets a management operation on a managed instance.
 * x-ms-original-file: 2025-02-01-preview/GetManagedInstanceOperation.json
 */
async function getsTheManagedInstanceManagementOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstanceOperations.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "00000000-1111-2222-3333-444444444444",
  );
  console.log(result);
}

async function main() {
  await getsTheManagedInstanceManagementOperation();
}

main().catch(console.error);
