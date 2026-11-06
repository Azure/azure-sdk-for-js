// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a recovery configuration profile.
 *
 * @summary gets a recovery configuration profile.
 * x-ms-original-file: 2026-11-30-preview/RecoveryConfigProfiles_Get_MaximumSet_Gen.json
 */
async function recoveryConfigProfilesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryConfigProfiles.get(
    "contoso-service-group",
    "cyber-plan",
    "azure-vm-default",
  );
  console.log(result);
}

async function main() {
  await recoveryConfigProfilesGetMaximumSet();
}

main().catch(console.error);
