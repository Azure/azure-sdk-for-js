// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch an IoT Connector.
 *
 * @summary patch an IoT Connector.
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Patch.json
 */
async function patchAnIoTConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.iotConnectors.update("testRG", "blue", "workspace1", {
    identity: { type: "SystemAssigned" },
    tags: { additionalProp1: "string", additionalProp2: "string", additionalProp3: "string" },
  });
  console.log(result);
}

async function main() {
  await patchAnIoTConnector();
}

main().catch(console.error);
