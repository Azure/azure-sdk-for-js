// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a AiGatewayToolServerResource
 *
 * @summary create a AiGatewayToolServerResource
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerCreate.json
 */
async function createAnMCPToolServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayToolServerResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "weather-tools",
    {
      properties: {
        endpoints: [
          {
            id: "endpoint-1",
            namespace: "weather",
            kind: "mcp",
            mcp: { endpoint: { url: "https://example.invalid/mcp" }, transport: "streamableHttp" },
            authentication: { headers: [{ name: "x-api-key", value: "fake-example-key" }] },
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
                authorizationEndpoint: { url: "https://example.invalid/oauth/authorize" },
                tokenEndpoint: { url: "https://example.invalid/oauth/token" },
                clientId: "example-client",
                grantType: "authorizationCode",
                scopes: ["tools.read"],
                authorizationParameters: [{ name: "prompt", value: "consent" }],
                tokenParameters: [{ name: "audience", value: "https://example.invalid/forecast" }],
              },
            },
            mode: "failClosed",
          },
        ],
        displayName: "Weather tools",
        toolServerType: "mcp",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a AiGatewayToolServerResource
 *
 * @summary create a AiGatewayToolServerResource
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerCreateConnector.json
 */
async function createAConnectorToolServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayToolServerResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "connector-tools",
    { properties: { displayName: "Connector tools", toolServerType: "connector" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a AiGatewayToolServerResource
 *
 * @summary create a AiGatewayToolServerResource
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerCreateOpenApi.json
 */
async function createAnOpenAPIToolServerWithInlineAndURLDocumentSources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayToolServerResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "openapi-tools",
    {
      properties: {
        endpoints: [
          {
            id: "inline-endpoint",
            namespace: "weather",
            kind: "openApi",
            openApi: {
              specSource: {
                type: "inline",
                contentBase64: Buffer.from(
                  "eyJvcGVuYXBpIjoiMy4wLjMiLCJpbmZvIjp7InRpdGxlIjoiRXhhbXBsZSB3ZWF0aGVyIHRvb2xzIiwidmVyc2lvbiI6IjEuMC4wIn0sInNlcnZlcnMiOlt7InVybCI6Imh0dHBzOi8vYXBpLmNvbnRvc28uY29tIn1dLCJwYXRocyI6eyIvd2VhdGhlciI6eyJnZXQiOnsib3BlcmF0aW9uSWQiOiJnZXRXZWF0aGVyIiwicmVzcG9uc2VzIjp7IjIwMCI6eyJkZXNjcmlwdGlvbiI6IlN1Y2Nlc3MifX19fX19",
                  "base64",
                ),
              },
            },
            authentication: { headers: [{ name: "x-api-key", value: "{api-key}" }] },
            mode: "failClosed",
          },
          {
            id: "url-endpoint",
            namespace: "forecast",
            kind: "openApi",
            openApi: { specSource: { type: "url", url: "https://api.contoso.com/openapi.json" } },
            mode: "failOpen",
          },
        ],
        displayName: "OpenAPI tools",
        toolServerType: "openApi",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnMCPToolServer();
  await createAConnectorToolServer();
  await createAnOpenAPIToolServerWithInlineAndURLDocumentSources();
}

main().catch(console.error);
