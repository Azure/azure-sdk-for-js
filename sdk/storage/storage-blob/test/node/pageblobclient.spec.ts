import * as assert from "assert";

import {
  getBSU,
  getConnectionStringFromEnvironment,
  bodyToString,
  recorderEnvSetup
} from "../utils";
import {
  newPipeline,
  PageBlobClient,
  StorageSharedKeyCredential,
  ContainerClient,
  BlobClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  BlobServiceClient
} from "../../src";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { record, delay } from "@azure/test-utils-recorder";
import { Test_CPK_INFO } from "../utils/constants";

describe("PageBlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let pageBlobClient: PageBlobClient;

  let recorder: any;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
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
    // Container cache may take up to 30 seconds to take effect.
    await delay(30 * 1000);

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
          throw new Error("Copy unexpected aborted.");
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

    let listBlobResponse = (
      await containerClient
        .listBlobsFlat({
          includeCopy: true,
          includeSnapshots: true
        })
        .byPage()
        .next()
    ).value;

    assert.equal(listBlobResponse.segment.blobItems.length, 4);

    await pageBlobClient.uploadPages("c".repeat(1024), 0, 1024);
    snapshotResult = await pageBlobClient.createSnapshot();
    assert.ok(snapshotResult.snapshot);
    copySource = pageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    copyResponse = await destPageBlobClient.startCopyIncremental(copySource);

    await waitForCopy();

    listBlobResponse = (
      await containerClient
        .listBlobsFlat({
          includeCopy: true,
          includeSnapshots: true
        })
        .byPage()
        .next()
    ).value;

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
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r")
      },
      sharedKeyCredential as StorageSharedKeyCredential
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
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new PageBlobClient(pageBlobClient.url, credential);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (pageBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
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
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
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

  it("can be created with a connection string and an option bag", async () => {
    const newClient = new PageBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
      {
        retryOptions: {
          maxTries: 5
        }
      }
    );

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("create, uploadPages, uploadPagesFromURL, download, clearPages and resize with CPK", async () => {
    const cResp = await pageBlobClient.create(1024, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(cResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    // Download without CPK should fail.
    let exceptionCaught = false;
    try {
      await blobClient.download(0);
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    const content = "b".repeat(512);
    const blockBlobName = recorder.getUniqueName("blockblob");
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    // Get a SAS for blobURL
    const factories = (blobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r")
      },
      credential
    );

    const uResp = await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(uResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);
    const uResp2 = await pageBlobClient.uploadPagesFromURL(
      `${blockBlobClient.url}?${sas}`,
      0,
      512,
      512,
      { customerProvidedKey: Test_CPK_INFO }
    );
    assert.equal(uResp2.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    let page1 = await pageBlobClient.download(0, 512, {
      customerProvidedKey: Test_CPK_INFO
    });
    const page2 = await pageBlobClient.download(512, 512, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(page2.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));

    // TODO: As service support, Clear page currently cannot work with/without CPK when blob is encrypted with CPK.
    // This might be optimized further according to service.
    exceptionCaught = false;
    try {
      await pageBlobClient.clearPages(0, 512);
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    // await pageBlobURL.clearPages(Aborter.none, 0, 512, {customerProvidedKey: Test_CPK_INFO});
    // page1 = await pageBlobURL.download(Aborter.none, 0, 512, {customerProvidedKey: Test_CPK_INFO});
    // assert.deepStrictEqual(await bodyToString(page1, 512), "\u0000".repeat(512));

    // Clear page should fail without CPK.
    // exceptionCaught = false;
    // try {
    //   await pageBlobURL.resize(Aborter.none, 2048);
    // } catch (err) {
    //   exceptionCaught = true;
    // }
    // assert.ok(exceptionCaught);

    // Resize can work without customer encryption key.
    await pageBlobClient.resize(2048);
    const pResp = await pageBlobClient.getProperties({
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(pResp.contentLength, "2048");
  });
});
