// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a specific Azure Active Directory only authentication property.
 *
 * @summary gets a specific Azure Active Directory only authentication property.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAzureADOnlyAuthGet.json
 */
async function getsAAzureActiveDirectoryOnlyAuthenticationProperty(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceAzureADOnlyAuthentications.get(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAAzureActiveDirectoryOnlyAuthenticationProperty();
}

main().catch(console.error);
