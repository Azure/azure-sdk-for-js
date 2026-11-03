// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a FHIR Service.
 *
 * @summary deletes a FHIR Service.
 * x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Delete.json
 */
async function deleteAFhirService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.fhirServices.delete("testRG", "fhirservice1", "workspace1");
}

async function main(): Promise<void> {
  await deleteAFhirService();
}

main().catch(console.error);
