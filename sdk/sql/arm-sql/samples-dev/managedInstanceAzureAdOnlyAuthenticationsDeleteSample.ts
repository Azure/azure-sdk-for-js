// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing server Active Directory only authentication property.
 *
 * @summary Deletes an existing server Active Directory only authentication property.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedInstanceAzureADOnlyAuthDelete.json
 */

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deletesAzureActiveDirectoryOnlyAuthenticationObject(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const authenticationName = "Default";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceAzureADOnlyAuthentications.beginDeleteAndWait(
    resourceGroupName,
    managedInstanceName,
    authenticationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletesAzureActiveDirectoryOnlyAuthenticationObject();
}

main().catch(console.error);
