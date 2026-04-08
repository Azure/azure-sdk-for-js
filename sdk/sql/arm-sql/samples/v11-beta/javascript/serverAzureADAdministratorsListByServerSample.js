// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Azure Active Directory administrators in a server.
 *
 * @summary gets a list of Azure Active Directory administrators in a server.
 * x-ms-original-file: 2025-02-01-preview/AdministratorList.json
 */
async function getsAListOfAzureActiveDirectoryAdministrator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverAzureADAdministrators.listByServer(
    "sqlcrudtest-4799",
    "sqlcrudtest-6440",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAListOfAzureActiveDirectoryAdministrator();
}

main().catch(console.error);
