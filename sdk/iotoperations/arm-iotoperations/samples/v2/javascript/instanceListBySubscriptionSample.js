// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list InstanceResource resources by subscription ID
 *
 * @summary list InstanceResource resources by subscription ID
 * x-ms-original-file: 2025-10-01/Instance_ListBySubscription_MaximumSet_Gen.json
 */
async function instanceListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instance.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await instanceListBySubscription();
}

main().catch(console.error);
