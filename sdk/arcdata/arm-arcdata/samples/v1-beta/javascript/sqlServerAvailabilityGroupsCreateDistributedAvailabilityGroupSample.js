// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a SQL Server distributed availability group
 *
 * @summary create a SQL Server distributed availability group
 * x-ms-original-file: 2026-03-01-preview/CreateSqlServerDistributedAvailabilityGroup.json
 */
async function createADistributedAvailabilityGroupUsingThisServerForThePrimaryReplica() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.createDistributedAvailabilityGroup(
    "testrg",
    "testSqlServer_INST1",
    {
      availabilityGroupName: "myNewDag",
      primaryAvailabilityGroup: {
        availabilityGroup:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.AzureArcData/sqlServerInstances/testSqlServer_INST1/availabilityGroups/testAG1",
        availabilityMode: "ASYNCHRONOUS_COMMIT",
        certificateConfiguration: { certificateName: "myCert" },
        failoverMode: "MANUAL",
        listenerUrl: "TCP://testAG1.contoso.com:5022",
        seedingMode: "AUTOMATIC",
      },
      secondaryAvailabilityGroup: {
        availabilityGroup:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.AzureArcData/sqlServerInstances/testSqlServer_INST2/availabilityGroups/testAG2",
        availabilityMode: "ASYNCHRONOUS_COMMIT",
        certificateConfiguration: { certificateName: "myCert" },
        failoverMode: "MANUAL",
        listenerUrl: "TCP://testAG2.contoso.com:5022",
        seedingMode: "AUTOMATIC",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createADistributedAvailabilityGroupUsingThisServerForThePrimaryReplica();
}

main().catch(console.error);
