// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobServiceClient } from "@azure/storage-blob";
import { PassThrough } from "node:stream";
import { join } from "node:path";

export interface AzureStorageClientOptions {
  containerName: string;
  connectionString: string;
}

export async function createAzureStorageClient(options: AzureStorageClientOptions) {
  const { containerName, connectionString } = options;
  const client = BlobServiceClient.fromConnectionString(connectionString);
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
