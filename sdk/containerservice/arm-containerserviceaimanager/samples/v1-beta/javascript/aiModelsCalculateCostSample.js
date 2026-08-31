// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a ranked list of GPU SKU pricing plans for deploying this model in the target region, each annotated with feasibility, per-replica hourly cost, and estimated relative performance. No Azure or Kubernetes resources are provisioned.
 *
 * @summary returns a ranked list of GPU SKU pricing plans for deploying this model in the target region, each annotated with feasibility, per-replica hourly cost, and estimated relative performance. No Azure or Kubernetes resources are provisioned.
 * x-ms-original-file: 2026-05-02-preview/AIModels_CalculateCost.json
 */
async function aiModelsCalculateCostMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiModels.calculateCost("eastus", "9806f0c862fdd920", {});
  console.log(result);
}

async function main() {
  await aiModelsCalculateCostMaximumSet();
}

main().catch(console.error);
