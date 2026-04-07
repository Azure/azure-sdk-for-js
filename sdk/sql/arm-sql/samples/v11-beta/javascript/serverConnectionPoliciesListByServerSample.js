// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists connection policy
 *
 * @summary lists connection policy
 * x-ms-original-file: 2025-02-01-preview/ServerConnectionPoliciesList.json
 */
async function listsAServersConnectionPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverConnectionPolicies.listByServer(
    "rgtest-12",
    "servertest-6285",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAServersConnectionPolicies();
}

main().catch(console.error);
