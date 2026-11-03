// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an IoT Connector FHIR destination.
 *
 * @summary deletes an IoT Connector FHIR destination.
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Delete.json
 */
async function deleteAnIoTConnectorDestination() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.iotConnectorFhirDestination.delete("testRG", "workspace1", "blue", "dest1");
}

async function main() {
  await deleteAnIoTConnectorDestination();
}

main().catch(console.error);
