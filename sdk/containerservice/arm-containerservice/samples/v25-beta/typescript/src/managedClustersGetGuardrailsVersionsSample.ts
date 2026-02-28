// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to contains Guardrails version along with its support info and whether it is a default version.
 *
 * @summary contains Guardrails version along with its support info and whether it is a default version.
 * x-ms-original-file: 2025-10-02-preview/GetGuardrailsVersions.json
 */
async function getGuardrailsAvailableVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getGuardrailsVersions("location1", "v1.0.0");
  console.log(result);
}

async function main(): Promise<void> {
  await getGuardrailsAvailableVersions();
}

main().catch(console.error);
