// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Customization Task error details.
 *
 * @summary gets Customization Task error details.
 * x-ms-original-file: 2026-01-01-preview/CustomizationTasks_GetErrorDetails.json
 */
async function customizationTasksGetErrorDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.customizationTasks.getErrorDetails(
    "rg1",
    "Contoso",
    "CentralCatalog",
    "SampleTask",
  );
  console.log(result);
}

async function main() {
  await customizationTasksGetErrorDetails();
}

main().catch(console.error);
