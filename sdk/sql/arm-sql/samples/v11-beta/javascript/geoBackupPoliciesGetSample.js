// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Geo backup policy for the given database resource.
 *
 * @summary gets a Geo backup policy for the given database resource.
 * x-ms-original-file: 2025-02-01-preview/GeoBackupPoliciesGet.json
 */
async function getsTheSpecifiedGeoBackupPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.geoBackupPolicies.get(
    "sqlcrudtest-4799",
    "sqlcrudtest-5961",
    "testdw",
    "Default",
  );
  console.log(result);
}

async function main() {
  await getsTheSpecifiedGeoBackupPolicy();
}

main().catch(console.error);
