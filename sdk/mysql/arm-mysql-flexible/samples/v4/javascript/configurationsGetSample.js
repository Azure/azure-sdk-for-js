// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a configuration of server.
 *
 * @summary gets information about a configuration of server.
 * x-ms-original-file: 2024-12-30/ConfigurationGet.json
 */
async function getAConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.get("TestGroup", "testserver", "event_scheduler");
  console.log(result);
}

async function main() {
  await getAConfiguration();
}

main().catch(console.error);
