// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check for the existence of a AiGatewayWorkspaceResource
 *
 * @summary check for the existence of a AiGatewayWorkspaceResource
 * x-ms-original-file: 2026-11-01/AiGatewayWorkspaceCheckExistence.json
 */
async function checkWhetherAnAIGatewayWorkspaceExists(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayWorkspaceResources.checkExistence(
    "example-rg",
    "example-gateway",
    "default",
  );
}

async function main(): Promise<void> {
  await checkWhetherAnAIGatewayWorkspaceExists();
}

main().catch(console.error);
