// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a change data capture.
 *
 * @summary starts a change data capture.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_Start.json
 */
async function changeDataCaptureStart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.changeDataCapture.start(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleChangeDataCapture",
  );
}

async function main() {
  await changeDataCaptureStart();
}

main().catch(console.error);
