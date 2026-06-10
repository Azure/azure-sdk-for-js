// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a devcenter encryption set resource.
 *
 * @summary creates or updates a devcenter encryption set resource.
 * x-ms-original-file: 2026-01-01-preview/DevCenterEncryptionSets_Create.json
 */
async function encryptionSetsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.encryptionSets.createOrUpdate("rg1", "Contoso", "EncryptionWestUs", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/identityGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity1":
          {},
      },
    },
    location: "westus",
    properties: {
      devboxDisksEncryptionEnableStatus: "Enabled",
      keyEncryptionKeyIdentity: {
        type: "UserAssigned",
        userAssignedIdentityResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/identityGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity1",
      },
      keyEncryptionKeyUrl: "https://contosovaultwestus.vault.azure.net/keys/contosokek",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await encryptionSetsCreate();
}

main().catch(console.error);
