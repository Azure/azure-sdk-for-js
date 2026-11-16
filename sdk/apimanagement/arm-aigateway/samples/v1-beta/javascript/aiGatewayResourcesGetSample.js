// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AiGatewayResource
 *
 * @summary get a AiGatewayResource
 * x-ms-original-file: 2026-09-01-preview/AiGatewayGet.json
 */
async function getAnAIGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayResources.get("example-rg", "example-gateway");
  console.log(result);
}

async function main() {
  await getAnAIGateway();
}

main().catch(console.error);
