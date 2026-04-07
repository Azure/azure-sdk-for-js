// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of restorable dropped managed databases.
 *
 * @summary gets a list of restorable dropped managed databases.
 * x-ms-original-file: 2025-02-01-preview/RestorableDroppedManagedDatabaseListByManagedInstance.json
 */
async function listRestorableDroppedDatabasesByManagedInstances() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorableDroppedManagedDatabases.listByInstance(
    "Test1",
    "managedInstance",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRestorableDroppedDatabasesByManagedInstances();
}

main().catch(console.error);
