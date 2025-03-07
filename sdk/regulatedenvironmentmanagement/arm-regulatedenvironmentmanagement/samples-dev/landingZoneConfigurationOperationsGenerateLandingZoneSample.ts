// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate infrastructure as code (IaC) for a landing zone deployment.
 *
 * @summary generate infrastructure as code (IaC) for a landing zone deployment.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneConfigurationOperations_GenerateLandingZone.json
 */
async function landingZoneConfigurationOperationsGenerateLandingZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneConfigurationOperations.generateLandingZone(
    "ExampleResourceGroup",
    "SampleLZA",
    "ExampleLZC",
    {
      infrastructureAsCodeOutputOptions: "Bicep",
      deploymentPrefix: "mcfs",
      topLevelMgDisplayName: "TestMG",
      deploymentLocation: "eastus",
      existingManagementSubscriptionId: "/subscriptions/00000000-0000-0000-0000-000000000001",
      existingIdentitySubscriptionId: "/subscriptions/00000000-0000-0000-0000-000000000002",
      existingConnectivitySubscriptionId: "/subscriptions/00000000-0000-0000-0000-000000000003",
      deploymentSuffix: "test",
      organization: "test",
      environment: "QA",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneConfigurationOperationsGenerateLandingZone();
}

main().catch(console.error);
