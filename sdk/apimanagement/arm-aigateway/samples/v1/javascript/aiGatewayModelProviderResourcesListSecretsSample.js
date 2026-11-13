// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the stored model-provider authentication configuration, including secret values.
 *
 * @summary returns the stored model-provider authentication configuration, including secret values.
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderListSecrets.json
 */
async function listModelProviderSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayModelProviderResources.listSecrets(
    "example-rg",
    "example-gateway",
    "default",
    "custom-provider",
  );
  console.log(result);
}

async function main() {
  await listModelProviderSecrets();
}

main().catch(console.error);
