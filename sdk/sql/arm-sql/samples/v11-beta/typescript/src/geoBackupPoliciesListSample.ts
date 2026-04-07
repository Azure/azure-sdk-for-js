// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of Geo backup policies for the given database resource.
 *
 * @summary gets a list of Geo backup policies for the given database resource.
 * x-ms-original-file: 2025-02-01-preview/GeoBackupPoliciesList.json
 */
async function listGeoBackupPoliciesForTheGivenDatabaseResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.geoBackupPolicies.list(
    "sqlcrudtest-4799",
    "sqlcrudtest-5961",
    "testdw",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGeoBackupPoliciesForTheGivenDatabaseResource();
}

main().catch(console.error);
