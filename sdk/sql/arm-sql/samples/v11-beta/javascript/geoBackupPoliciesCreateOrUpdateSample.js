// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates a database geo backup policy.
 *
 * @summary Updates a database geo backup policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/stable/2014-04-01/examples/GeoBackupPoliciesCreateOrUpdate.json
 */
async function updateGeoBackupPolicy() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-4799";
  const serverName = "sqlcrudtest-5961";
  const databaseName = "testdw";
  const geoBackupPolicyName = "Default";
  const parameters = { state: "Enabled" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.geoBackupPolicies.createOrUpdate(
    resourceGroupName,
    serverName,
    databaseName,
    geoBackupPolicyName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateGeoBackupPolicy();
}

main().catch(console.error);
