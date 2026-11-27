// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets links to complete OAuth consent for a tool server endpoint.
 *
 * @summary gets links to complete OAuth consent for a tool server endpoint.
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerGetOauth2LoginLinks.json
 */
async function getOAuthConsentLinksForAToolServerEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayToolServerResources.getOauth2LoginLinks(
    "example-rg",
    "example-gateway",
    "default",
    "weather-tools",
    { endpointId: "endpoint-1" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getOAuthConsentLinksForAToolServerEndpoint();
}

main().catch(console.error);
