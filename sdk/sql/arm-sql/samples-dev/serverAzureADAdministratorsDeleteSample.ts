// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the Azure Active Directory administrator with the given name.
 *
 * @summary deletes the Azure Active Directory administrator with the given name.
 * x-ms-original-file: 2025-02-01-preview/AdministratorDelete.json
 */
async function deleteAzureActiveDirectoryAdministrator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.serverAzureADAdministrators.delete(
    "sqlcrudtest-4799",
    "sqlcrudtest-6440",
    "ActiveDirectory",
  );
}

async function main(): Promise<void> {
  await deleteAzureActiveDirectoryAdministrator();
}

main().catch(console.error);
