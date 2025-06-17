// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DbNode resources by CloudVmCluster
 *
 * @summary list DbNode resources by CloudVmCluster
 * x-ms-original-file: 2024-06-01/dbNodes_listByParent.json
 */
async function dbNodesListByParent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbNodes.listByParent("rg000", "cluster1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dbNodesListByParent();
}

main().catch(console.error);
