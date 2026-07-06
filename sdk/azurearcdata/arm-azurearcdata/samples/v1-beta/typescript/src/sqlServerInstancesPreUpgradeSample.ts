// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to request Upgrade Permission before upgrading.
 *
 * @summary request Upgrade Permission before upgrading.
 * x-ms-original-file: 2026-03-01-preview/PreUpgradeSqlServerInstance.json
 */
async function prepareSQLServerInstanceForAUMUpgrade(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.preUpgrade("testrg", "testsqlServerInstance");
  console.log(result);
}

async function main(): Promise<void> {
  await prepareSQLServerInstanceForAUMUpgrade();
}

main().catch(console.error);
