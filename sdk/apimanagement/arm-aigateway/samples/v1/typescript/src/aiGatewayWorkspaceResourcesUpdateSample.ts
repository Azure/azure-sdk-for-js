// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AiGatewayWorkspaceResource
 *
 * @summary update a AiGatewayWorkspaceResource
 * x-ms-original-file: 2026-11-01/AiGatewayWorkspaceUpdate.json
 */
async function updateAnAIGatewayWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayWorkspaceResources.update(
    "example-rg",
    "example-gateway",
    "default",
    "*",
    {
      properties: {
        policies: [
          {
            type: "tokenLimit",
            scope: "workspace",
            count: 100000,
            period: "day",
            counterKey: ["identity"],
          },
          {
            type: "costLimit",
            scope: "workspace",
            id: "monthly-budget",
            amount: 100,
            period: "month",
            counterKey: ["identity"],
            overrides: [{ claims: [{ name: "oid", value: "example-user" }], amount: 200 }],
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnAIGatewayWorkspace();
}

main().catch(console.error);
