// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all FHIR destinations for the given IoT Connector
 *
 * @summary lists all FHIR destinations for the given IoT Connector
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_List.json
 */
async function listIoTConnectors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fhirDestinations.listByIotConnector(
    "testRG",
    "workspace1",
    "blue",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listIoTConnectors();
}

main().catch(console.error);
