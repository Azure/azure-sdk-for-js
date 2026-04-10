// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of recoverable databases.
 *
 * @summary gets a list of recoverable databases.
 * x-ms-original-file: 2025-02-01-preview/RecoverableDatabaseList.json
 */
async function getListOfRecoverableDatabases() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoverableDatabases.listByServer(
    "recoverabledatabasetest-1234",
    "recoverabledatabasetest-7177",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getListOfRecoverableDatabases();
}

main().catch(console.error);
