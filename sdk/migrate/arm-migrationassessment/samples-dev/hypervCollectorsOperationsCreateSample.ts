// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HypervCollector,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a HypervCollector
 *
 * @summary Create a HypervCollector
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/HypervCollectorsOperations_Create_MaximumSet_Gen.json
 */
async function hypervCollectorsOperationsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawRG";
  const projectName = "app18700project";
  const hypervCollectorName = "test-697cecollector";
  const resource: HypervCollector = {
    agentProperties: {
      id: "12f1d90f-b3fa-4926-8893-e56803a09af0",
      lastHeartbeatUtc: new Date("2022-07-07T14:25:35.708325Z"),
      spnDetails: {
        applicationId: "e3bd6eaa-980b-40ae-a30e-2a5069ba097c",
        audience: "e3bd6eaa-980b-40ae-a30e-2a5069ba097c",
        authority:
          "https://login.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47",
        objectId: "01b9f9e2-2d82-414c-adaa-09ce259b6b44",
        tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      },
      version: "2.0.1993.19",
    },
    discoverySiteId:
      "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourceGroups/ayagrawRG/providers/Microsoft.OffAzure/HyperVSites/test-60527site",
    provisioningState: "Succeeded",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.hypervCollectorsOperations.beginCreateAndWait(
    resourceGroupName,
    projectName,
    hypervCollectorName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hypervCollectorsOperationsCreateMaximumSetGen();
}

main().catch(console.error);
