// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary list containers in an account, showing options for paging, resuming paging, etc.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;

  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // List containers
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential(),
  );

  // Iterate over all containers in the account
  console.log("Containers:");
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`- ${container.name}`);
  }

  // The iterator also supports iteration by page with a configurable (and optional) `maxPageSize` setting.
  console.log("Containers (by page):");
  for await (const response of blobServiceClient.listContainers().byPage({
    maxPageSize: 20,
  })) {
    console.log("- Page:");
    if (response.containerItems) {
      for (const container of response.containerItems) {
        console.log(`  - ${container.name}`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
