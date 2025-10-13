// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list maintenances.
 *
 * @summary list maintenances.
 * x-ms-original-file: 2024-12-30/MaintenancesListByServer.json
 */
async function listMaintenancesOnAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenances.list("TestGroup", "testserver")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMaintenancesOnAServer();
}

main().catch(console.error);
