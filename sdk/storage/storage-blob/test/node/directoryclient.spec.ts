// import * as assert from 'assert';
import * as assert from "assert";
import * as dotenv from "dotenv";

import { ContainerClient, DirectoryClient, newPipeline } from "../../src";
import { BlobServiceClient } from "../../src/BlobServiceClient";
import { AnonymousCredential } from "../../src/credentials/AnonymousCredential";
import {
  getAdlsBSU,
  getAdlsConnectionStringFromEnvironment,
  getAdlsSASConnectionStringFromEnvironment,
} from "../utils";
import { record } from "../utils/recorder";

dotenv.config({ path: "../.env" });

// ADLS related APIs depends on following optional environments, otherwise cases will be ignored in a live test
// When recording test cases "TEST_MODE=record", following environment variables are required
// DFS_ACCOUNT_NAME_OPTIONAL
// DFS_ACCOUNT_KEY_OPTIONAL
// DFS_ACCOUNT_SAS_OPTIONAL
// DFS_STORAGE_CONNECTION_STRING_OPTIONAL
describe("DirectoryClient Node.js only", () => {
  let blobServiceClient: BlobServiceClient;
  try {
    blobServiceClient = getAdlsBSU();
  } catch (err) {}

  let containerName: string;
  let containerClient: ContainerClient;
  let directoryName: string;
  let directoryClient: DirectoryClient;
  let recorder: any;

  beforeEach(async function() {
    if (blobServiceClient === undefined) {
      this.skip();
    }

    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    directoryName = recorder.getUniqueName("directory");
    directoryClient = containerClient.getDirectoryClient(directoryName);
  });

  afterEach(async function() {
    await containerClient.delete();
    recorder.stop();
  });

  it("create DirectoryClient with constructor should work with connection string", async () => {
    const directoryClientCon = new DirectoryClient(
      getAdlsConnectionStringFromEnvironment(),
      containerName,
      directoryName
    );
    await directoryClientCon.create();
    await directoryClientCon.deleteSegment();
  });

  it("create DirectoryClient with constructor should work with SAS connection string", async () => {
    const directoryClientSAS = new DirectoryClient(
      getAdlsSASConnectionStringFromEnvironment(),
      containerName,
      directoryName
    );
    await directoryClientSAS.create();
    await directoryClientSAS.deleteSegment();
  });

  it("create DirectoryClient with constructor should work with url and pipeline", async () => {
    const directoryClientSAS = new DirectoryClient(
      getAdlsSASConnectionStringFromEnvironment(),
      containerName,
      directoryName
    );

    const directoryClientURL = new DirectoryClient(
      directoryClientSAS.url,
      newPipeline(new AnonymousCredential())
    );
    await directoryClientURL.create();
    await directoryClientURL.deleteSegment();
  });

  it("create DirectoryClient with constructor should work with url", async () => {
    const directoryClientSAS = new DirectoryClient(
      getAdlsSASConnectionStringFromEnvironment(),
      containerName,
      directoryName
    );

    const directoryClientURL = new DirectoryClient(directoryClientSAS.url);
    await directoryClientURL.create();
    await directoryClientURL.deleteSegment();
  });

  it("move directory should work", async () => {
    const count = 3;
    for (let i = 0; i < count; i++) {
      await directoryClient.getDirectoryClient(recorder.getUniqueName("directory" + i)).create();
    }

    const destDirectoryName = recorder.getUniqueName("directorydest");
    const destDirectoryClient = containerClient.getDirectoryClient(destDirectoryName);
    let marker;
    do {
      const response = (await directoryClient.moveSegment(destDirectoryClient, marker)) as any;
      marker = response.marker;
    } while (marker);

    let i = 0;
    for await (const _blob of containerClient.listBlobsFlat({ prefix: `${destDirectoryName}/` })) {
      i++;
    }
    assert.equal(i, count);
  });

  it("move directory async iterator should work", async () => {
    const count = 3;
    for (let i = 0; i < count; i++) {
      await directoryClient.getDirectoryClient(recorder.getUniqueName("directory" + i)).create();
    }

    const destDirectoryName = recorder.getUniqueName("directorydest");
    const destDirectoryClient = containerClient.getDirectoryClient(destDirectoryName);
    for await (const _response of directoryClient.move(destDirectoryClient)) {
    }

    let i = 0;
    for await (const _blob of containerClient.listBlobsFlat({ prefix: `${destDirectoryName}/` })) {
      i++;
    }
    assert.equal(i, count);
  });
});
