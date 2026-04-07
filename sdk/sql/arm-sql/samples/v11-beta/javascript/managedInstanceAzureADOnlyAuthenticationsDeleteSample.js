// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing server Active Directory only authentication property.
 *
 * @summary deletes an existing server Active Directory only authentication property.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAzureADOnlyAuthDelete.json
 */
async function deletesAzureActiveDirectoryOnlyAuthenticationObject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedInstanceAzureADOnlyAuthentications.delete(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "Default",
  );
}

async function main() {
  await deletesAzureActiveDirectoryOnlyAuthenticationObject();
}

main().catch(console.error);
