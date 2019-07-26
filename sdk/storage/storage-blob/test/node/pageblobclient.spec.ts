import * as assert from "assert";

import { getBSU, getConnectionStringFromEnvironment, bodyToString } from "../utils";
import {
  newPipeline,
  PageBlobClient,
  SharedKeyCredential,
  ContainerClient,
  BlobClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions
} from "../../src";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { record, delay } from "../utils/recorder";

describe("PageBlobClient Node.js only", () => {
  const blobServiceClient = getBSU();
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let pageBlobClient: PageBlobClient;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    pageBlobClient = blobClient.getPageBlobClient();
  });

  afterEach(async function() {
    await containerClient.delete();
    recorder.stop();
  });

  it("startCopyIncremental", async () => {
    await pageBlobClient.create(1024, {
      metadata: {
        sourcemeta: "val"
      }
    });
    await pageBlobClient.uploadPages("b".repeat(1024), 0, 1024);

    let snapshotResult = await pageBlobClient.createSnapshot();
    assert.ok(snapshotResult.snapshot);

    const destPageBlobClient = containerClient.getPageBlobClient(recorder.getUniqueName("page"));

    await containerClient.setAccessPolicy("container");

    await delay(5 * 1000);

    let copySource = pageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    let copyResponse = await destPageBlobClient.startCopyIncremental(copySource);

    async function waitForCopy(retries = 0) {
      if (retries >= 30) {
        throw new Error("Check copy status exceed max retries counts");
      }

      switch (copyResponse.copyStatus) {
        case "success":
          return;
        case "aborted":
          throw new Error("Copy unexcepted aborted.");
        case "pending":
          await delay(3000);
          copyResponse = await destPageBlobClient.getProperties();
          await waitForCopy(++retries);
          return;
        case "failed":
          throw new Error("Copy failed.");
        default:
          return;
      }
    }

    await waitForCopy();

    let listBlobResponse = (await containerClient
      .listBlobsFlat({
        include: ["copy", "snapshots"]
      })
      .byPage()
      .next()).value;

    assert.equal(listBlobResponse.segment.blobItems.length, 4);

    await pageBlobClient.uploadPages("c".repeat(1024), 0, 1024);
    snapshotResult = await pageBlobClient.createSnapshot();
    assert.ok(snapshotResult.snapshot);
    copySource = pageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    copyResponse = await destPageBlobClient.startCopyIncremental(copySource);

    await waitForCopy();

    listBlobResponse = (await containerClient
      .listBlobsFlat({
        include: ["copy", "snapshots"]
      })
      .byPage()
      .next()).value;

    assert.equal(listBlobResponse.segment.blobItems.length, 6);

    const pageBlobProperties = await destPageBlobClient.getProperties();
    assert.equal(pageBlobProperties.metadata!.sourcemeta, "val");
  });

  it("uploadPagesFromURL", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = recorder.getUniqueName("blockblob");
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];
    // Get a SAS for blobURL
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    );

    await pageBlobClient.uploadPagesFromURL(`${blockBlobClient.url}?${sas}`, 0, 0, 512);
    await pageBlobClient.uploadPagesFromURL(`${blockBlobClient.url}?${sas}`, 512, 512, 512);

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("can be created with a url and a credential", async () => {
    const factories = (pageBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new PageBlobClient(pageBlobClient.url, credential);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (pageBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new PageBlobClient(pageBlobClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345
        })
    };
    const newClient = new PageBlobClient(pageBlobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (pageBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new PageBlobClient(pageBlobClient.url, pipeline);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a connection string", async () => {
    const newClient = new PageBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName
    );

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });
});
