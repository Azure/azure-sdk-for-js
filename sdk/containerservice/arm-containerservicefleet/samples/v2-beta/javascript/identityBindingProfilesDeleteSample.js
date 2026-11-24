// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a IdentityBindingProfile
 *
 * @summary delete a IdentityBindingProfile
 * x-ms-original-file: 2026-11-02-preview/IdentityBindingProfiles_Delete.json
 */
async function deleteAnIdentityBindingProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.identityBindingProfiles.delete("rg1", "fleet1", "identitybinding1", {
    ifMatch: "uktvayathbu",
  });
}

async function main() {
  await deleteAnIdentityBindingProfile();
}

main().catch(console.error);
