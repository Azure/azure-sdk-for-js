// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ContainerClient, ContainerSASPermissions, BlobServiceClient } from "@azure/storage-blob";
import { TestDocument, createTestDocument } from "../utils/TestDocument";
import {
  BatchRequest,
  DocumentTranslationClient,
  StartTranslationDefaultResponse,
  getLongRunningPoller,
} from "../../../src";

const connectionString =
  process.env["DOCUMENT_TRANSLATION_CONNECTION_STRING"] || "ConnectionString";

export async function StartTranslationAndWait(
  client: DocumentTranslationClient,
  batchRequests: { inputs: BatchRequest[] },
): Promise<StartTranslationDefaultResponse> {
  // Start translation
  const response = await client.path("/document/batches").post({
    body: batchRequests,
  });

  // Wait until the operation completes
  const poller = getLongRunningPoller(client, response, undefined);
  await (await poller).pollUntilDone();

  return response as StartTranslationDefaultResponse;
}

export const ONE_TEST_DOCUMENTS: TestDocument[] = [
  createTestDocument("Document1.txt", "First english test document"),
];

export const TWO_TEST_DOCUMENTS: TestDocument[] = [
  createTestDocument("Document1.txt", "First english test file"),
  createTestDocument("File2.txt", "Second english test file"),
];

export async function createSourceContainer(
  documents: TestDocument[],
  containerName?: string | undefined,
): Promise<string> {
  if (containerName === undefined) {
    containerName = `source-${getUniqueName()}`;
  }
  const containerClient = await createContainer(containerName, documents);

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  return `${sasUrl}`;
}

export async function createTargetContainer(
  containerName?: string | undefined,
  documents?: TestDocument[],
): Promise<string> {
  if (containerName === undefined) {
    containerName = `target-${getUniqueName()}`;
  }
  const containerClient = await createContainer(containerName, documents);

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  return `${sasUrl}`;
}

async function createContainer(
  containerName: string,
  documents?: TestDocument[],
): Promise<ContainerClient> {
  const blobServiceClient: BlobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  if (documents && documents.length > 0) {
    await uploadDocuments(containerClient, documents);
  }
  return containerClient;
}

export function getUniqueName(): string {
  const randomNumber = Math.floor(Math.random() * 1e10);
  return randomNumber.toString().padStart(10, "0");
}

async function uploadDocuments(containerClient: ContainerClient, documents: TestDocument[]) {
  for (const document of documents) {
    const blobClient = containerClient.getBlobClient(document.name);
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(document.content, document.content.length);
  }
}

function getDateOneDayAfter(): Date {
  const currentDate = new Date();
  const nextDayDate = new Date(currentDate);
  nextDayDate.setDate(currentDate.getDate() + 1);
  return nextDayDate;
}
