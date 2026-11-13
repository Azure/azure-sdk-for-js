// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AiGatewayWorkspaceResource resources by AiGatewayResource
 *
 * @summary list AiGatewayWorkspaceResource resources by AiGatewayResource
 * x-ms-original-file: 2026-11-01/AiGatewayWorkspaceList.json
 */
async function listAIGatewayWorkspaces() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiGatewayWorkspaceResources.listByAiGateway(
    "example-rg",
    "example-gateway",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAIGatewayWorkspaces();
}

main().catch(console.error);
