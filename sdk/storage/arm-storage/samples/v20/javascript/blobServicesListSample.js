// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list blob services of storage account. It returns a collection of one object named default.
 *
 * @summary list blob services of storage account. It returns a collection of one object named default.
 * x-ms-original-file: 2025-08-01/BlobServicesList.json
 */
async function listBlobServices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.blobServices.list("res4410", "sto8607")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBlobServices();
}

main().catch(console.error);
