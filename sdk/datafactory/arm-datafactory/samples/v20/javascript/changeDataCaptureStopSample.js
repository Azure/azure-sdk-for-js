// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops a change data capture.
 *
 * @summary stops a change data capture.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_Stop.json
 */
async function changeDataCaptureStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.changeDataCapture.stop(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleChangeDataCapture",
  );
}

async function main() {
  await changeDataCaptureStop();
}

main().catch(console.error);
