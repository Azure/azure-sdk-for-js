// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the AAD administrators in a given server.
 *
 * @summary list all the AAD administrators in a given server.
 * x-ms-original-file: 2024-12-30/AzureADAdministratorsListByServer.json
 */
async function listAzureADAdministratorsInAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureADAdministrators.listByServer("testrg", "mysqltestsvc4")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAzureADAdministratorsInAServer();
}

main().catch(console.error);
