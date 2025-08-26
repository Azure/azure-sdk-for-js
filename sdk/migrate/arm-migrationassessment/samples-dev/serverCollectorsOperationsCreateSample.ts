// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a ServerCollector
 *
 * @summary Create a ServerCollector
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/ServerCollectorsOperations_Create_MaximumSet_Gen.json
 */

import {
  ServerCollector,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function serverCollectorsOperationsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawRG";
  const projectName = "app18700project";
  const serverCollectorName = "walter389fcollector";
  const resource: ServerCollector = {
    agentProperties: {
      id: "498e4965-bbb1-47c2-8613-345baff9c509",
      lastHeartbeatUtc: undefined,
      spnDetails: {
        applicationId: "65153d2f-9afb-44e8-b3ca-1369150b7354",
        audience: "65153d2f-9afb-44e8-b3ca-1369150b7354",
        authority:
          "https://login.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47",
        objectId: "ddde6f96-87c8-420b-9d4d-f16a5090519e",
        tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      },
      version: undefined,
    },
    discoverySiteId:
      "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourceGroups/ayagrawRG/providers/Microsoft.OffAzure/ServerSites/walter7155site",
    provisioningState: "Succeeded",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.serverCollectorsOperations.beginCreateAndWait(
    resourceGroupName,
    projectName,
    serverCollectorName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serverCollectorsOperationsCreateMaximumSetGen();
}

main().catch(console.error);
