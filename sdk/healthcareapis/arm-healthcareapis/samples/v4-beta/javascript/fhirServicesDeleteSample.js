// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a FHIR Service.
 *
 * @summary deletes a FHIR Service.
 * x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Delete.json
 */
async function deleteAFhirService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.fhirServices.delete("testRG", "fhirservice1", "workspace1");
}

async function main() {
  await deleteAFhirService();
}

main().catch(console.error);
