// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a SQL Managed Instance resource
 *
 * @summary updates a SQL Managed Instance resource
 * x-ms-original-file: 2026-03-01-preview/UpdateSqlManagedInstance.json
 */
async function updatesASqlInstanceTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlManagedInstances.update("testrg", "testsqlManagedInstance", {
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesASqlInstanceTags();
}

main().catch(console.error);
