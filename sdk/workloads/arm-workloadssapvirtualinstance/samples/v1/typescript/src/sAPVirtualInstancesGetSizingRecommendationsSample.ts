// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the sizing recommendations.
 *
 * @summary gets the sizing recommendations.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeSizingRecommendations_S4HANA_Distributed.json
 */
async function sapSizingRecommendationsForNonHaDistributedSystem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.getSizingRecommendations(
    "centralus",
    {
      appLocation: "eastus",
      environment: "Prod",
      sapProduct: "S4HANA",
      deploymentType: "ThreeTier",
      saps: 20000,
      dbMemory: 1024,
      databaseType: "HANA",
      dbScaleMethod: "ScaleUp",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the sizing recommendations.
 *
 * @summary gets the sizing recommendations.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeSizingRecommendations_S4HANA_HA_AvSet.json
 */
async function sapSizingRecommendationsForHaWithAvailabilitySet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.getSizingRecommendations(
    "centralus",
    {
      appLocation: "eastus",
      environment: "Prod",
      sapProduct: "S4HANA",
      deploymentType: "ThreeTier",
      saps: 75000,
      dbMemory: 1024,
      databaseType: "HANA",
      dbScaleMethod: "ScaleUp",
      highAvailabilityType: "AvailabilitySet",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the sizing recommendations.
 *
 * @summary gets the sizing recommendations.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeSizingRecommendations_S4HANA_HA_AvZone.json
 */
async function sapSizingRecommendationsForHaWithAvailabilityZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.getSizingRecommendations(
    "centralus",
    {
      appLocation: "eastus",
      environment: "Prod",
      sapProduct: "S4HANA",
      deploymentType: "ThreeTier",
      saps: 75000,
      dbMemory: 1024,
      databaseType: "HANA",
      dbScaleMethod: "ScaleUp",
      highAvailabilityType: "AvailabilityZone",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the sizing recommendations.
 *
 * @summary gets the sizing recommendations.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeSizingRecommendations_S4HANA_SingleServer.json
 */
async function sapSizingRecommendationsForSingleServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.getSizingRecommendations(
    "centralus",
    {
      appLocation: "eastus",
      environment: "NonProd",
      sapProduct: "S4HANA",
      deploymentType: "SingleServer",
      saps: 60000,
      dbMemory: 2000,
      databaseType: "HANA",
      dbScaleMethod: "ScaleUp",
    },
  );
  console.log(result);
}

async function main() {
  sapSizingRecommendationsForNonHaDistributedSystem();
  sapSizingRecommendationsForHaWithAvailabilitySet();
  sapSizingRecommendationsForHaWithAvailabilityZone();
  sapSizingRecommendationsForSingleServer();
}

main().catch(console.error);
