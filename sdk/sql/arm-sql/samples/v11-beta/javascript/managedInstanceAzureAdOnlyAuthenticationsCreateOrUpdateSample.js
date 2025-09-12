// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property.
 *
 * @summary Sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedInstanceAzureADOnlyAuthCreateOrUpdate.json
 */
async function createsOrUpdatesAzureActiveDirectoryOnlyAuthenticationObject() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const authenticationName = "Default";
  const parameters = {
    azureADOnlyAuthentication: false,
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceAzureADOnlyAuthentications.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    authenticationName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesAzureActiveDirectoryOnlyAuthenticationObject();
}

main().catch(console.error);
