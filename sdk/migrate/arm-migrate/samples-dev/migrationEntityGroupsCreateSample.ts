// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a MigrationEntityGroup
 *
 * @summary create a MigrationEntityGroup
 * x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_Create_MaximumSet_Gen.json
 */
async function migrationEntityGroupsCreateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.migrationEntityGroups.create("rgwaves", "project1", "group1", {
    properties: {
      applicationId: "xjovxgurinimcoikyvov",
      applicationDisplayName: "mwp",
      associatedAssessmentId:
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/MyResourceGroup/providers/Microsoft.Migrate/assessmentprojects/myAssessmentProject/assessments/myAssessment",
      associatedWaveIds: [
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/MyResourceGroup/providers/Microsoft.Migrate/migrateProjects/MyMigrateProject/waves/wave1",
      ],
      migrationPath: "yq",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await migrationEntityGroupsCreateMaximumSet();
}

main().catch(console.error);
