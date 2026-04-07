// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a specific Azure Active Directory only authentication property.
 *
 * @summary gets a specific Azure Active Directory only authentication property.
 * x-ms-original-file: 2025-02-01-preview/AzureADOnlyAuthGet.json
 */
async function getsAAzureActiveDirectoryOnlyAuthenticationProperty(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverAzureADOnlyAuthentications.get(
    "sqlcrudtest-4799",
    "sqlcrudtest-6440",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAAzureActiveDirectoryOnlyAuthenticationProperty();
}

main().catch(console.error);
