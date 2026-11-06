// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AIInfraOptimizationClient } = require("@azure/arm-aiinfraoptimization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to recommends Azure virtual machine sizes for an AI workload in the specified subscription and azure location.
 *
 * @summary recommends Azure virtual machine sizes for an AI workload in the specified subscription and azure location.
 * x-ms-original-file: 2026-06-01-preview/Recommendations_RecommendVmSku.json
 */
async function recommendVirtualMachineSizesForAnAIInferenceWorkload() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AIInfraOptimizationClient(credential, subscriptionId);
  const result = await client.recommendations.recommendVmSku("eastus2", {
    model: {
      huggingFaceModelId: "meta-llama/Llama-3.1-70B-Instruct",
      parameterCount: 70000000000,
      weightPrecision: "FP16",
      numLayers: 80,
      numKeyValueHeads: 8,
      headDim: 128,
      maxContextLength: 131072,
    },
    workload: {
      maxConcurrentRequestsPerReplica: 1,
      tokenBudget: { promptTokens: 8000, maxOutputTokens: 1024 },
    },
    deployment: { replicaCount: 1, procurementOption: "OnDemand" },
    optimization: {
      rankingPreference: "Cost",
      maxDeploymentCostPerHour: { amount: 50, currencyCode: "USD" },
    },
    targetVmSizes: ["Standard_NC48ads_A100_v4", "Standard_ND96asr_v4"],
    subscriptionOptions: { includeQuota: true, includePlacement: true, includePricing: true },
  });
  console.log(result);
}

async function main() {
  await recommendVirtualMachineSizesForAnAIInferenceWorkload();
}

main().catch(console.error);
