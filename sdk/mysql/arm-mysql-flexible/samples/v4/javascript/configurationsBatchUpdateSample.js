// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a list of configurations in a given server.
 *
 * @summary update a list of configurations in a given server.
 * x-ms-original-file: 2024-12-30/ConfigurationsBatchUpdate.json
 */
async function configurationList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.batchUpdate("testrg", "mysqltestserver", {
    resetAllToDefault: "False",
    value: [
      { name: "event_scheduler", properties: { value: "OFF" } },
      { name: "div_precision_increment", properties: { value: "8" } },
    ],
  });
  console.log(result);
}

async function main() {
  await configurationList();
}

main().catch(console.error);
