// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the queues within a namespace.
 *
 * @summary gets the queues within a namespace.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueListByNameSpace.json
 */
async function queueListByNameSpace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queues.listByNamespace("ArunMonocle", "sdk-Namespace-3174")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queueListByNameSpace();
}

main().catch(console.error);
