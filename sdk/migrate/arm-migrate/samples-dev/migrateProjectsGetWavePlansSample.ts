// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list wave plans previously generated for a given assessment, optionally scoped to a migration path.
 *
 * @summary list wave plans previously generated for a given assessment, optionally scoped to a migration path.
 * x-ms-original-file: 2026-06-01-preview/MigrateProjects_GetWavePlans_MaximumSet_Gen.json
 */
async function migrateProjectsGetWavePlansMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F4566D7C-05F8-41DC-A6B4-AFC0600F0AC0";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.migrateProjects.getWavePlans("rgwaves", "myProjectName", {
    assessmentArmId: "vcpel",
    migrationPath: "tckqdpgx",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await migrateProjectsGetWavePlansMaximumSet();
}

main().catch(console.error);
