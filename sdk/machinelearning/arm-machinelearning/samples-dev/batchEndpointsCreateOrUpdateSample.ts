// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a batch inference endpoint (asynchronous).
 *
 * @summary Creates a batch inference endpoint (asynchronous).
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Workspace/BatchEndpoint/createOrUpdate.json
 */

import type { BatchEndpoint } from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateWorkspaceBatchEndpoint(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const workspaceName = "my-aml-workspace";
  const endpointName = "testEndpointName";
  const body: BatchEndpoint = {
    identity: {
      type: "SystemAssigned",
      userAssignedIdentities: { string: {} },
    },
    kind: "string",
    location: "string",
    properties: {
      description: "string",
      authMode: "AMLToken",
      defaults: { deploymentName: "string" },
      properties: { string: "string" },
    },
    sku: {
      name: "string",
      capacity: 1,
      family: "string",
      size: "string",
      tier: "Free",
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.batchEndpoints.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    endpointName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceBatchEndpoint();
}

main().catch(console.error);
