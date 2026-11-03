// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list GoldenGateConnection resources by resource group
 *
 * @summary list GoldenGateConnection resources by resource group
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_ListByResourceGroup_MaximumSet_Gen.json
 */
async function goldenGateConnectionsListByResourceGroupMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.goldenGateConnections.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await goldenGateConnectionsListByResourceGroupMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
