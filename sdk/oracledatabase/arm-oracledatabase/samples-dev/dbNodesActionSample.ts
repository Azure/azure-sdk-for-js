// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to vM actions on DbNode of VM Cluster by the provided filter
 *
 * @summary vM actions on DbNode of VM Cluster by the provided filter
 * x-ms-original-file: 2025-03-01/dbNodes_action.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function dbNodesAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbNodes.action("rg000", "cluster1", "ocid1....aaaaaa", {
    action: "Start",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dbNodesAction();
}

main().catch(console.error);
