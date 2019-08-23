// import * as assert from 'assert';
import * as dotenv from "dotenv";
import * as assert from "assert";

import { ContainerClient, DirectoryClient, newPipeline } from "../../src";
import {
  getBSU,
  getConnectionStringFromEnvironment,
  getSASConnectionStringFromEnvironment
} from "../utils";
import { record } from "../utils/recorder";
import { AnonymousCredential } from "../../src/credentials/AnonymousCredential";

dotenv.config({ path: "../.env" });

describe("DirectoryClient Node.js only", () => {
  const blobServiceClient = getBSU();
  let containerName: string;
  let containerClient: ContainerClient;
  let directoryName: string;
  let directoryClient: DirectoryClient;
  let recorder: any;

  beforeEach(async function() {
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
      getConnectionStringFromEnvironment(),
      containerName,
      directoryName
    );
    await directoryClientCon.create();
    await directoryClientCon.deleteSegment();
  });

  it("create DirectoryClient with constructor should work with SAS connection string", async () => {
    const directoryClientSAS = new DirectoryClient(
      getSASConnectionStringFromEnvironment(),
      containerName,
      directoryName
    );
    await directoryClientSAS.create();
    await directoryClientSAS.deleteSegment();
  });

  it("create DirectoryClient with constructor should work with url and pipeline", async () => {
    const directoryClientSAS = new DirectoryClient(
      getSASConnectionStringFromEnvironment(),
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
      getSASConnectionStringFromEnvironment(),
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
