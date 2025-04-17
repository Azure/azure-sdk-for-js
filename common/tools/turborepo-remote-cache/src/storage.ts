// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import { PassThrough } from "node:stream";
import { join } from "node:path";

export interface AzureStorageClientOptions {
  containerName: string;
  account: string;
}

export async function createAzureStorageClient(options: AzureStorageClientOptions) {
  const { containerName, account } = options;
  const client = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    new DefaultAzureCredential(),
  );
  console.log(
    `Creating Azure Storage client for account: ${account}, container: ${containerName} at https://${account}.blob.core.windows.net`,
  );

  const containerClient = client.getContainerClient(containerName);
  await containerClient.createIfNotExists();
  return {
    contentLength: async (team: string, hash: string) => {
      const blobPath = join(team, hash);
      const blobClient = containerClient.getBlobClient(blobPath);
      const properties = await blobClient.getProperties();
      return properties.contentLength;
    },
    exists: async (team: string, hash: string) => {
      const blobPath = join(team, hash);
      const blobClient = containerClient.getBlobClient(blobPath);
      const exists = await blobClient.exists();
      return exists;
    },
    createReadStream: async (team: string, hash: string) => {
      const blobPath = join(team, hash);
      const blobClient = containerClient.getBlobClient(blobPath);
      const stream = new PassThrough();
      const response = await blobClient.download();
      const { readableStreamBody } = response;
      if (readableStreamBody) {
        readableStreamBody.pipe(stream);
      }
      return stream;
    },
    createWriteStream: async (team: string, hash: string) => {
      const blobPath = join(team, hash);
      const blobClient = containerClient.getBlockBlobClient(blobPath);
      const stream = new PassThrough();
      blobClient.uploadStream(stream);
      return stream;
    },
  };
}
