// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a GoldenGateConnection
 *
 * @summary delete a GoldenGateConnection
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_Delete_MaximumSet_Gen.json
 */
async function goldenGateConnectionsDeleteMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.goldenGateConnections.delete("rgopenapi", "resource1");
}

async function main(): Promise<void> {
  await goldenGateConnectionsDeleteMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
