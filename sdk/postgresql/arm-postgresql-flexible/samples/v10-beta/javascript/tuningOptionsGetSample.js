// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the tuning options of a server.
 *
 * @summary gets the tuning options of a server.
 * x-ms-original-file: 2026-01-01-preview/TuningOptionsGet.json
 */
async function getTheTuningOptionsOfAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.tuningOptions.get("exampleresourcegroup", "exampleserver", "index");
  console.log(result);
}

async function main() {
  await getTheTuningOptionsOfAServer();
}

main().catch(console.error);
