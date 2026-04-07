// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets server usages.
 *
 * @summary gets server usages.
 * x-ms-original-file: 2025-02-01-preview/ServerUsageList.json
 */
async function listServersUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverUsages.listByServer(
    "sqlcrudtest-6730",
    "sqlcrudtest-9007",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listServersUsages();
}

main().catch(console.error);
