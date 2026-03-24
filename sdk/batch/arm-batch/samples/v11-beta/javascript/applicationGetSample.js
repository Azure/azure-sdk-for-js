// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified application.
 *
 * @summary gets information about the specified application.
 * x-ms-original-file: 2025-06-01/ApplicationGet.json
 */
async function applicationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.application.get("default-azurebatch-japaneast", "sampleacct", "app1");
  console.log(result);
}

async function main() {
  await applicationGet();
}

main().catch(console.error);
