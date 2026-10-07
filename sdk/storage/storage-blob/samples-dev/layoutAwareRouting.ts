// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME
 *
 * @summary read a blob from the storage endpoints that hold it, using the blob's layout
 */

import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { buffer } from "node:stream/consumers";

// Load the .env file if it exists
import "dotenv/config";

async function main(): Promise<void> {
  // Enter your storage account name
  const account = process.env.ACCOUNT_NAME || "<account name>";

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    new DefaultAzureCredential(),
  );

  // Create a container and a blob to read back
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.create();
  const content = "Hello from the storage node that holds this blob!";
  const blobClient = containerClient.getBlockBlobClient(`newblob${new Date().getTime()}`);
  await blobClient.upload(content, Buffer.byteLength(content));

  // Routing is off by default. Once enabled, downloadToBuffer reads by layout whenever the service
  // hints that it should.
  const downloaded = await blobClient.downloadToBuffer(0, undefined, {
    layoutAwareRouting: "enabled",
  });
  console.log(`Downloaded: ${downloaded.toString()}`);

  // To route reads yourself, read each range of the layout from the endpoint that serves it.
  for await (const page of blobClient.getLayout()) {
    const endpoints = page.endpoints?.endpoint ?? [];
    for (const range of page.ranges?.range ?? []) {
      const endpoint = endpoints.find((e) => e.index === range.endpointIndex);
      const response = await blobClient.download(range.start, range.end - range.start + 1, {
        layoutEndpoint: endpoint?.value,
      });
      if (response.readableStreamBody) {
        const bytes = await buffer(response.readableStreamBody);
        console.log(`Read bytes ${range.start}-${range.end} from ${endpoint?.value}: ${bytes}`);
      }
    }
  }

  await containerClient.delete();
  console.log(`Deleted container ${containerName}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
