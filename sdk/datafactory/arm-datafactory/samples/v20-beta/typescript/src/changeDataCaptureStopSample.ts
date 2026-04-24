// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops a change data capture.
 *
 * @summary stops a change data capture.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_Stop.json
 */
async function changeDataCaptureStop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.changeDataCapture.stop(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleChangeDataCapture",
  );
}

async function main(): Promise<void> {
  await changeDataCaptureStop();
}

main().catch(console.error);
