// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a IdentityBindingProfile
 *
 * @summary delete a IdentityBindingProfile
 * x-ms-original-file: 2026-11-02-preview/IdentityBindingProfiles_Delete.json
 */
async function deleteAnIdentityBindingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.identityBindingProfiles.delete("rg1", "fleet1", "identitybinding1", {
    ifMatch: "uktvayathbu",
  });
}

async function main(): Promise<void> {
  await deleteAnIdentityBindingProfile();
}

main().catch(console.error);
