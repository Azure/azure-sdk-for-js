// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a managed instance administrator.
 *
 * @summary deletes a managed instance administrator.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAdministratorDelete.json
 */
async function deleteAdministratorOfManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedInstanceAdministrators.delete(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "ActiveDirectory",
  );
}

async function main() {
  await deleteAdministratorOfManagedInstance();
}

main().catch(console.error);
