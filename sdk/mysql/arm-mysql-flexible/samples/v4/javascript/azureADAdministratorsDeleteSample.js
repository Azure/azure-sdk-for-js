// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Azure AD Administrator.
 *
 * @summary deletes an Azure AD Administrator.
 * x-ms-original-file: 2024-12-30/AzureADAdministratorDelete.json
 */
async function deleteAnAzureAdAdministrator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.azureADAdministrators.delete("testrg", "mysqltestsvc4", "ActiveDirectory");
}

async function main() {
  await deleteAnAzureAdAdministrator();
}

main().catch(console.error);
