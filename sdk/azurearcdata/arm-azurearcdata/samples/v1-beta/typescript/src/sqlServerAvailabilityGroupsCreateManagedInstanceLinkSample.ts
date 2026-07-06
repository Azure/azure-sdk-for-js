// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create an Managed Instance Link
 *
 * @summary create an Managed Instance Link
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateManagedInstanceLink.json
 */
async function createAnManagedInstanceLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.createManagedInstanceLink(
    "testrg",
    "testSqlServer_INST1",
    {
      availabilityGroup: {
        availabilityGroupName: "myNewAg",
        databases: ["database1"],
        replicas: [
          {
            availabilityMode: "SYNCHRONOUS_COMMIT",
            endpointUrl: "TCP://testSqlServer_INST1.testSqlserverDomain:5022",
            failoverMode: "AUTOMATIC",
            secondaryRoleAllowConnections: "ALL",
            seedingMode: "AUTOMATIC",
          },
        ],
      },
      distributedAvailabilityGroup: {
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
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Sql/managedInstances/testcl",
          availabilityMode: "ASYNCHRONOUS_COMMIT",
          failoverMode: "NONE",
          seedingMode: "AUTOMATIC",
        },
      },
      miLinkConfiguration: { instanceAvailabilityGroupName: "testAG2" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnManagedInstanceLink();
}

main().catch(console.error);
