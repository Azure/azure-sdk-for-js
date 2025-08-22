// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DaprComponentResiliencyPolicy,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a resiliency policy for a Dapr component.
 *
 * @summary Creates or updates a resiliency policy for a Dapr component.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/DaprComponentResiliencyPolicy_CreateOrUpdate_AllOptions.json
 */
async function createOrUpdateDaprComponentResiliencyPolicyWithAllOptions(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const componentName = "mydaprcomponent";
  const name = "myresiliencypolicy";
  const daprComponentResiliencyPolicyEnvelope: DaprComponentResiliencyPolicy = {
    inboundPolicy: {
      circuitBreakerPolicy: {
        consecutiveErrors: 5,
        intervalInSeconds: 4,
        timeoutInSeconds: 10,
      },
      httpRetryPolicy: {
        maxRetries: 15,
        retryBackOff: {
          initialDelayInMilliseconds: 2000,
          maxIntervalInMilliseconds: 5500,
        },
      },
      timeoutPolicy: { responseTimeoutInSeconds: 30 },
    },
    outboundPolicy: {
      circuitBreakerPolicy: {
        consecutiveErrors: 3,
        intervalInSeconds: 60,
        timeoutInSeconds: 20,
      },
      httpRetryPolicy: {
        maxRetries: 5,
        retryBackOff: {
          initialDelayInMilliseconds: 100,
          maxIntervalInMilliseconds: 30000,
        },
      },
      timeoutPolicy: { responseTimeoutInSeconds: 12 },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponentResiliencyPolicies.createOrUpdate(
    resourceGroupName,
    environmentName,
    componentName,
    name,
    daprComponentResiliencyPolicyEnvelope,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a resiliency policy for a Dapr component.
 *
 * @summary Creates or updates a resiliency policy for a Dapr component.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/DaprComponentResiliencyPolicy_CreateOrUpdate_OutboundOnly.json
 */
async function createOrUpdateDaprComponentResiliencyPolicyWithOutboundPolicyOnly(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const componentName = "mydaprcomponent";
  const name = "myresiliencypolicy";
  const daprComponentResiliencyPolicyEnvelope: DaprComponentResiliencyPolicy = {
    outboundPolicy: {
      circuitBreakerPolicy: {
        consecutiveErrors: 3,
        intervalInSeconds: 60,
        timeoutInSeconds: 20,
      },
      httpRetryPolicy: {
        maxRetries: 5,
        retryBackOff: {
          initialDelayInMilliseconds: 100,
          maxIntervalInMilliseconds: 30000,
        },
      },
      timeoutPolicy: { responseTimeoutInSeconds: 12 },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponentResiliencyPolicies.createOrUpdate(
    resourceGroupName,
    environmentName,
    componentName,
    name,
    daprComponentResiliencyPolicyEnvelope,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a resiliency policy for a Dapr component.
 *
 * @summary Creates or updates a resiliency policy for a Dapr component.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/DaprComponentResiliencyPolicy_CreateOrUpdate_SparseOptions.json
 */
async function createOrUpdateDaprComponentResiliencyPolicyWithSparseOptions(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "myenvironment";
  const componentName = "mydaprcomponent";
  const name = "myresiliencypolicy";
  const daprComponentResiliencyPolicyEnvelope: DaprComponentResiliencyPolicy = {
    inboundPolicy: {
      circuitBreakerPolicy: { consecutiveErrors: 3, timeoutInSeconds: 20 },
      httpRetryPolicy: {
        maxRetries: 5,
        retryBackOff: {
          initialDelayInMilliseconds: 2000,
          maxIntervalInMilliseconds: 5500,
        },
      },
    },
    outboundPolicy: { timeoutPolicy: { responseTimeoutInSeconds: 12 } },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponentResiliencyPolicies.createOrUpdate(
    resourceGroupName,
    environmentName,
    componentName,
    name,
    daprComponentResiliencyPolicyEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateDaprComponentResiliencyPolicyWithAllOptions();
  await createOrUpdateDaprComponentResiliencyPolicyWithOutboundPolicyOnly();
  await createOrUpdateDaprComponentResiliencyPolicyWithSparseOptions();
}

main().catch(console.error);
