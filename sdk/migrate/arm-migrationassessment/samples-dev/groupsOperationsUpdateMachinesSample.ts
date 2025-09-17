// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update machines in group by adding or removing machines.
 *
 * @summary Update machines in group by adding or removing machines.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/GroupsOperations_UpdateMachines_MaximumSet_Gen.json
 */

import {
  UpdateGroupBody,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function groupsOperationsUpdateMachinesMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawrg";
  const projectName = "app18700project";
  const groupName = "kuchatur-test";
  const body: UpdateGroupBody = {
    eTag: "*",
    properties: {
      machines: [
        "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourceGroups/ayagrawrg/providers/Microsoft.Migrate/assessmentprojects/app18700project/machines/18895660-c5e5-4247-8cfc-cd24e1fe57f3",
      ],
      operationType: "Add",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.groupsOperations.beginUpdateMachinesAndWait(
    resourceGroupName,
    projectName,
    groupName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await groupsOperationsUpdateMachinesMaximumSetGen();
}

main().catch(console.error);
