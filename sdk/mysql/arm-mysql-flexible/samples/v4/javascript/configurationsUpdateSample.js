// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a configuration of a server.
 *
 * @summary updates a configuration of a server.
 * x-ms-original-file: 2024-12-30/ConfigurationUpdate.json
 */
async function updateAUserConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.update("testrg", "testserver", "event_scheduler", {
    properties: { source: "user-override", value: "on" },
  });
  console.log(result);
}

async function main() {
  await updateAUserConfiguration();
}

main().catch(console.error);
