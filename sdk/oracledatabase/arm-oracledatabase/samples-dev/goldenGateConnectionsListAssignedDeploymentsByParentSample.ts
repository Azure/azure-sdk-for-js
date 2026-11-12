// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list assigned deployments by GoldenGate connection.
 *
 * @summary list assigned deployments by GoldenGate connection.
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_ListAssignedDeploymentsByParent_MaximumSet_Gen.json
 */
async function goldenGateConnectionsListAssignedDeploymentsByParentMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.goldenGateConnections.listAssignedDeploymentsByParent(
    "rgopenapi",
    "resource1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await goldenGateConnectionsListAssignedDeploymentsByParentMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
