// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a NetworkAnchor
 *
 * @summary get a NetworkAnchor
 * x-ms-original-file: 2025-09-01/NetworkAnchors_Get_MaximumSet_Gen.json
 */
async function networkAnchorsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.networkAnchors.get("rgopenapi", "networkanchor1");
  console.log(result);
}

async function main(): Promise<void> {
  await networkAnchorsGetMaximumSet();
}

main().catch(console.error);
