// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes resources.
 *
 * @summary deletes resources.
 * x-ms-original-file: 2025-10-01/ResourceActions_DeleteResources.json
 */
async function resourceActionsDeleteResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.resourceActions.deleteResources("Microsoft.Contoso", "default", {
    resources: [
      {
        resourceId:
          "/subscriptions/ab7a8701-f7ef-471a-a2f4-d0ebbf494f77/providers/Microsoft.Contoso/employee/test",
        location: "southeastasia",
        homeTenantId: "11111111-f7ef-471a-a2f4-d0ebbf494f77",
      },
    ],
  });
}

async function main(): Promise<void> {
  await resourceActionsDeleteResources();
}

main().catch(console.error);
