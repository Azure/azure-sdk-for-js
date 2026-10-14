// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new or updates existing API deployment.
 *
 * @summary creates new or updates existing API deployment.
 * x-ms-original-file: 2024-06-01-preview/Deployments_CreateOrUpdate.json
 */
async function deploymentsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdate(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "production",
    {
      properties: {
        title: "Production deployment",
        description: "Public cloud production deployment.",
        environmentId: "/workspaces/default/environments/production",
        definitionId: "/workspaces/default/apis/echo-api/versions/2023-01-01/definitions/openapi",
        state: "active",
        server: { runtimeUri: ["https://api.contoso.com"] },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deploymentsCreateOrUpdate();
}

main().catch(console.error);
