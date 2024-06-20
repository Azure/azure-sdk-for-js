// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  //Recorder,
  env,
} from "@azure-tools/test-recorder";
import { BlobClient, ContainerClient, ContainerSASPermissions } from "@azure/storage-blob";
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

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  return `${sasUrl}`;
}

export async function createTargetContainer(documents?: TestDocument[]): Promise<string> {
  const containerName = `target-${getUniqueName()}`;
  const containerClient = await createContainer(containerName, documents);

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  return `${sasUrl}`;
}

export async function createGlossaryContainer(): Promise<string> {
  const glossaryName = "validGlossary.csv";
  const glossaryContent = "test, glossaryTest";
  const documents: TestDocument[] = [
    createTestDocument(glossaryName, glossaryContent)
  ];
  const containerName = `glossary-${getUniqueName()}`;
  const containerClient = await createContainer(containerName, documents);

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  // Extract the base URL and query parameters
  const urlParts = `${sasUrl}`.split('?');
  const baseUrl = urlParts[0];
  const queryParams = urlParts[1];

  // Add the document name to the base URL
  const newUrl = `${baseUrl}/${glossaryName}?${queryParams}`;
  return `${newUrl}`;
}

export async function createTargetContainerWithInfo(documents?: TestDocument[]): Promise<Map<string, string>> {
  const containerName = `target-${getUniqueName()}`;
  const containerClient = await createContainer(containerName, documents);

  const sasUrl = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rwl"),
    expiresOn: getDateOneDayAfter(),
  });
  const containerValuesMap: Map<string, string> = new Map();
  containerValuesMap.set("sasUrl", sasUrl);
  containerValuesMap.set("containerName", containerName);
  return containerValuesMap;
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

export async function downloadDocument(containerName: string, documentName: string) {
  const blobClient = new BlobClient(
    env.DOCUMENT_TRANSLATION_CONNECTION_STRING as string,
    containerName,
    documentName
  )
  const downloadBlockBlobResponse = await blobClient.download();
  const downloaded = (await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)).toString();
  return downloaded;
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

