// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an IoT Connector FHIR destination.
 *
 * @summary deletes an IoT Connector FHIR destination.
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Delete.json
 */
async function deleteAnIoTConnectorDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.iotConnectorFhirDestination.delete("testRG", "workspace1", "blue", "dest1");
}

async function main(): Promise<void> {
  await deleteAnIoTConnectorDestination();
}

main().catch(console.error);
