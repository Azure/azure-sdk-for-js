// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get assigned connection by GoldenGate deployment.
 *
 * @summary get assigned connection by GoldenGate deployment.
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_GetAssignedConnection_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsGetAssignedConnectionMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateDeployments.getAssignedConnection(
    "rgopenapi",
    "resource1",
    "assignment1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await goldenGateDeploymentsGetAssignedConnectionMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
