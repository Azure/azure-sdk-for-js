// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AiGatewayModelProviderResource
 *
 * @summary get a AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderGet.json
 */
async function getAModelProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayModelProviderResources.get(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
  );
  console.log(result);
}

async function main() {
  await getAModelProvider();
}

main().catch(console.error);
