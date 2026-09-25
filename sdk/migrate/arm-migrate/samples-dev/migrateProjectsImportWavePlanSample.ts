// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to ingest a customer-uploaded wave-plan CSV and produce the updated wave-plan artifacts. Long-running operation.
 *
 * @summary ingest a customer-uploaded wave-plan CSV and produce the updated wave-plan artifacts. Long-running operation.
 * x-ms-original-file: 2026-06-01-preview/MigrateProjects_ImportWavePlan_MaximumSet_Gen.json
 */
async function migrateProjectsImportWavePlanMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F4566D7C-05F8-41DC-A6B4-AFC0600F0AC0";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.migrateProjects.importWavePlan("rgwaves", "myProjectName", {
    assessmentArmId: "fhdwyibrc",
    migrationPath: "aywdxwnkl",
    sasVersionId: "pcjubmrrvrhahgyuztztftzwfjbg",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await migrateProjectsImportWavePlanMaximumSet();
}

main().catch(console.error);
