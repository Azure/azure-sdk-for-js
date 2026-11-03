// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified IoT Connector.
 *
 * @summary gets the properties of the specified IoT Connector.
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Get.json
 */
async function getAnIoTConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.iotConnectors.get("testRG", "workspace1", "blue");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnIoTConnector();
}

main().catch(console.error);
