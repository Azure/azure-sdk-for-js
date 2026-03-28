// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Serverless Endpoint (asynchronous).
 *
 * @summary create or update Serverless Endpoint (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/ServerlessEndpoint/createOrUpdate.json
 */
async function createOrUpdateWorkspaceServerlessEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.serverlessEndpoints.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    {
      identity: { type: "SystemAssigned", userAssignedIdentities: { string: {} } },
      kind: "string",
      location: "string",
      properties: {
        authMode: "Key",
        contentSafety: { contentSafetyStatus: "Enabled" },
        modelSettings: { modelId: "string" },
      },
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Standard" },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceServerlessEndpoint();
}

main().catch(console.error);
