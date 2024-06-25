// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { ContainerClient, ContainerSASPermissions, BlobServiceClient } from "@azure/storage-blob";
import { TestDocument, createTestDocument } from "../utils/TestDocument";
import { Pipeline } from "@azure/core-rest-pipeline";

// const { BlobServiceClient } = require("@azure/storage-blob");

export const ONE_TEST_DOCUMENTS: TestDocument[] = [
  createTestDocument("Document1.txt", "First english test document"),
];

export const TWO_TEST_DOCUMENTS: TestDocument[] = [
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

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  return `${sasUrl}`;
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

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  return `${sasUrl}`;
}

export async function createGlossaryContainer(recorder: Recorder): Promise<string> {
  const glossaryName = "validGlossary.csv";
  const glossaryContent = "test, glossaryTest";
  const documents: TestDocument[] = [createTestDocument(glossaryName, glossaryContent)];
  const containerName = recorder.variable("glossaryContainer", `glossary-${getUniqueName()}`);
  const containerClient = await createContainer(recorder, containerName, documents);

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });

  // Extract the base URL and query parameters
  const urlParts = `${sasUrl}`.split("?");
  const baseUrl = urlParts[0];
  const queryParams = urlParts[1];

  // Add the document name to the base URL
  const newUrl = `${baseUrl}/${glossaryName}?${queryParams}`;
  return `${newUrl}`;
}

export async function createTargetContainerWithInfo(
  recorder: Recorder,
  documents?: TestDocument[],
): Promise<Map<string, string>> {
  const containerName = recorder.variable("targetContainer", `target-${getUniqueName()}`);
  const containerClient = await createContainer(recorder, containerName, documents);

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });

  const sasUrlTest = recorder.variable("sasUrl", `${sasUrl}`);
  const containerValuesMap: Map<string, string> = new Map();
  containerValuesMap.set("sasUrl", sasUrlTest);
  containerValuesMap.set("containerName", containerName);
  return containerValuesMap;
}

async function createContainer(
  recorder: Recorder,
  containerName: string,
  documents?: TestDocument[],
): Promise<ContainerClient> {
  const blobServiceClient: BlobServiceClient = BlobServiceClient.fromConnectionString(
    env.DOCUMENT_TRANSLATION_CONNECTION_STRING as string,
  );
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
  const blobServiceClient: BlobServiceClient = BlobServiceClient.fromConnectionString(
    env.DOCUMENT_TRANSLATION_CONNECTION_STRING as string,
  );
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

function getDateOneDayAfter(): Date {
  const currentDate = new Date();
  const nextDayDate = new Date(currentDate);
  nextDayDate.setDate(currentDate.getDate() + 1);
  return nextDayDate;
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
