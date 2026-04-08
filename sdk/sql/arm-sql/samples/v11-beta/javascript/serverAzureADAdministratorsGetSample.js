// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Azure Active Directory administrator.
 *
 * @summary gets a Azure Active Directory administrator.
 * x-ms-original-file: 2025-02-01-preview/AdministratorGet.json
 */
async function getsAAzureActiveDirectoryAdministrator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverAzureADAdministrators.get(
    "sqlcrudtest-4799",
    "sqlcrudtest-6440",
    "ActiveDirectory",
  );
  console.log(result);
}

async function main() {
  await getsAAzureActiveDirectoryAdministrator();
}

main().catch(console.error);
