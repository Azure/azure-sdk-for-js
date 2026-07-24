// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import type { ContainerInfo, ContainerName, Containers, KnownContainerName } from "./types.js";
import { type Document } from "./documents.js";

export const containers: Containers = {};

export function addContainer(name: ContainerName, info: ContainerInfo): void {
  containers[name] = info;
}

export async function createContainer(
  client: BlobServiceClient,
  documents: Document[],
  containerName: KnownContainerName,
): Promise<void> {
  const containerClient = await createContainerHelper(client, containerName, documents);
  addContainer(containerName, { url: containerClient.url });
}

async function createContainerHelper(
  client: BlobServiceClient,
  containerName: KnownContainerName,
  documents: Document[],
): Promise<ContainerClient> {
  const containerClient = client.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  if (documents.length > 0) {
    await uploadDocuments(containerClient, documents);
  } else {
    await clearContainer(containerClient);
  }
  return containerClient;
}

async function clearContainer(client: ContainerClient): Promise<void> {
  const blobs = client.listBlobsFlat();
  for await (const blob of blobs) {
    const blobClient = client.getBlobClient(blob.name);
    await blobClient.delete();
  }
}

async function uploadDocuments(client: ContainerClient, documents: Document[]): Promise<void> {
  for (const document of documents) {
    const blobClient = client.getBlobClient(document.name);
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(document.content, document.content.length);
  }
  return;
}

export async function downloadDocument(
  client: BlobServiceClient,
  containerName: KnownContainerName,
  documentName: string,
): Promise<string> {
  const containerClient = client.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(documentName);
  const blockBlobClient = blobClient.getBlockBlobClient();

  const downloadBlockBlobResponse = await blockBlobClient.download();
  const downloaded = (
    await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
  ).toString();
  return downloaded;
}

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream: NodeJS.ReadableStream | undefined): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream?.on("data", (data: Buffer | string) => {
      chunks.push(typeof data === "string" ? Buffer.from(data) : data);
    });
    readableStream?.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream?.on("error", reject);
  });
}
