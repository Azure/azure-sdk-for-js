// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a ranked list of GPU SKU pricing plans for deploying this custom model in the target region, each annotated with feasibility and per-replica hourly cost. Feasibility is determined by region availability, GPU quota, and model architecture fit (verified at registration time). `servingPerformanceEstimation` is omitted for custom models. No Azure or Kubernetes resources are provisioned.
 *
 * @summary returns a ranked list of GPU SKU pricing plans for deploying this custom model in the target region, each annotated with feasibility and per-replica hourly cost. Feasibility is determined by region availability, GPU quota, and model architecture fit (verified at registration time). `servingPerformanceEstimation` is omitted for custom models. No Azure or Kubernetes resources are provisioned.
 * x-ms-original-file: 2026-09-02-preview/CustomAIModels_CalculateCost.json
 */
async function customAIModelsCalculateCost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.customAIModels.calculateCost("rg1", "aimanager1", "custom-model1");
  console.log(result);
}

async function main(): Promise<void> {
  await customAIModelsCalculateCost();
}

main().catch(console.error);
