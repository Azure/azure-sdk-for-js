// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list InstanceResource resources by subscription ID
 *
 * @summary list InstanceResource resources by subscription ID
 * x-ms-original-file: 2024-11-01/Instance_ListBySubscription_MaximumSet_Gen.json
 */

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

async function instanceListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instance.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await instanceListBySubscription();
}

main().catch(console.error);
