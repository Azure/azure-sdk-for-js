// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DataflowProfileResource resources by InstanceResource
 *
 * @summary list DataflowProfileResource resources by InstanceResource
 * x-ms-original-file: 2024-09-15-preview/DataflowProfile_ListByResourceGroup_MaximumSet_Gen.json
 */
async function dataflowProfileListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.dataflowProfile.listByResourceGroup(
    "rgiotoperations",
    "resource-name123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  dataflowProfileListByResourceGroup();
}

main().catch(console.error);
