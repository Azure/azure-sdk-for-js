// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch FHIR Service details.
 *
 * @summary patch FHIR Service details.
 * x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Patch.json
 */
async function updateAFhirService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.fhirServices.update("testRG", "fhirservice1", "workspace1", {
    tags: { tagKey: "tagValue" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAFhirService();
}

main().catch(console.error);
