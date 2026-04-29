// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all resources of type change data capture.
 *
 * @summary lists all resources of type change data capture.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_ListByFactory.json
 */
async function changeDataCaptureListByFactory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.changeDataCapture.listByFactory(
    "exampleResourceGroup",
    "exampleFactoryName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await changeDataCaptureListByFactory();
}

main().catch(console.error);
