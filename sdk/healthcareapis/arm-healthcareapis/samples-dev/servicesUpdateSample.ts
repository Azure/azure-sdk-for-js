// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the metadata of a service instance.
 *
 * @summary update the metadata of a service instance.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServicePatch.json
 */
async function patchService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "service1", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchService();
}

main().catch(console.error);
