// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a SqlCollector
 *
 * @summary Create a SqlCollector
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/SqlCollectorOperations_Create_MaximumSet_Gen.json
 */

import {
  SqlCollector,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sqlCollectorOperationsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgmigrate";
  const projectName = "fci-test6904project";
  const collectorName = "fci-test0c1esqlsitecollector";
  const resource: SqlCollector = {
    agentProperties: {
      id: "630da710-4d44-41f7-a189-72fe3db5502b-agent",
      lastHeartbeatUtc: undefined,
      spnDetails: {
        applicationId: "db9c4c3d-477c-4d5a-817b-318276713565",
        audience: "db9c4c3d-477c-4d5a-817b-318276713565",
        authority:
          "https://login.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47",
        objectId: "e50236ad-ad07-47d4-af71-ed7b52d200d5",
        tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      },
      version: undefined,
    },
    discoverySiteId:
      "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourceGroups/bansalankit-rg/providers/Microsoft.OffAzure/MasterSites/fci-ankit-test6065mastersite/SqlSites/fci-ankit-test6065sqlsites",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.sqlCollectorOperations.beginCreateAndWait(
    resourceGroupName,
    projectName,
    collectorName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sqlCollectorOperationsCreateMaximumSetGen();
}

main().catch(console.error);
