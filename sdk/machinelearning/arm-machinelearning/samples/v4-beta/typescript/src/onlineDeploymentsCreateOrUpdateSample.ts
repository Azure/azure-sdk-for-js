// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Inference Endpoint Deployment (asynchronous).
 *
 * @summary create or update Inference Endpoint Deployment (asynchronous).
 * x-ms-original-file: 2025-12-01/OnlineDeployment/KubernetesOnlineDeployment/createOrUpdate.json
 */
async function createOrUpdateKubernetesOnlineDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineDeployments.createOrUpdate(
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
        appInsightsEnabled: false,
        codeConfiguration: { codeId: "string", scoringScript: "string" },
        containerResourceRequirements: {
          containerResourceLimits: { cpu: '"1"', gpu: '"1"', memory: '"2Gi"' },
          containerResourceRequests: { cpu: '"1"', gpu: '"1"', memory: '"2Gi"' },
        },
        endpointComputeType: "Kubernetes",
        environmentId: "string",
        environmentVariables: { string: "string" },
        instanceType: "string",
        livenessProbe: {
          failureThreshold: 1,
          initialDelay: "PT5M",
          period: "PT5M",
          successThreshold: 1,
          timeout: "PT5M",
        },
        model: "string",
        modelMountPath: "string",
        properties: { string: "string" },
        requestSettings: {
          maxConcurrentRequestsPerInstance: 1,
          maxQueueWait: "PT5M",
          requestTimeout: "PT5M",
        },
        scaleSettings: { scaleType: "Default" },
      },
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Free" },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update Inference Endpoint Deployment (asynchronous).
 *
 * @summary create or update Inference Endpoint Deployment (asynchronous).
 * x-ms-original-file: 2025-12-01/OnlineDeployment/ManagedOnlineDeployment/createOrUpdate.json
 */
async function createOrUpdateManagedOnlineDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineDeployments.createOrUpdate(
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
        appInsightsEnabled: false,
        codeConfiguration: { codeId: "string", scoringScript: "string" },
        endpointComputeType: "Managed",
        environmentId: "string",
        environmentVariables: { string: "string" },
        instanceType: "string",
        livenessProbe: {
          failureThreshold: 1,
          initialDelay: "PT5M",
          period: "PT5M",
          successThreshold: 1,
          timeout: "PT5M",
        },
        model: "string",
        modelMountPath: "string",
        properties: { string: "string" },
        readinessProbe: {
          failureThreshold: 30,
          initialDelay: "PT1S",
          period: "PT10S",
          successThreshold: 1,
          timeout: "PT2S",
        },
        requestSettings: {
          maxConcurrentRequestsPerInstance: 1,
          maxQueueWait: "PT5M",
          requestTimeout: "PT5M",
        },
        scaleSettings: { scaleType: "Default" },
      },
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Free" },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateKubernetesOnlineDeployment();
  await createOrUpdateManagedOnlineDeployment();
}

main().catch(console.error);
