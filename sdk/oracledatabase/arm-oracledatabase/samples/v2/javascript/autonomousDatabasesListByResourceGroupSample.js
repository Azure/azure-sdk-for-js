// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AutonomousDatabase resources by resource group
 *
 * @summary list AutonomousDatabase resources by resource group
 * x-ms-original-file: 2025-03-01/autonomousDatabase_listByResourceGroup.json
 */
async function autonomousDatabasesListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabases.listByResourceGroup("rg000")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await autonomousDatabasesListByResourceGroup();
}

main().catch(console.error);
