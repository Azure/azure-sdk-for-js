// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the stored model-provider authentication configuration, including secret values.
 *
 * @summary returns the stored model-provider authentication configuration, including secret values.
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderListSecrets.json
 */
async function listModelProviderSecrets(): Promise<void> {
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

async function main(): Promise<void> {
  await listModelProviderSecrets();
}

main().catch(console.error);
