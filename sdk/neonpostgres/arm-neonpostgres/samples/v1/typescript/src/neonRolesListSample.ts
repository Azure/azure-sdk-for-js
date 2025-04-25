// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list NeonRole resources by Branch
 *
 * @summary list NeonRole resources by Branch
 * x-ms-original-file: 2025-03-01/NeonRoles_List_MaximumSet_Gen.json
 */
async function neonRolesListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neonRoles.list(
    "rgneon",
    "test-org",
    "entity-name",
    "entity-name",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await neonRolesListMaximumSet();
}

main().catch(console.error);
