// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a AiGatewayModelProviderResource
 *
 * @summary delete a AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderDelete.json
 */
async function deleteAModelProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayModelProviderResources.delete(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
    "*",
  );
}

async function main() {
  await deleteAModelProvider();
}

main().catch(console.error);
