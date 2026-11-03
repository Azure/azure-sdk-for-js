// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an application package record and its associated binary file.
 *
 * @summary deletes an application package record and its associated binary file.
 * x-ms-original-file: 2025-06-01/ApplicationPackageDelete.json
 */
async function applicationPackageDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  await client.applicationPackage.delete("default-azurebatch-japaneast", "sampleacct", "app1", "1");
}

async function main() {
  await applicationPackageDelete();
}

main().catch(console.error);
