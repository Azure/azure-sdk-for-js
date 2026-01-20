// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all configurations (also known as server parameters) of a server.
 *
 * @summary lists all configurations (also known as server parameters) of a server.
 * x-ms-original-file: 2026-01-01-preview/ConfigurationsListByServer.json
 */
async function listAllConfigurationsAlsoKnownAsServerParametersOfAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurations.listByServer(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllConfigurationsAlsoKnownAsServerParametersOfAServer();
}

main().catch(console.error);
