// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a IdentityBindingProfile
 *
 * @summary create a IdentityBindingProfile
 * x-ms-original-file: 2026-11-02-preview/IdentityBindingProfiles_CreateOrUpdate.json
 */
async function createOrUpdateAnIdentityBindingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.identityBindingProfiles.createOrUpdate(
    "rg1",
    "fleet1",
    "identitybinding1",
    {
      memberSelector: { byLabel: "env=production" },
      identityBindingProperties: {
        managedIdentity: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1",
        },
        allowedSubjects: [
          {
            namespaceSelector: { matchLabels: ["kubernetes.io/metadata.name=prod"] },
            serviceAccountSelector: { matchLabels: ["app=payments"] },
          },
        ],
      },
    },
    { ifMatch: "uktvayathbu" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnIdentityBindingProfile();
}

main().catch(console.error);
