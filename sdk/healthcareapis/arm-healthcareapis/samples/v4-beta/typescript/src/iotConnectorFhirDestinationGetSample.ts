// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified Iot Connector FHIR destination.
 *
 * @summary gets the properties of the specified Iot Connector FHIR destination.
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Get.json
 */
async function getAnIoTConnectorDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.iotConnectorFhirDestination.get(
    "testRG",
    "workspace1",
    "blue",
    "dest1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnIoTConnectorDestination();
}

main().catch(console.error);
