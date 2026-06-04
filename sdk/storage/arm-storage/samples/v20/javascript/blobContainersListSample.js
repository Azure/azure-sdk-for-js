// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 *
 * @summary lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 * x-ms-original-file: 2025-08-01/BlobContainersList.json
 */
async function listContainers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.blobContainers.list("res9290", "sto1590")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 *
 * @summary lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 * x-ms-original-file: 2025-08-01/DeletedBlobContainersList.json
 */
async function listDeletedContainers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.blobContainers.list("res9290", "sto1590", {
    include: "deleted",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContainers();
  await listDeletedContainers();
}

main().catch(console.error);
