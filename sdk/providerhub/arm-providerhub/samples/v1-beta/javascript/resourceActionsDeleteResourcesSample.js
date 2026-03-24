// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes resources.
 *
 * @summary deletes resources.
 * x-ms-original-file: 2024-09-01/ResourceActions_DeleteResources.json
 */
async function resourceActionsDeleteResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.resourceActions.deleteResources("Microsoft.Contoso", "default", {
    resources: [
      {
        homeTenantId: "11111111-f7ef-471a-a2f4-d0ebbf494f77",
        location: "southeastasia",
        resourceId:
          "/subscriptions/ab7a8701-f7ef-471a-a2f4-d0ebbf494f77/providers/Microsoft.Contoso/employee/test",
      },
    ],
  });
}

async function main() {
  await resourceActionsDeleteResources();
}

main().catch(console.error);
