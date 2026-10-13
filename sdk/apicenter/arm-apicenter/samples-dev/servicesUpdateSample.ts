// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates existing service.
 *
 * @summary updates existing service.
 * x-ms-original-file: 2024-06-01-preview/Services_Update.json
 */
async function servicesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.services.update("contoso-resources", "contoso", {
    tags: {},
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ManagedIdentity/userAssignedIdentities/contoso-identity":
          {},
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await servicesUpdate();
}

main().catch(console.error);
