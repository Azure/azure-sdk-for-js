// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  VmwareCollector,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a VmwareCollector
 *
 * @summary Create a VmwareCollector
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/VmwareCollectorsOperations_Create_MaximumSet_Gen.json
 */
async function vmwareCollectorsOperationsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawRG";
  const projectName = "app18700project";
  const vmWareCollectorName = "Vmware2258collector";
  const resource: VmwareCollector = {
    agentProperties: {
      id: "fe243486-3318-41fa-aaba-c48b5df75308",
      lastHeartbeatUtc: new Date("2022-03-29T12:10:08.9167289Z"),
      spnDetails: {
        applicationId: "82b3e452-c0e8-4662-8347-58282925ae84",
        audience: "82b3e452-c0e8-4662-8347-58282925ae84",
        authority:
          "https://login.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47",
        objectId: "3fc89111-1405-4938-9214-37aa4739401d",
        tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      },
      version: "1.0.8.383",
    },
    discoverySiteId:
      "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourceGroups/ayagrawRG/providers/Microsoft.OffAzure/VMwareSites/Vmware2744site",
    provisioningState: "Succeeded",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.vmwareCollectorsOperations.beginCreateAndWait(
    resourceGroupName,
    projectName,
    vmWareCollectorName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await vmwareCollectorsOperationsCreateMaximumSetGen();
}

main().catch(console.error);
