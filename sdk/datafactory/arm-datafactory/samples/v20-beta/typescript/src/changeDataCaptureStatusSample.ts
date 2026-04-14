// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the current status for the change data capture resource.
 *
 * @summary gets the current status for the change data capture resource.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_Status.json
 */
async function changeDataCaptureStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.changeDataCapture.status(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleChangeDataCapture",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await changeDataCaptureStart();
}

main().catch(console.error);
