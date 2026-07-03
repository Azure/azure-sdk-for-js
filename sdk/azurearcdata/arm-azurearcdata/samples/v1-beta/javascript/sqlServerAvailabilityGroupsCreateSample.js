// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces an Arc Sql Server Availability Group.
 *
 * @summary creates or replaces an Arc Sql Server Availability Group.
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateArcSqlServerAvailabilityGroup.json
 */
async function createAArcSqlServerAvailabilityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.create(
    "testrg",
    "testSqlServer_INST1",
    "testAG",
    {
      location: "southeastasia",
      properties: {
        info: {
          basicFeatures: false,
          dbFailover: true,
          dtcSupport: false,
          failureConditionLevel: 3,
          healthCheckTimeout: 30000,
          isContained: false,
          isDistributed: false,
          requiredSynchronizedSecondariesToCommit: 0,
        },
        databases: { value: [{ databaseName: "db1" }, { databaseName: "db2" }] },
        replicas: {
          value: [
            {
              configure: {
                backupPriority: 50,
                endpointUrl: "TCP://mytest60-0.mytest60-svc:5022",
                sessionTimeout: 10,
              },
              replicaName: "testSqlServer\\INST1",
            },
          ],
        },
      },
      tags: { mytag: "myval" },
    },
  );
  console.log(result);
}

async function main() {
  await createAArcSqlServerAvailabilityGroup();
}

main().catch(console.error);
