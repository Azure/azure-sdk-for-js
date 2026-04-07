// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property.
 *
 * @summary sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property.
 * x-ms-original-file: 2025-02-01-preview/AzureADOnlyAuthCreateOrUpdate.json
 */
async function createsOrUpdatesAzureActiveDirectoryOnlyAuthenticationObject(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverAzureADOnlyAuthentications.createOrUpdate(
    "sqlcrudtest-4799",
    "sqlcrudtest-6440",
    "Default",
    { azureADOnlyAuthentication: false },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAzureActiveDirectoryOnlyAuthenticationObject();
}

main().catch(console.error);
