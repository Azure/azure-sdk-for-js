// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all synapselink workspaces for a database.
 *
 * @summary gets all synapselink workspaces for a database.
 * x-ms-original-file: 2025-02-01-preview/SynapseLinkWorkspaceListByDatabase.json
 */
async function listAllSynapselinkWorkspacesForTheGivenDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.synapseLinkWorkspaces.listByDatabase(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "dbSynapse",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllSynapselinkWorkspacesForTheGivenDatabase();
}

main().catch(console.error);
