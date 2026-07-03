// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a postgres Instance resource
 *
 * @summary deletes a postgres Instance resource
 * x-ms-original-file: 2026-03-01-preview/DeletePostgresInstance.json
 */
async function deletesAPostgresInstances(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.postgresInstances.delete("testrg", "testpostgresInstance");
}

async function main(): Promise<void> {
  await deletesAPostgresInstances();
}

main().catch(console.error);
