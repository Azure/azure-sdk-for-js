// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all FHIR Services for the given workspace
 *
 * @summary lists all FHIR Services for the given workspace
 * x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_List.json
 */
async function listFhirservices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fhirServices.listByWorkspace("testRG", "workspace1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listFhirservices();
}

main().catch(console.error);
