// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import {
  getBSU,
  getConnectionStringFromEnvironment,
  bodyToString,
  recorderEnvSetup,
  getTokenBSUWithDefaultCredential,
  getStorageAccessTokenWithDefaultCredential,
  getUniqueName,
  configureBlobStorageClient,
  SimpleTokenCredential,
} from "../utils";
import {
  newPipeline,
  PageBlobClient,
  StorageSharedKeyCredential,
  ContainerClient,
  BlobClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  BlobServiceClient,
  StorageBlobAudience,
  getBlobServiceAccountAudience,
} from "../../src";
import { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { delay, Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { Test_CPK_INFO } from "../utils/fakeTestSecrets";
import { Context } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";

describe("PageBlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let pageBlobClient: PageBlobClient;

  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: [
            "x-ms-copy-source",
            "x-ms-copy-source-authorization",
            "x-ms-encryption-key",
          ],
        },
      },
      ["playback", "record"],
    );
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    blobClient = containerClient.getBlobClient(blobName);
    pageBlobClient = blobClient.getPageBlobClient();
  });

  afterEach(async function () {
    await containerClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    await pageBlobClient.create(1024);
    const pageBlobClientWithOAuthToken = new PageBlobClient(
      pageBlobClient.url,
      createTestCredential(),
    );
    configureBlobStorageClient(recorder, pageBlobClientWithOAuthToken);
    const exist = await pageBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Customized audience should work", async () => {
    await pageBlobClient.create(1024);
    const pageBlobClientWithOAuthToken = new PageBlobClient(
      pageBlobClient.url,
      createTestCredential(),
      {
        audience: [getBlobServiceAccountAudience(blobServiceClient.accountName)],
      },
    );
    configureBlobStorageClient(recorder, pageBlobClientWithOAuthToken);
    const exist = await pageBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Bearer token challenge should work", async () => {
    await pageBlobClient.create(1024);

    // To validate that bad audience should fail.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const pageBlobClientWithPlainOAuthToken = new PageBlobClient(
      pageBlobClient.url,
      new SimpleTokenCredential(authToken!.token),
    );
    configureBlobStorageClient(recorder, pageBlobClientWithPlainOAuthToken);

    try {
      await pageBlobClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }
    const blockBlobClientWithOAuthToken = new PageBlobClient(
      pageBlobClient.url,
      createTestCredential(),
      {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      },
    );
    configureBlobStorageClient(recorder, blockBlobClientWithOAuthToken);
    const exist = await blockBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("fetch a blob for disk with challenge Bearer token", async function (this: Context): Promise<void> {
    if (isLiveMode()) {
      this.skip();
    }
    const diskBlobClient = new PageBlobClient(
      "https://md-hdd-jxsm54fzq3jc.z8.blob.storage.azure.net/g15jvgx5jcgz/abcd?sv=2018-03-28&sr=b&si=76fa4842-d48b-45a8-ae15-a5bee9d8c5de&sig=***",
      createTestCredential(),
    );

    configureBlobStorageClient(recorder, diskBlobClient);
    const result = await diskBlobClient.getProperties();
    assert.ok(result.contentLength);
  });

  // needs special setup to record
  it.skip("fetch a blob for disk with Bearer token", async function (this: Context): Promise<void> {
    if (isLiveMode()) {
      this.skip();
    }
    const diskBlobClient = new PageBlobClient(
      "https://md-hdd-jxsm54fzq3jc.z8.blob.storage.azure.net/wmkmgnjxxnjt/abcd?sv=2018-03-28&sr=b&si=9a01f5e5-ae40-4251-917d-66ac35cda429&sig=***",
      createTestCredential(),
      {
        audience: StorageBlobAudience.DiskComputeOAuthScopes,
      },
    );

    const result = await diskBlobClient.getProperties();
    assert.ok(result.contentLength);
  });

  it("startCopyIncremental", async function () {
    await pageBlobClient.create(1024, {
      metadata: {
        sourcemeta: "val",
      },
    });
    await pageBlobClient.uploadPages("b".repeat(1024), 0, 1024);

    let snapshotResult = await pageBlobClient.createSnapshot();
    assert.ok(snapshotResult.snapshot);

    const destPageBlobClient = containerClient.getPageBlobClient(
      recorder.variable("page", getUniqueName("page")),
    );

    await containerClient.setAccessPolicy("container");
    // Container cache may take up to 30 seconds to take effect.
    await delay(30 * 1000);

    let copySource = pageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    let copyResponse = await destPageBlobClient.startCopyIncremental(copySource);

    async function waitForCopy(retries = 0): Promise<void> {
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
          includeSnapshots: true,
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
          includeSnapshots: true,
        })
        .byPage()
        .next()
    ).value;

    assert.equal(listBlobResponse.segment.blobItems.length, 6);

    const pageBlobProperties = await destPageBlobClient.getProperties();
    assert.equal(pageBlobProperties.metadata!.sourcemeta, "val");
  });

  it("uploadPagesFromURL", async function () {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const sharedKeyCredential = (blobClient as any).credential as StorageSharedKeyCredential;
    // Get a SAS for blobURL
    const expiryTime = new Date(recorder.variable("expiry", new Date().toISOString()));
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r"),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    await pageBlobClient.uploadPagesFromURL(`${blockBlobClient.url}?${sas}`, 0, 0, 512);
    await pageBlobClient.uploadPagesFromURL(`${blockBlobClient.url}?${sas}`, 512, 512, 512);

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("uploadPagesFromURL - source SAS and destination bearer token", async function (this: Context) {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const sharedKeyCredential = (blobClient as any).credential as StorageSharedKeyCredential;
    // Get a SAS for blobURL
    const expiryTime = new Date(recorder.variable("expiry", new Date().toISOString()));
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r"),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const tokenBlobServiceClient = getTokenBSUWithDefaultCredential(recorder);
    const tokenPageBlobClient = tokenBlobServiceClient
      .getContainerClient(containerName)
      .getPageBlobClient(blobName);

    await tokenPageBlobClient.uploadPagesFromURL(`${blockBlobClient.url}?${sas}`, 0, 0, 512);
    await tokenPageBlobClient.uploadPagesFromURL(`${blockBlobClient.url}?${sas}`, 512, 512, 512);

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("uploadPagesFromURL - source bear token and destination account key", async function (this: Context) {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);

    await blockBlobClient.upload(content, content.length);

    const accessToken = await getStorageAccessTokenWithDefaultCredential();

    await pageBlobClient.uploadPagesFromURL(blockBlobClient.url, 0, 0, 512, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken!.token,
      },
    });

    await pageBlobClient.uploadPagesFromURL(blockBlobClient.url, 512, 512, 512, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken!.token,
      },
    });

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("uploadPagesFromURL - destination bearer token", async function (this: Context) {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);

    await blockBlobClient.upload(content, content.length);
    const tokenBlobServiceClient = getTokenBSUWithDefaultCredential(recorder);
    const tokenPageBlobClient = tokenBlobServiceClient
      .getContainerClient(containerName)
      .getPageBlobClient(blobName);

    await tokenPageBlobClient.uploadPagesFromURL(blockBlobClient.url, 0, 0, 512);
    await tokenPageBlobClient.uploadPagesFromURL(blockBlobClient.url, 512, 512, 512);

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("can be created with a url and a credential", async function () {
    const credential = (pageBlobClient as any).credential as StorageSharedKeyCredential;
    const newClient = new PageBlobClient(pageBlobClient.url, credential);
    configureBlobStorageClient(recorder, newClient);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a url and a credential and an option bag", async function () {
    const credential = (pageBlobClient as any).credential as StorageSharedKeyCredential;
    const newClient = new PageBlobClient(pageBlobClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureBlobStorageClient(recorder, newClient);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a url and a TokenCredential", async function () {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = new PageBlobClient(pageBlobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async function () {
    const credential = (pageBlobClient as any).credential as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new PageBlobClient(pageBlobClient.url, pipeline);
    configureBlobStorageClient(recorder, newClient);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a connection string", async function () {
    const newClient = new PageBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
    );
    configureBlobStorageClient(recorder, newClient);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a connection string and an option bag", async function () {
    const newClient = new PageBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
      {
        retryOptions: {
          maxTries: 5,
        },
      },
    );
    configureBlobStorageClient(recorder, newClient);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("create, uploadPages, uploadPagesFromURL, download, clearPages and resize with CPK", async () => {
    const cResp = await pageBlobClient.create(1024, {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.equal(cResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    // Download without CPK should fail.
    let exceptionCaught = false;
    try {
      await blobClient.download(0);
    } catch (err: any) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    const content = "b".repeat(512);
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    // Get a SAS for blobURL
    const credential = (blobClient as any).credential as StorageSharedKeyCredential;
    const expiryTime = new Date(recorder.variable("expiry", new Date().toISOString()));
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r"),
      },
      credential,
    );

    const uResp = await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.equal(uResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);
    const uResp2 = await pageBlobClient.uploadPagesFromURL(
      `${blockBlobClient.url}?${sas}`,
      0,
      512,
      512,
      { customerProvidedKey: Test_CPK_INFO },
    );
    assert.equal(uResp2.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const page1 = await pageBlobClient.download(0, 512, {
      customerProvidedKey: Test_CPK_INFO,
    });
    const page2 = await pageBlobClient.download(512, 512, {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.equal(page2.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));

    // TODO: As service support, Clear page currently cannot work with/without CPK when blob is encrypted with CPK.
    // This might be optimized further according to service.
    exceptionCaught = false;
    try {
      await pageBlobClient.clearPages(0, 512);
    } catch (err: any) {
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
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.equal(pResp.contentLength, 2048);
  });

  describe("conditional tags", () => {
    const tags = {
      tag1: "val1",
      tag2: "val2",
    };

    const tagConditionMet = { tagConditions: "tag1 = 'val1'" };
    const tagConditionUnmet = { tagConditions: "tag1 = 'val2'" };

    beforeEach(async function () {
      await pageBlobClient.create(1024, { tags });
    });

    async function throwExpectedError(promise: Promise<any>, errorCode: string): Promise<boolean> {
      let expectedExceptionCaught = false;
      try {
        await promise;
      } catch (e: any) {
        assert.equal(e.details?.errorCode, errorCode);
        expectedExceptionCaught = true;
      }
      return expectedExceptionCaught;
    }

    it("PageBlob.startCopyIncremental", async () => {
      const snapshotResult = await pageBlobClient.createSnapshot();
      assert.ok(snapshotResult.snapshot);
      const copySource = pageBlobClient.withSnapshot(snapshotResult.snapshot!).url;

      await containerClient.setAccessPolicy("container");
      // Container cache may take up to 30 seconds to take effect.
      await delay(30 * 1000);

      const destPageBlobClient = containerClient.getPageBlobClient(
        recorder.variable("destPageBlob", getUniqueName("destPageBlob")),
      );

      const copyResponse = await destPageBlobClient.startCopyIncremental(copySource);
      if (copyResponse.copyStatus === "pending") {
        // May fail as the copy succeeded during between? If so, ignore error in the abort as we don't care.
        /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
        try {
          await destPageBlobClient.abortCopyFromURL(copyResponse.copyId!);
        } catch (err: any) {}
      }

      await destPageBlobClient.setTags(tags);

      const snapshotResult1 = await pageBlobClient.createSnapshot();
      assert.ok(snapshotResult1.snapshot);
      const copySource1 = pageBlobClient.withSnapshot(snapshotResult1.snapshot!).url;

      assert.ok(
        await throwExpectedError(
          destPageBlobClient.startCopyIncremental(copySource1, { conditions: tagConditionUnmet }),
          "ConditionNotMet",
        ),
      );
      await destPageBlobClient.startCopyIncremental(copySource1, { conditions: tagConditionMet });
    });

    it("uploadPagesFromURL with conditional tags for destination blob", async function () {
      const result = await blobClient.download(0);
      assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

      const content = "a".repeat(512) + "b".repeat(512);
      const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
      const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
      await blockBlobClient.upload(content, content.length);

      const sharedKeyCredential = (blobClient as any).credential as StorageSharedKeyCredential;
      // Get a SAS for blobURL
      const expiryTime = new Date(recorder.variable("expiry", new Date().toISOString()));
      expiryTime.setDate(expiryTime.getDate() + 1);
      const sas = generateBlobSASQueryParameters(
        {
          expiresOn: expiryTime,
          containerName,
          blobName: blockBlobName,
          permissions: BlobSASPermissions.parse("r"),
        },
        sharedKeyCredential as StorageSharedKeyCredential,
      );

      assert.ok(
        await throwExpectedError(
          pageBlobClient.uploadPagesFromURL(`${blockBlobClient.url}?${sas}`, 0, 0, 512, {
            conditions: tagConditionUnmet,
          }),
          "ConditionNotMet",
        ),
      );

      await pageBlobClient.uploadPagesFromURL(`${blockBlobClient.url}?${sas}`, 0, 0, 512, {
        conditions: tagConditionMet,
      });
    });
  });
});
