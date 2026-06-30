// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update InferenceGroup (asynchronous).
 *
 * @summary create or update InferenceGroup (asynchronous).
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceGroup/createOrUpdate.json
 */
async function createOrUpdateWorkspaceInferenceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.inferenceGroups.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      identity: { type: "SystemAssigned", userAssignedIdentities: { string: {} } },
      kind: "string",
      location: "string",
      properties: {
        description: "string",
        environmentConfiguration: {
          environmentId: "azureml://registries/test-registry/models/enginefeed/versions/1",
          environmentVariables: [{ key: "string", value: "string" }],
          livenessProbe: {
            failureThreshold: 1,
            initialDelay: "PT5M",
            period: "PT5M",
            successThreshold: 1,
            timeout: "PT5M",
          },
          readinessProbe: {
            failureThreshold: 1,
            initialDelay: "PT5M",
            period: "PT5M",
            successThreshold: 1,
            timeout: "PT5M",
          },
          startupProbe: {
            failureThreshold: 1,
            initialDelay: "PT5M",
            period: "PT5M",
            successThreshold: 1,
            timeout: "PT5M",
          },
        },
        modelConfiguration: {
          modelId: "azureml://registries/test-registry/models/modelabc/versions/1",
        },
        nodeSkuType: "string",
        properties: [{ key: "string", value: "string" }],
        scaleUnitSize: 1,
      },
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Free" },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceInferenceGroup();
}

main().catch(console.error);
