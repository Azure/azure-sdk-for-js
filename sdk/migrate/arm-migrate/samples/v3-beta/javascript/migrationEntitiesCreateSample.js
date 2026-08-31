// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a MigrationEntity
 *
 * @summary create a MigrationEntity
 * x-ms-original-file: 2026-06-01-preview/MigrationEntities_Create_MaximumSet_Gen.json
 */
async function migrationEntitiesCreateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.migrationEntities.create("rgwaves", "project1", "entity1", {
    properties: {
      partnerResourceArmId: "a",
      targetAzureResourceArmId: "veaa",
      associatedInventoryResourceId: "z",
      inventoryDisplayName: "aje",
      associatedAssessmentId:
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/MyResourceGroup/providers/Microsoft.Migrate/assessmentprojects/myAssessmentProject/assessments/myAssessment",
      associatedWaveId:
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/MyResourceGroup/providers/Microsoft.Migrate/migrateProjects/MyMigrateProject/waves/wave1",
      associatedMigrationEntityGroupIds: [
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/MyResourceGroup/providers/Microsoft.Migrate/migrateProjects/MyMigrateProject/migrationEntityGroups/group1",
      ],
      target: "anenonptqbrzszgdlfypqltgifinq",
      migrationSpecificProperties: { instanceType: "MigrationSpecificPropertiesBase" },
      migrationTool: "qqintxdthhddwkdhygom",
      migrationPath: "qyurpnfpqtukcrnfihrmqf",
      assessedEntityArmId: "k",
    },
  });
  console.log(result);
}

async function main() {
  await migrationEntitiesCreateMaximumSet();
}

main().catch(console.error);
