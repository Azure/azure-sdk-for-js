// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates/updates a batch inference deployment (asynchronous).
 *
 * @summary creates/updates a batch inference deployment (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/BatchDeployment/createOrUpdate.json
 */
async function createOrUpdateWorkspaceBatchDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.batchDeployments.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
    {
      identity: { type: "SystemAssigned", userAssignedIdentities: { string: {} } },
      kind: "string",
      location: "string",
      properties: {
        description: "string",
        codeConfiguration: { codeId: "string", scoringScript: "string" },
        compute: "string",
        environmentId: "string",
        environmentVariables: { string: "string" },
        errorThreshold: 1,
        loggingLevel: "Info",
        maxConcurrencyPerInstance: 1,
        miniBatchSize: 1,
        model: { assetId: "string", referenceType: "Id" },
        outputAction: "SummaryOnly",
        outputFileName: "string",
        properties: { string: "string" },
        resources: {
          instanceCount: 1,
          instanceType: "string",
          properties: { string: { "cd3c37dc-2876-4ca4-8a54-21bd7619724a": null } },
        },
        retrySettings: { maxRetries: 1, timeout: "PT5M" },
      },
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Free" },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceBatchDeployment();
}

main().catch(console.error);
