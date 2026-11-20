// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a recovery configuration profile.
 *
 * @summary deletes a recovery configuration profile.
 * x-ms-original-file: 2026-11-30-preview/RecoveryConfigProfiles_Delete_MaximumSet_Gen.json
 */
async function recoveryConfigProfilesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.recoveryConfigProfiles.delete(
    "contoso-service-group",
    "cyber-plan",
    "azure-vm-default",
  );
}

async function main() {
  await recoveryConfigProfilesDeleteMaximumSet();
}

main().catch(console.error);
