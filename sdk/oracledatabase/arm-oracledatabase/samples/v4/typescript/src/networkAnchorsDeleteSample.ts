// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a NetworkAnchor
 *
 * @summary delete a NetworkAnchor
 * x-ms-original-file: 2026-06-01/NetworkAnchors_Delete_MaximumSet_Gen.json
 */
async function networkAnchorsDeleteMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.networkAnchors.delete("rgopenapi", "resource1");
}

async function main(): Promise<void> {
  await networkAnchorsDeleteMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
