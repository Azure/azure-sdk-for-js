// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reevaluates the inaccessibility state of all managed databases.
 *
 * @summary reevaluates the inaccessibility state of all managed databases.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceReevaluateInaccessibleDatabaseState.json
 */
async function reevaluateInaccessibilityStatesOfAllManagedDatabases() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedInstances.reevaluateInaccessibleDatabaseState("testrg", "testinstance");
}

async function main() {
  await reevaluateInaccessibilityStatesOfAllManagedDatabases();
}

main().catch(console.error);
