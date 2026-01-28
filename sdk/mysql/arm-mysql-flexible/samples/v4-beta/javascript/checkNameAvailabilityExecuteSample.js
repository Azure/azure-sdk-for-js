// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check the availability of name for server
 *
 * @summary Check the availability of name for server
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/stable/2023-12-30/examples/CheckNameAvailability.json
 */

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function checkNameAvailability() {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "SouthEastAsia";
  const nameAvailabilityRequest = {
    name: "name1",
    type: "Microsoft.DBforMySQL/flexibleServers",
  };
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.checkNameAvailability.execute(locationName, nameAvailabilityRequest);
  console.log(result);
}

async function main() {
  await checkNameAvailability();
}

main().catch(console.error);
