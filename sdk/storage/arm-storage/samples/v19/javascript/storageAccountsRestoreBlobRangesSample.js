// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Restore blobs in the specified blob ranges
 *
 * @summary Restore blobs in the specified blob ranges
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobRangesRestore.json
 */
async function blobRangesRestore() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9101";
  const accountName = "sto4445";
  const parameters = {
    blobRanges: [
      { endRange: "container/blobpath2", startRange: "container/blobpath1" },
      { endRange: "", startRange: "container2/blobpath3" },
    ],
    timeToRestore: new Date("2019-04-20T15:30:00.0000000Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.beginRestoreBlobRangesAndWait(
    resourceGroupName,
    accountName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await blobRangesRestore();
}

main().catch(console.error);
