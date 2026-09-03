// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this method is used to verify that the connection to the backing data store works.
 * This API is designed to be used for monitoring and debugging purposes. From the caller’s perspective,
 * this method does the following: Calls List on the backing data store, attempting to list up to one blob/object/etc.
 * If the above succeeds, and if a blob/object/etc is found, calls Get on that object, attempting to download one byte.
 *
 * @summary this method is used to verify that the connection to the backing data store works.
 * This API is designed to be used for monitoring and debugging purposes. From the caller’s perspective,
 * this method does the following: Calls List on the backing data store, attempting to list up to one blob/object/etc.
 * If the above succeeds, and if a blob/object/etc is found, calls Get on that object, attempting to download one byte.
 * x-ms-original-file: 2026-04-01/StorageConnectorCRUD/StorageConnectors_TestExistingConnection.json
 */
async function existingConnectionTest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.connectors.testExistingConnection(
    "testrg",
    "teststorageaccount",
    "testconnector",
    { uniqueId: "12345678-1234-1234-1234-12345678912" },
  );
  console.log(result);
}

async function main() {
  await existingConnectionTest();
}

main().catch(console.error);
