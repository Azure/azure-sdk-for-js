// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { ContainerClient, BlobServiceClient } from "@azure/storage-blob";
import { TestDocument, createTestDocument } from "../utils/TestDocument";
import { Pipeline } from "@azure/core-rest-pipeline";
import { createTestCredential } from "@azure-tools/test-credential";

export const ONE_TEST_DOCUMENTS = [
  createTestDocument("Document1.txt", "First english test document"),
];

export const TWO_TEST_DOCUMENTS = [
  createTestDocument("Document1.txt", "First english test file"),
  createTestDocument("File2.txt", "Second english test file"),
];

export async function createSourceContainer(
  recorder: Recorder,
  documents: TestDocument[],
  containerName?: string | undefined,
): Promise<string> {
  if (containerName === undefined) {
    containerName = recorder.variable("sourceContainer", `source-${getUniqueName()}`);
  }
  const containerClient = await createContainer(recorder, containerName, documents);
  return containerClient.url;
}

export async function createTargetContainer(
  recorder: Recorder,
  containerName?: string | undefined,
  documents?: TestDocument[],
): Promise<string> {
  if (containerName === undefined) {
    containerName = recorder.variable("targetContainer", `target-${getUniqueName()}`);
  }
  const containerClient = await createContainer(recorder, containerName, documents);
  return containerClient.url;
}

export async function createGlossaryContainer(recorder: Recorder): Promise<string> {
  const glossaryName = "validGlossary.csv";
  const glossaryContent = "test, glossaryTest";
  const documents = [createTestDocument(glossaryName, glossaryContent)];
  const containerName = recorder.variable("glossaryContainer", `glossary-${getUniqueName()}`);
  const containerClient = await createContainer(recorder, containerName, documents);
  const containerUrl = containerClient.url;

  // Add the glossary name to the base URL
  const newUrl = `${containerUrl}/${glossaryName}`;
  return `${newUrl}`;
}

export async function createTargetContainerWithInfo(
  recorder: Recorder,
  documents?: TestDocument[],
): Promise<Map<string, string>> {
  const containerName = recorder.variable("targetContainer", `target-${getUniqueName()}`);
  const containerClient = await createContainer(recorder, containerName, documents);
  const containerUrl = containerClient.url;
  const containerUrlTest = recorder.variable("containerUrl", `${containerUrl}`);

  const containerValuesMap: Map<string, string> = new Map();
  containerValuesMap.set("containerUrl", containerUrlTest);
  containerValuesMap.set("containerName", containerName);
  return containerValuesMap;
}

async function createContainer(
  recorder: Recorder,
  containerName: string,
  documents?: TestDocument[],
): Promise<ContainerClient> {
  const storageName = env.DOCUMENT_TRANSLATION_STORAGE_NAME as string;
  const url = `https://${storageName}.blob.core.windows.net/`;
  const blobServiceClient: BlobServiceClient = new BlobServiceClient(url, createTestCredential());
  configureBlobStorageClient(recorder, blobServiceClient);

  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  if (documents && documents.length > 0) {
    await uploadDocuments(containerClient, documents);
  }
  return containerClient;
}

function configureBlobStorageClient(
  recorder: Recorder,
  serviceClient: ContainerClient | BlobServiceClient,
): void {
  const options = recorder.configureClientOptions({});

  const pipeline: Pipeline = (serviceClient as any).storageClientContext.pipeline;
  for (const { policy } of options.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, { afterPhase: "Sign", afterPolicies: ["injectorPolicy"] });
  }
  return;
}

async function uploadDocuments(containerClient: ContainerClient, documents: TestDocument[]) {
  for (const document of documents) {
    const blobClient = containerClient.getBlobClient(document.name);
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(document.content, document.content.length);
  }
  return;
}

export async function downloadDocument(
  recorder: Recorder,
  containerName: string,
  documentName: string,
): Promise<string> {
  const storageName = env.DOCUMENT_TRANSLATION_STORAGE_NAME as string;
  const url = `https://${storageName}.blob.core.windows.net/`;
  const blobServiceClient: BlobServiceClient = new BlobServiceClient(url, createTestCredential());
  configureBlobStorageClient(recorder, blobServiceClient);

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(documentName);
  const blockBlobClient = blobClient.getBlockBlobClient();

  const downloadBlockBlobResponse = await blockBlobClient.download();
  const downloaded = (
    await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
  ).toString();
  console.log("Downloaded Stream = " + downloaded);
  return downloaded;
}

export function getUniqueName(): string {
  const randomNumber = Math.floor(Math.random() * 1e10);
  return randomNumber.toString().padStart(10, "0");
}

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream: NodeJS.ReadableStream | undefined): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream?.on("data", (data: Buffer | string) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream?.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream?.on("error", reject);
  });
}
