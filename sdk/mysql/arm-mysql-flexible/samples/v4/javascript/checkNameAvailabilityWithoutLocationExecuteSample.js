// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the availability of name for server
 *
 * @summary check the availability of name for server
 * x-ms-original-file: 2024-12-30/CheckNameAvailabilityWithoutLocation.json
 */
async function checkNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.checkNameAvailabilityWithoutLocation.execute({
    name: "name1",
    type: "Microsoft.DBforMySQL/flexibleServers",
  });
  console.log(result);
}

async function main() {
  await checkNameAvailability();
}

main().catch(console.error);
