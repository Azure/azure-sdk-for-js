// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a pair of virtual endpoints.
 *
 * @summary gets information about a pair of virtual endpoints.
 * x-ms-original-file: 2026-01-01-preview/VirtualEndpointsGet.json
 */
async function getInformationAboutAPairOfVirtualEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.virtualEndpoints.get(
    "exampleresourcegroup",
    "exampleserver",
    "examplebasename",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAPairOfVirtualEndpoints();
}

main().catch(console.error);
