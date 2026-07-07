// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves a postgres Instance resource
 *
 * @summary retrieves a postgres Instance resource
 * x-ms-original-file: 2026-03-01-preview/GetPostgresInstance.json
 */
async function getsAPostgresInstances(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.postgresInstances.get("testrg", "testpostgresInstances");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAPostgresInstances();
}

main().catch(console.error);
