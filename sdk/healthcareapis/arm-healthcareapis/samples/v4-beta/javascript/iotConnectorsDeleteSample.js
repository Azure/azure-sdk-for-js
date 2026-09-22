// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an IoT Connector.
 *
 * @summary deletes an IoT Connector.
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Delete.json
 */
async function deleteAnIoTConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.iotConnectors.delete("testRG", "blue", "workspace1");
}

async function main() {
  await deleteAnIoTConnector();
}

main().catch(console.error);
