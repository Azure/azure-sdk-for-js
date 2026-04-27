// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AkriServiceResource resources by InstanceResource
 *
 * @summary list AkriServiceResource resources by InstanceResource
 * x-ms-original-file: 2026-03-01/AkriService_ListByInstanceResource_MaximumSet_Gen.json
 */
async function akriServiceListByInstanceResourceMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.akriService.listByInstanceResource(
    "rgiotoperations",
    "resource-name123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await akriServiceListByInstanceResourceMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
