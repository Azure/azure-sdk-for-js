// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Online Endpoint (asynchronous).
 *
 * @summary create or update Online Endpoint (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/OnlineEndpoint/createOrUpdate.json
 */
async function createOrUpdateWorkspaceOnlineEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineEndpoints.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    {
      identity: { type: "SystemAssigned", userAssignedIdentities: { string: {} } },
      kind: "string",
      location: "string",
      properties: {
        description: "string",
        authMode: "AMLToken",
        compute: "string",
        properties: { string: "string" },
        traffic: { string: 1 },
      },
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Free" },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceOnlineEndpoint();
}

main().catch(console.error);
