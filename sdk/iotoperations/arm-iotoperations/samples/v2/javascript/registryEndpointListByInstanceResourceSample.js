// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list RegistryEndpointResource resources by InstanceResource
 *
 * @summary list RegistryEndpointResource resources by InstanceResource
 * x-ms-original-file: 2025-10-01/RegistryEndpoint_ListByInstanceResource_MaximumSet_Gen.json
 */
async function registryEndpointListByInstanceResourceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registryEndpoint.listByInstanceResource(
    "rgiotoperations",
    "resource-123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await registryEndpointListByInstanceResourceMaximumSet();
}

main().catch(console.error);
