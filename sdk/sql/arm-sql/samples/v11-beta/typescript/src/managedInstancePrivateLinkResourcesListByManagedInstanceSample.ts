// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources for SQL server.
 *
 * @summary gets the private link resources for SQL server.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstancePrivateLinkResourcesList.json
 */
async function getsPrivateLinkResourcesForSQL(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstancePrivateLinkResources.listByManagedInstance(
    "Default",
    "test-cl",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsPrivateLinkResourcesForSQL();
}

main().catch(console.error);
