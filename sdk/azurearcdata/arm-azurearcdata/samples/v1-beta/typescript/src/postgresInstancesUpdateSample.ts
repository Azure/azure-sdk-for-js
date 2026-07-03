// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a postgres Instance resource
 *
 * @summary updates a postgres Instance resource
 * x-ms-original-file: 2026-03-01-preview/UpdatePostgresInstance.json
 */
async function updatesAPostgresInstancesTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.postgresInstances.update("testrg", "testpostgresInstance", {
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesAPostgresInstancesTags();
}

main().catch(console.error);
