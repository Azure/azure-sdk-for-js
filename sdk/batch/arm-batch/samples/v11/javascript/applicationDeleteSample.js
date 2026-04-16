// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an application.
 *
 * @summary deletes an application.
 * x-ms-original-file: 2025-06-01/ApplicationDelete.json
 */
async function applicationDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  await client.application.delete("default-azurebatch-japaneast", "sampleacct", "app1");
}

async function main() {
  await applicationDelete();
}

main().catch(console.error);
