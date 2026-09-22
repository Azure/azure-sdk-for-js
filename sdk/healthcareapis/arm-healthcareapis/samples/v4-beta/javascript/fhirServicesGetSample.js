// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of the specified FHIR Service.
 *
 * @summary gets the properties of the specified FHIR Service.
 * x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Get.json
 */
async function getAFhirService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.fhirServices.get("testRG", "workspace1", "fhirservices1");
  console.log(result);
}

async function main() {
  await getAFhirService();
}

main().catch(console.error);
