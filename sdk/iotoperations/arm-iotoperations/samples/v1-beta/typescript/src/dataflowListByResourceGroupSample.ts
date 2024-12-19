// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DataflowResource resources by DataflowProfileResource
 *
 * @summary list DataflowResource resources by DataflowProfileResource
 * x-ms-original-file: 2024-11-01/Dataflow_ListByProfileResource_MaximumSet_Gen.json
 */
async function dataflowListByProfileResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.dataflow.listByResourceGroup(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  dataflowListByProfileResource();
}

main().catch(console.error);
