// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a database default Geo backup policy.
 *
 * @summary create or update a database default Geo backup policy.
 * x-ms-original-file: 2025-02-01-preview/GeoBackupPoliciesCreateOrUpdate.json
 */
async function createOrUpdateADatabaseDefaultGeoBackupPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.geoBackupPolicies.createOrUpdate(
    "sqlcrudtest-4799",
    "sqlcrudtest-5961",
    "testdw",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateADatabaseDefaultGeoBackupPolicy();
}

main().catch(console.error);
