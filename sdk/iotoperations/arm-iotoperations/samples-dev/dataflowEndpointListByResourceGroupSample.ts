// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list DataflowEndpointResource resources by InstanceResource
 *
 * @summary list DataflowEndpointResource resources by InstanceResource
 * x-ms-original-file: 2024-11-01/DataflowEndpoint_ListByResourceGroup_MaximumSet_Gen.json
 */

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

async function dataflowEndpointListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataflowEndpoint.listByResourceGroup(
    "rgiotoperations",
    "resource-name123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dataflowEndpointListByResourceGroup();
}

main().catch(console.error);
