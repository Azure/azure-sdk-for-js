// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to mint a write-only SAS URI for customer CSV uploads, later consumed by importWavePlan.
 *
 * @summary mint a write-only SAS URI for customer CSV uploads, later consumed by importWavePlan.
 * x-ms-original-file: 2026-06-01-preview/MigrateProjects_FetchSasUri_MaximumSet_Gen.json
 */
async function migrateProjectsFetchSasUriMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F4566D7C-05F8-41DC-A6B4-AFC0600F0AC0";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.migrateProjects.fetchSasUri("rgwaves", "myProjectName", {
    assessmentArmId: "awcgjhekflopkk",
    migrationPath: "jybxmlxnnkpywxdqnijfpeso",
    sasVersionId: "bjkxgpuhgsgqkayuaw",
  });
  console.log(result);
}

async function main() {
  await migrateProjectsFetchSasUriMaximumSet();
}

main().catch(console.error);
