// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a GoldenGateDeployment
 *
 * @summary delete a GoldenGateDeployment
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_Delete_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsDeleteMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.goldenGateDeployments.delete("rgopenapi", "resource1");
}

async function main(): Promise<void> {
  await goldenGateDeploymentsDeleteMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
