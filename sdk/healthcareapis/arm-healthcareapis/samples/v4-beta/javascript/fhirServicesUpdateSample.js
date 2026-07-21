// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch FHIR Service details.
 *
 * @summary patch FHIR Service details.
 * x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Patch.json
 */
async function updateAFhirService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.fhirServices.update("testRG", "fhirservice1", "workspace1", {
    tags: { tagKey: "tagValue" },
  });
  console.log(result);
}

async function main() {
  await updateAFhirService();
}

main().catch(console.error);
