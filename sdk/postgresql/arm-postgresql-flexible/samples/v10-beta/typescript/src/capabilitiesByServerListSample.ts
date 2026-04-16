// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the capabilities available for a given server.
 *
 * @summary lists the capabilities available for a given server.
 * x-ms-original-file: 2026-01-01-preview/CapabilitiesByServerList.json
 */
async function listTheCapabilitiesAvailableForAGivenServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capabilitiesByServer.list(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheCapabilitiesAvailableForAGivenServer();
}

main().catch(console.error);
