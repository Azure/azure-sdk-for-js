// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns primary and secondary key values.
 *
 * @summary returns primary and secondary key values.
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyListSecrets.json
 */
async function listAIGatewayAPIKeySecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayApiKeyResources.listSecrets(
    "example-rg",
    "example-gateway",
    "application-key",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listAIGatewayAPIKeySecrets();
}

main().catch(console.error);
