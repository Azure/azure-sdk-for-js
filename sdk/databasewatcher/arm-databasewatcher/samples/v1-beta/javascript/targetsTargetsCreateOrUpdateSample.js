// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DatabaseWatcherClient } = require("@azure/arm-databasewatcher");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Target
 *
 * @summary create a Target
 * x-ms-original-file: 2025-01-02/Targets_CreateOrUpdate_MaximumSet_Gen.json
 */
async function targetsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "49e0fbd3-75e8-44e7-96fd-5b64d9ad818d";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const result = await client.targets.createOrUpdate(
    "apiTest-ddat4p",
    "databasemo3ej9ih",
    "monitoringh22eed",
    {
      properties: {
        targetType: "SqlDb",
        targetAuthenticationType: "Aad",
        connectionServerName: "sqlServero1ihe2",
        sqlDbResourceId:
          "/subscriptions/49e0fbd3-75e8-44e7-96fd-5b64d9ad818d/resourceGroups/apiTest-ddat4p/providers/Microsoft.Sql/servers/m1/databases/m2",
      },
    },
  );
  console.log(result);
}

async function main() {
  await targetsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
