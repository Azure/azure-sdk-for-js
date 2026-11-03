// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ResourceAnchor
 *
 * @summary delete a ResourceAnchor
 * x-ms-original-file: 2026-06-01/ResourceAnchors_Delete_MaximumSet_Gen.json
 */
async function resourceAnchorsDeleteMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.resourceAnchors.delete("rgopenapi", "resource1");
}

async function main(): Promise<void> {
  await resourceAnchorsDeleteMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
