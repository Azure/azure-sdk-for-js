// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a SQL Server ESU license resource
 *
 * @summary deletes a SQL Server ESU license resource
 * x-ms-original-file: 2026-03-01-preview/DeleteSqlServerEsuLicense.json
 */
async function deleteASQLServerESULicense(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.sqlServerEsuLicenses.delete("testrg", "testsqlServerEsuLicense");
}

async function main(): Promise<void> {
  await deleteASQLServerESULicense();
}

main().catch(console.error);
