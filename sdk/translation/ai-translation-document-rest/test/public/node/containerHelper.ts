// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  env,
} from "@azure-tools/test-recorder";
import { ContainerClient, ContainerSASPermissions } from "@azure/storage-blob";
import { TestDocument, createTestDocument } from '../utils/TestDocument';

const { BlobServiceClient } = require("@azure/storage-blob");

export const ONE_TEST_DOCUMENTS: TestDocument[] = [
  createTestDocument('Document1.txt', 'First english test document')
];

export const TWO_TEST_DOCUMENTS: TestDocument[] = [
  createTestDocument('Document1.txt', 'First english test file'),
  createTestDocument('File2.txt', 'Second english test file')
];

export async function createSourceContainer(documents: TestDocument[]): Promise<string> {
  const containerName = `source-${getUniqueName()}`;
  const containerClient = await createContainer(containerName, documents);

  const sasToken = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  return `${sasToken}`;
}

export async function createTargetContainer(documents?: TestDocument[]): Promise<string> {
  const containerName = `target-${getUniqueName()}`;
  const containerClient = await createContainer(containerName, documents);

  const sasToken = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  return `${sasToken}`;
}

async function createContainer(containerName: string, documents?: TestDocument[]): Promise<ContainerClient> {
  const blobServiceClient = BlobServiceClient.fromConnectionString(env.DOCUMENT_TRANSLATION_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  if (documents && documents.length > 0) {
    await uploadDocuments(containerClient, documents);
  }  
  return containerClient;
}

async function uploadDocuments(containerClient: ContainerClient, documents: TestDocument[]) {
  for (const document of documents) {
    const blobClient = containerClient.getBlobClient(document.name);
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(document.content, document.content.length);
  }
}

function getUniqueName(): string {
  const randomNumber = Math.floor(Math.random() * 1e10);
  return randomNumber.toString().padStart(10, '0');
}

function getDateOneDayAfter(): Date {
  const currentDate = new Date(); 
  const nextDayDate = new Date(currentDate); 
  nextDayDate.setDate(currentDate.getDate() + 1);
  return nextDayDate;
}
