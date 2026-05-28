// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the diagnostics data for a Managed Environment used to host container apps.
 *
 * @summary get the diagnostics data for a Managed Environment used to host container apps.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentDiagnostics_Get.json
 */
async function getDiagnosticDataForAManagedEnvironments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "f07f3711-b45e-40fe-a941-4e6d93f851e6";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentDiagnostics.getDetector(
    "mikono-workerapp-test-rg",
    "mikonokubeenv",
    "ManagedEnvAvailabilityMetrics",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDiagnosticDataForAManagedEnvironments();
}

main().catch(console.error);
