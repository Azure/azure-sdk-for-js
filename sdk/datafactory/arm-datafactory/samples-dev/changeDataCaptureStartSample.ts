// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a change data capture.
 *
 * @summary starts a change data capture.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_Start.json
 */
async function changeDataCaptureStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.changeDataCapture.start(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleChangeDataCapture",
  );
}

async function main(): Promise<void> {
  await changeDataCaptureStart();
}

main().catch(console.error);
