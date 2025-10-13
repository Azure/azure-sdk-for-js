// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about an azure ad administrator.
 *
 * @summary gets information about an azure ad administrator.
 * x-ms-original-file: 2024-12-30/AzureADAdministratorGet.json
 */
async function getAnAzureAdAdministrator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.azureADAdministrators.get(
    "testrg",
    "mysqltestsvc4",
    "ActiveDirectory",
  );
  console.log(result);
}

async function main() {
  await getAnAzureAdAdministrator();
}

main().catch(console.error);
