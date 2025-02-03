// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list InstanceResource resources by resource group
 *
 * @summary list InstanceResource resources by resource group
 * x-ms-original-file: 2024-11-01/Instance_ListByResourceGroup_MaximumSet_Gen.json
 */
async function instanceListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.instance.listByResourceGroup(
    "rgiotoperations",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  instanceListByResourceGroup();
}

main().catch(console.error);
