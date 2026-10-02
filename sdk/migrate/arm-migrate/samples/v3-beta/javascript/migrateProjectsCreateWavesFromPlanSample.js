// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create waves from a previously generated wave plan based on assessment data and selected wave names.
 *
 * @summary create waves from a previously generated wave plan based on assessment data and selected wave names.
 * x-ms-original-file: 2026-06-01-preview/MigrateProjects_CreateWavesFromPlan_MaximumSet_Gen.json
 */
async function migrateProjectsCreateWavesFromPlanMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F4566D7C-05F8-41DC-A6B4-AFC0600F0AC0";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.migrateProjects.createWavesFromPlan("rgwaves", "myProjectName", {
    assessmentArmId: "xcuuprxy",
    migrationPath: "timhgrpcfekqm",
    waveSelection: [{ waveName: "il", waveDisplayName: "xbcibpajnwxwqawxuhmq" }],
  });
  console.log(result);
}

async function main() {
  await migrateProjectsCreateWavesFromPlanMaximumSet();
}

main().catch(console.error);
