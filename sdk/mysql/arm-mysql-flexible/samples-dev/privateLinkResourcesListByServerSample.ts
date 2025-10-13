// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the private link resources for MySQL server.
 *
 * @summary lists the private link resources for MySQL server.
 * x-ms-original-file: 2024-12-30/PrivateLinkResourcesList.json
 */
async function getsPrivateLinkResourcesForMySQL(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByServer("Default", "test-svr")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsPrivateLinkResourcesForMySQL();
}

main().catch(console.error);
