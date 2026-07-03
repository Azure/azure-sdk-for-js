// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves a SQL Server Instance resource
 *
 * @summary retrieves a SQL Server Instance resource
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerInstance.json
 */
async function updatesASQLServerInstanceTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.get("testrg", "testsqlServerInstance");
  console.log(result);
}

async function main(): Promise<void> {
  await updatesASQLServerInstanceTags();
}

main().catch(console.error);
