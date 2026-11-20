// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AiGatewayToolServerResource
 *
 * @summary update a AiGatewayToolServerResource
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerUpdate.json
 */
async function updateAToolServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayToolServerResources.update(
    "example-rg",
    "example-gateway",
    "default",
    "weather-tools",
    "*",
    {
      properties: {
        endpoints: [
          {
            id: "endpoint-1",
            namespace: "weather",
            kind: "mcp",
            mcp: { endpoint: { url: "https://example.invalid/mcp" }, transport: "streamableHttp" },
            authentication: { headers: [{ name: "x-api-key", value: "fake-updated-example-key" }] },
            mode: "failClosed",
          },
          {
            id: "endpoint-2",
            namespace: "forecast",
            kind: "mcp",
            mcp: {
              endpoint: { url: "https://example.invalid/forecast/mcp" },
              transport: "streamableHttp",
            },
            authentication: {
              oauth2: {
                authorizationParameters: [{ name: "prompt", value: "login" }],
                tokenParameters: [{ name: "audience", value: "https://example.invalid/forecast" }],
              },
            },
            mode: "failClosed",
          },
        ],
        displayName: "Updated weather tools",
        toolServerType: "mcp",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAToolServer();
}

main().catch(console.error);
