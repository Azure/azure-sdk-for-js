// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a RegistryEndpointResource
 *
 * @summary delete a RegistryEndpointResource
 * x-ms-original-file: 2025-10-01/RegistryEndpoint_Delete_MaximumSet_Gen.json
 */
async function registryEndpointDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  await client.registryEndpoint.delete("rgiotoperations", "resource-123", "resource-123");
}

async function main() {
  await registryEndpointDeleteMaximumSet();
}

main().catch(console.error);
