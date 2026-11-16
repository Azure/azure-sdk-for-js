// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to test the connection configured on an existing Blob Access Point configuration.
 *
 * @summary test the connection configured on an existing Blob Access Point configuration.
 * x-ms-original-file: 2026-09-01/BlobAccessPointConfigurations_TestExistingConnection.json
 */
async function blobAccessPointConfigurationTestExistingConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobAccessPointConfigurations.testExistingConnection(
    "testrg",
    "teststorageaccount",
    "testaccesspointconfig",
    { uniqueId: "11111111-2222-3333-4444-555555555555" },
  );
  console.log(result);
}

async function main() {
  await blobAccessPointConfigurationTestExistingConnection();
}

main().catch(console.error);
