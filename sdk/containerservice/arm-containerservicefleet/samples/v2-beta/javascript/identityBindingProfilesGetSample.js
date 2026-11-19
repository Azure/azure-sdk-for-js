// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a IdentityBindingProfile
 *
 * @summary get a IdentityBindingProfile
 * x-ms-original-file: 2026-11-02-preview/IdentityBindingProfiles_Get.json
 */
async function getAnIdentityBindingProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.identityBindingProfiles.get("rg1", "fleet1", "identitybinding1");
  console.log(result);
}

async function main() {
  await getAnIdentityBindingProfile();
}

main().catch(console.error);
