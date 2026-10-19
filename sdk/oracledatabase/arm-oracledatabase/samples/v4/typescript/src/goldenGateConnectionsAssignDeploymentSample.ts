// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to assign a GoldenGate deployment to a connection.
 *
 * @summary assign a GoldenGate deployment to a connection.
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_AssignDeployment_MaximumSet_Gen.json
 */
async function goldenGateConnectionsAssignDeploymentMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateConnections.assignDeployment("rgopenapi", "resource1", {
    deploymentId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/resources/resource1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await goldenGateConnectionsAssignDeploymentMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
