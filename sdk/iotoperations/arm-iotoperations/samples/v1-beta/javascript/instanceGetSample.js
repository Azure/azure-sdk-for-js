// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a InstanceResource
 *
 * @summary get a InstanceResource
 * x-ms-original-file: 2024-09-15-preview/Instance_Get_MaximumSet_Gen.json
 */
async function instanceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.instance.get("rgiotoperations", "aio-instance");
  console.log(result);
}

async function main() {
  instanceGet();
}

main().catch(console.error);
