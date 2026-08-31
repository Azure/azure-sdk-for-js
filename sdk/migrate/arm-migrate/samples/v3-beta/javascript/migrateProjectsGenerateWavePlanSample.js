// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2026-06-01-preview/MigrateProjects_GenerateWavePlan_MaximumSet_Gen.json
 */
async function migrateProjectsGenerateWavePlanMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.migrateProjects.generateWavePlan("rgwaves", "project1", {
    assessmentArmId: "rwwoftf",
    migrationPath: "waehojas",
  });
  console.log(result);
}

async function main() {
  await migrateProjectsGenerateWavePlanMaximumSet();
}

main().catch(console.error);
