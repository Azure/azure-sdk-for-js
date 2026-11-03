// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a change data capture.
 *
 * @summary gets a change data capture.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_Get.json
 */
async function changeDataCaptureGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.changeDataCapture.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleChangeDataCapture",
  );
  console.log(result);
}

async function main() {
  await changeDataCaptureGet();
}

main().catch(console.error);
