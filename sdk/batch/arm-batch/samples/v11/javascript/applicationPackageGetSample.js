// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified application package.
 *
 * @summary gets information about the specified application package.
 * x-ms-original-file: 2025-06-01/ApplicationPackageGet.json
 */
async function applicationPackageGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.applicationPackage.get(
    "default-azurebatch-japaneast",
    "sampleacct",
    "app1",
    "1",
  );
  console.log(result);
}

async function main() {
  await applicationPackageGet();
}

main().catch(console.error);
