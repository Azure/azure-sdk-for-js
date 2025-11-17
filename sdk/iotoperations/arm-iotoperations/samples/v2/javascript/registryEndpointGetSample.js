// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a RegistryEndpointResource
 *
 * @summary get a RegistryEndpointResource
 * x-ms-original-file: 2025-10-01/RegistryEndpoint_Get_MaximumSet_Gen.json
 */
async function registryEndpointGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.registryEndpoint.get(
    "rgiotoperations",
    "resource-123",
    "resource-123",
  );
  console.log(result);
}

async function main() {
  await registryEndpointGetMaximumSet();
}

main().catch(console.error);
