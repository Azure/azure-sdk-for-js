// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a managed instance administrator.
 *
 * @summary creates or updates a managed instance administrator.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAdministratorCreate.json
 */
async function createAdministratorOfManagedInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceAdministrators.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "ActiveDirectory",
    {
      administratorType: "ActiveDirectory",
      login: "bob@contoso.com",
      sid: "44444444-3333-2222-1111-000000000000",
      tenantId: "55555555-4444-3333-2222-111111111111",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a managed instance administrator.
 *
 * @summary creates or updates a managed instance administrator.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAdministratorUpdate.json
 */
async function updateAdministratorOfManagedInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceAdministrators.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "ActiveDirectory",
    {
      administratorType: "ActiveDirectory",
      login: "bob@contoso.com",
      sid: "44444444-3333-2222-1111-000000000000",
      tenantId: "55555555-4444-3333-2222-111111111111",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAdministratorOfManagedInstance();
  await updateAdministratorOfManagedInstance();
}

main().catch(console.error);
