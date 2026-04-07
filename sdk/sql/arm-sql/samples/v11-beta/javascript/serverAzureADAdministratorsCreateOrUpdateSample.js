// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an existing Azure Active Directory administrator.
 *
 * @summary creates or updates an existing Azure Active Directory administrator.
 * x-ms-original-file: 2025-02-01-preview/AdministratorCreateOrUpdate.json
 */
async function createsOrUpdatesAnExistingAzureActiveDirectoryAdministrator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverAzureADAdministrators.createOrUpdate(
    "sqlcrudtest-4799",
    "sqlcrudtest-6440",
    "ActiveDirectory",
    {
      administratorType: "ActiveDirectory",
      login: "bob@contoso.com",
      sid: "c6b82b90-a647-49cb-8a62-0d2d3cb7ac7c",
      tenantId: "c6b82b90-a647-49cb-8a62-0d2d3cb7ac7c",
    },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesAnExistingAzureActiveDirectoryAdministrator();
}

main().catch(console.error);
