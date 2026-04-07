// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of NSP configurations for a server.
 *
 * @summary gets a list of NSP configurations for a server.
 * x-ms-original-file: 2025-02-01-preview/NetworkSecurityPerimeterConfigurationsListByServer.json
 */
async function listNSPConfigsByServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.listByServer(
    "sqlcrudtest-7398",
    "sqlcrudtest-7398",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNSPConfigsByServer();
}

main().catch(console.error);
