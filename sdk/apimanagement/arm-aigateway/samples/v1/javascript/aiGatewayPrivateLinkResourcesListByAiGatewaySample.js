// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AiGatewayResource PrivateLinks
 *
 * @summary list AiGatewayResource PrivateLinks
 * x-ms-original-file: 2026-11-01/AiGatewayPrivateLinkResourceList.json
 */
async function listPrivateLinkResourcesForAnAIGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiGatewayPrivateLinkResources.listByAiGateway(
    "example-rg",
    "example-gateway",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateLinkResourcesForAnAIGateway();
}

main().catch(console.error);
