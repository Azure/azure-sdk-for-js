// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a change data capture.
 *
 * @summary deletes a change data capture.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_Delete.json
 */
async function changeDataCaptureDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.changeDataCapture.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleChangeDataCapture",
  );
}

async function main() {
  await changeDataCaptureDelete();
}

main().catch(console.error);
