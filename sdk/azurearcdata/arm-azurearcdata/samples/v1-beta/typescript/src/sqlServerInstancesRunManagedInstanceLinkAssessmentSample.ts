// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to runs Managed Instance Link assessment for SQL Server instance
 *
 * @summary runs Managed Instance Link assessment for SQL Server instance
 * x-ms-original-file: 2026-03-01-preview/RunManagedInstanceLinkAssessment.json
 */
async function runsManagedInstanceLinkAssessmentsAndRetrievesTheResults(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.runManagedInstanceLinkAssessment(
    "testrg",
    "testsqlserver",
    {
      assessmentCategories: [
        "SqlInstance",
        "ManagedInstance",
        "ManagedInstanceCrossValidation",
        "DagCrossValidation",
      ],
      availabilityGroupName: "AG_testdb",
      azureManagedInstanceResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Sql/managedInstances/testmi",
      azureManagedInstanceRole: "Secondary",
      databaseNames: ["testdb", "testdb2", "testdb3"],
      distributedAvailabilityGroupName: "MiLinkDag",
      sqlServerIpAddress: "192.168.1.2",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await runsManagedInstanceLinkAssessmentsAndRetrievesTheResults();
}

main().catch(console.error);
