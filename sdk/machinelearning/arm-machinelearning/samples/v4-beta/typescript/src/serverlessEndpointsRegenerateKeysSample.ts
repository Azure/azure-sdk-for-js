// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous).
 *
 * @summary regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/ServerlessEndpoint/regenerateKeys.json
 */
async function regenerateKeysWorkspaceServerlessEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.serverlessEndpoints.regenerateKeys(
    "test-rg",
    "my-aml-workspace",
    "string",
    { keyType: "Primary", keyValue: "string" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regenerateKeysWorkspaceServerlessEndpoint();
}

main().catch(console.error);
