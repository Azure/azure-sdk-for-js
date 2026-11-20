// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AiGatewayModelResource
 *
 * @summary get a AiGatewayModelResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelGet.json
 */
async function getAnAIGatewayModel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayModelResources.get(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
    "gpt-4o",
  );
  console.log(result);
}

async function main() {
  await getAnAIGatewayModel();
}

main().catch(console.error);
