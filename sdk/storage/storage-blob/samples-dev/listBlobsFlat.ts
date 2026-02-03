// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary list blobs in a container, showing options for paging, resuming paging, etc.
 * @azsdk-weight 70
 */

import { ContainerClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

async function main(): Promise<void> {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }
  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = new ContainerClient(
    `https://${accountName}.blob.core.windows.net/${containerName}`,
    new DefaultAzureCredential(),
  );

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  for (let index = 0; index < 7; index++) {
    // Create a blob
    const content = "hello";
    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
    console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  }

  // Iterate over all blobs in the container
  console.log("Blobs:");
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`- ${blob.name}`);
  }

  // The iterator also supports iteration by page with a configurable (and optional) `maxPageSize`. Here, we use a small
  // `maxPageSize` so that the effect of paging is noticeable with our small number of example blobs.
  const maxPageSize = 3;
  console.log(`Blobs by page (maxPageSize: ${maxPageSize}):`);
  let pageNumber = 1;
  for await (const page of containerClient.listBlobsFlat().byPage({ maxPageSize })) {
    console.log(`- Page ${pageNumber++}:`);
    for (const blob of page.segment.blobItems) {
      console.log(`  - ${blob.name}`);
    }
  }

  // The paged iterator also supports resuming from a continuation token. In the following example, we use the
  // continuation token from the first iteration to resume iteration at the second page.

  // Get the continuation token
  console.log("Blobs starting from the second page of results:");
  const iter = containerClient.listBlobsFlat().byPage({ maxPageSize });
  const result = await iter.next();

  if (result.done) {
    throw new Error("Expected at least one page of results.");
  }

  // The continuation token is an optional property of the page.
  const continuationToken = result.value.continuationToken;

  if (!continuationToken) {
    throw new Error(
      "Expected a continuation token from the blob service, but one was not returned.",
    );
  }

  const resumed = containerClient.listBlobsFlat().byPage({ continuationToken, maxPageSize });
  pageNumber = 2;
  for await (const page of resumed) {
    console.log(`- Page ${pageNumber++}:`);
    for (const blob of page.segment.blobItems) {
      console.log(`  - ${blob.name}`);
    }
  }

  // Finally, delete the example container

  await containerClient.delete();
  console.log("Deleted container:", containerClient.containerName);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
