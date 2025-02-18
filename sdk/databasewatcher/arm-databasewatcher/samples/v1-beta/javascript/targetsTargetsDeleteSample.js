// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DatabaseWatcherClient } = require("@azure/arm-databasewatcher");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Target
 *
 * @summary delete a Target
 * x-ms-original-file: 2025-01-02/Targets_Delete_MaximumSet_Gen.json
 */
async function targetsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "49e0fbd3-75e8-44e7-96fd-5b64d9ad818d";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  await client.targets.delete("apiTest-ddat4p", "databasemo3ej9ih", "monitoringh22eed");
}

async function main() {
  await targetsDeleteMaximumSet();
}

main().catch(console.error);
