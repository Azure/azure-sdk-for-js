// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a GoldenGateDeployment
 *
 * @summary get a GoldenGateDeployment
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_Get_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsGetMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateDeployments.get("rgopenapi", "resource1");
  console.log(result);
}

async function main(): Promise<void> {
  await goldenGateDeploymentsGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
