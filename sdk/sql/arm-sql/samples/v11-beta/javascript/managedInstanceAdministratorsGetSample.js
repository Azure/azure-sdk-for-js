// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a managed instance administrator.
 *
 * @summary gets a managed instance administrator.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAdministratorGet.json
 */
async function getAdministratorOfManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceAdministrators.get(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "ActiveDirectory",
  );
  console.log(result);
}

async function main() {
  await getAdministratorOfManagedInstance();
}

main().catch(console.error);
