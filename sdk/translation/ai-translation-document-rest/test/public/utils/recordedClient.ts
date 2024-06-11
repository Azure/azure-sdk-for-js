// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import {
  Recorder,
  RecorderStartOptions,
  //SanitizerOptions,
  //isPlaybackMode,
  //assertEnvironmentVariable,
  env,
} from "@azure-tools/test-recorder";
import { ClientOptions } from "@azure-rest/core-client";
import { DocumentTranslationClient } from "../../../src";
import createClient from "../../../src/documentTranslationClient";
import { ContainerClient, ContainerSASPermissions } from "@azure/storage-blob";
import { randomName } from "./testHelper";
//import { Readable } from "stream";

const { BlobServiceClient } = require("@azure/storage-blob");
let recorder: Recorder;

const envSetupForPlayback: Record<string, string> = {
  DOCUMENT_TRANSLATION_API_KEY: "fakeApiKey",
  DOCUMENT_TRANSLATION_ENDPOINT: "https://fakeEndpoint-doctranslation.cognitive.microsofttranslator.com",
  DOCUMENT_TRANSLATION_STORAGE_NAME: "fakeStorageName",
  DOCUMENT_TRANSLATION_CONNECTION_STRING: "DefaultEndpointsProtocol=https;AccountName=fakeStorageName;AccountKey=fakeKey;EndpointSuffix=core.windows.net"
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
};

export const ONE_TEST_DOCUMENTS: TestDocument[] = [
  new TestDocument("Document1.txt", "First english test document")
];

export const TWO_TEST_DOCUMENTS: TestDocument[] = [
  new TestDocument("Document1.txt", "First english test file"),
  new TestDocument("File2.txt", "Second english test file")
];

export async function startRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createDocumentTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<DocumentTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const endpoint = env.DOCUMENT_TRANSLATION_ENDPOINT ?? ""
  const credentials = { key: env.DOCUMENT_TRANSLATION_API_KEY ?? "" };

  const client = createClient(endpoint, credentials, updatedOptions);
  return client;
}

export async function createSourceContainer(documents: TestDocument[]): Promise<string> {
  //const containerName = `source-${uuidv4()}`;
  const containerName = `source-${randomName("source", 10)}`;
  const containerClient = await createContainer(containerName, documents);
  
  const aDayLater = new Date(recorder.variable("aDayLater", new Date().toISOString()));
  aDayLater.setDate(aDayLater.getDate() + 1);

  const sasToken = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("rl"),
    expiresOn: aDayLater,
  });
  return `${containerClient.url}?${sasToken}`;
}

export async function createTargetContainer(documents: TestDocument[]): Promise<string> {
  //const containerName = `target-${uuidv4()}`;
  const containerName = `target-${randomName("source", 10)}`;
  const containerClient = await createContainer(containerName, documents);
  
  const aDayLater = new Date(recorder.variable("aDayLater", new Date().toISOString()));
  aDayLater.setDate(aDayLater.getDate() + 1);

  const sasToken = await containerClient.generateSasUrl({
    permissions: ContainerSASPermissions.parse("wl"),
    expiresOn: aDayLater,
  });
  return `${containerClient.url}?${sasToken}`;
}

async function createContainer(containerName: string, documents: TestDocument[]): Promise<ContainerClient> {
  const blobServiceClient = BlobServiceClient.fromConnectionString(env.DOCUMENT_TRANSLATION_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  //if (!(await containerClient.exists())) {
  //  await containerClient.create();
  //}

  if (documents && documents.length > 0) {
    await uploadDocuments(containerClient, documents);
  }

  return containerClient;
}

async function uploadDocuments(containerClient: ContainerClient, documents: TestDocument[]) {
  for (const document of documents) {
    const blobClient = containerClient.getBlobClient(document.getName());
    const blockBlobClient = blobClient.getBlockBlobClient();

    //const stream = Readable.from(document.getContent());
    await blockBlobClient.upload(document.getContent(), document.getContent().length);
  }
}