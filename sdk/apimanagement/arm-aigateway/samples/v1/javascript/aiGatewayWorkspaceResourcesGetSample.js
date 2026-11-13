// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AiGatewayWorkspaceResource
 *
 * @summary get a AiGatewayWorkspaceResource
 * x-ms-original-file: 2026-11-01/AiGatewayWorkspaceGet.json
 */
async function getAnAIGatewayWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayWorkspaceResources.get(
    "example-rg",
    "example-gateway",
    "default",
  );
  console.log(result);
}

async function main() {
  await getAnAIGatewayWorkspace();
}

main().catch(console.error);
