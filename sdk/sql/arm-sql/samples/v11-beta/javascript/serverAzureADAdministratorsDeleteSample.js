// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the Azure Active Directory administrator with the given name.
 *
 * @summary deletes the Azure Active Directory administrator with the given name.
 * x-ms-original-file: 2025-02-01-preview/AdministratorDelete.json
 */
async function deleteAzureActiveDirectoryAdministrator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.serverAzureADAdministrators.delete(
    "sqlcrudtest-4799",
    "sqlcrudtest-6440",
    "ActiveDirectory",
  );
}

async function main() {
  await deleteAzureActiveDirectoryAdministrator();
}

main().catch(console.error);
