// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type ContainerClient,
  type BlobClient,
  BlobServiceClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  StorageBlobAudience,
} from "@azure/storage-blob";
import { PageBlobClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient, createPageBlobClient } from "./utils/clients.js";
import { bodyToString, getUniqueName } from "../utils/utils.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { STORAGE_SCOPE } from "../utils/constants.js";
import { isRestError } from "@azure/core-rest-pipeline";
import {
  getAccountKey,
  getCustomerProvidedKey,
  getMdAccountKey,
  getMdAccountName,
  getStorageConnectionString,
} from "../../utils/injectables.js";

describe.runIf(getAccountKey())("PageBlobClient", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let pageBlobClient: PageBlobClient;
  let recorder: Recorder;
  const customerProvidedKey = getCustomerProvidedKey();

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const blobServiceClientOrUndefined = await createBlobServiceClient("AccountKey", { recorder });
    assert.isDefined(blobServiceClientOrUndefined);
    blobServiceClient = blobServiceClientOrUndefined;
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    pageBlobClient = blobClient.getPageBlobClient();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("can be created with a sas connection string", async () => {
    const newClient = await createPageBlobClient("SASConnectionString", {
      recorder,
      blobName,
      containerName,
    });
    assert.isDefined(newClient);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("throws error if constructor containerName parameter is empty", async () => {
    try {
      await createPageBlobClient("SASConnectionString", { recorder, blobName, containerName: "" });
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected.",
      );
    }
  });

  it("throws error if constructor blobName parameter is empty", async () => {
    try {
      await createPageBlobClient("SASConnectionString", { recorder, blobName: "", containerName });
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected.",
      );
    }
  });

  it("uploadPagesFromURL", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const sharedKeyCredential = blobClient.credential;
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

  it("uploadPagesFromURL - source SAS and destination bearer token", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const sharedKeyCredential = blobClient.credential as StorageSharedKeyCredential;
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
      sharedKeyCredential,
    );

    const tokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
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

  it("uploadPagesFromURL - source bear token and destination account key", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);

    await blockBlobClient.upload(content, content.length);

    const accessToken = await createTestCredential().getToken(STORAGE_SCOPE);
    assert.isNotNull(accessToken);

    await pageBlobClient.uploadPagesFromURL(blockBlobClient.url, 0, 0, 512, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken.token,
      },
    });

    await pageBlobClient.uploadPagesFromURL(blockBlobClient.url, 512, 512, 512, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken.token,
      },
    });

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("uploadPagesFromURL - destination bearer token", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);

    await blockBlobClient.upload(content, content.length);
    const tokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
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

  it("updatePagesFromURL - should fail with source error message", async function () {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const newBlobClient = containerClient.getPageBlobClient(
      getUniqueName("copiedblob", { recorder }),
    );
    await newBlobClient.create(1024);

    const sourceUrl = await pageBlobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse("d"),
      expiresOn: tmr,
    });

    try {
      await newBlobClient.uploadPagesFromURL(sourceUrl, 0, 512, 512);
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepEqual((err.details as any).errorCode, "CannotVerifyCopySource");
      assert.equal((err.details as any).copySourceStatusCode, 403);
      assert.deepEqual((err.details as any).copySourceErrorCode, "AuthorizationPermissionMismatch");
      assert.deepEqual(
        (err.details as any).copySourceErrorMessage,
        "This request is not authorized to perform this operation using this permission.",
      );
    }
  });

  it.runIf(getStorageConnectionString())("can be created with a connection string", async () => {
    const newClient = await createPageBlobClient("AccountConnectionString", {
      recorder,
      blobName,
      containerName,
    });
    assert.isDefined(newClient);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it.runIf(getStorageConnectionString())(
    "can be created with a connection string and an option bag",
    async () => {
      const newClient = await createPageBlobClient("AccountConnectionString", {
        recorder,
        blobName,
        containerName,
        options: { retryOptions: { maxTries: 5 } },
      });
      assert.isDefined(newClient);
      await newClient.create(512);
      const result = await newClient.download(0);
      assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
    },
  );

  it("create, uploadPages, uploadPagesFromURL, download, clearPages and resize with CPK", async () => {
    const cResp = await pageBlobClient.create(1024, {
      customerProvidedKey,
    });
    assert.equal(cResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    // Download without CPK should fail.
    let exceptionCaught = false;
    try {
      await blobClient.download(0);
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    const content = "b".repeat(512);
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    // Get a SAS for blobURL
    const credential = blobClient.credential as StorageSharedKeyCredential;
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
      customerProvidedKey,
    });
    assert.equal(uResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);
    const uResp2 = await pageBlobClient.uploadPagesFromURL(
      `${blockBlobClient.url}?${sas}`,
      0,
      512,
      512,
      { customerProvidedKey },
    );
    assert.equal(uResp2.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    const page1 = await pageBlobClient.download(0, 512, {
      customerProvidedKey,
    });
    const page2 = await pageBlobClient.download(512, 512, {
      customerProvidedKey,
    });
    assert.equal(page2.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));

    // TODO: As service support, Clear page currently cannot work with/without CPK when blob is encrypted with CPK.
    // This might be optimized further according to service.
    exceptionCaught = false;
    try {
      await pageBlobClient.clearPages(0, 512);
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
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
      customerProvidedKey,
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

    beforeEach(async () => {
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
        getUniqueName("destPageBlob", { recorder }),
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

    it("uploadPagesFromURL with conditional tags for destination blob", async () => {
      const result = await blobClient.download(0);
      assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

      const content = "a".repeat(512) + "b".repeat(512);
      const blockBlobName = getUniqueName("blockblob", { recorder });
      const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
      await blockBlobClient.upload(content, content.length);

      const sharedKeyCredential = blobClient.credential as StorageSharedKeyCredential;
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
        sharedKeyCredential,
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

// TODO: enable the tests after they're re-recorded
describe.runIf(getMdAccountName()).skip("managed disks", () => {
  let recorder: Recorder;
  let accountName: string;
  let accountKey: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    accountName = getMdAccountName()!;
    accountKey = getMdAccountKey()!;
    assert.isDefined(accountName);
    assert.isDefined(accountKey);
  });

  it("getPageRangesDiffForManagedDisks", async function () {
    const mdBlobServiceClient = new BlobServiceClient(
      `https://${getMdAccountName()}.blob.core.windows.net/`,
      new StorageSharedKeyCredential(accountName, accountKey),
    );
    const mdContainerName = getUniqueName("md-container", { recorder });
    const mdContainerClient = mdBlobServiceClient.getContainerClient(mdContainerName);
    await mdContainerClient.create();
    const mdBlobName = getUniqueName("md-blob", { recorder });
    const mdBlobClient = mdContainerClient.getBlobClient(mdBlobName);
    const mdPageBlobClient = mdBlobClient.getPageBlobClient();

    await mdPageBlobClient.create(1024);

    const result = await mdBlobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await mdPageBlobClient.uploadPages("b".repeat(1024), 0, 1024);

    const snapshotResult = await mdPageBlobClient.createSnapshot();
    assert.ok(snapshotResult.snapshot);

    await mdPageBlobClient.uploadPages("a".repeat(512), 0, 512);
    await mdPageBlobClient.clearPages(512, 512);

    const snapshotUrl = mdPageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    const rangesDiff = await mdPageBlobClient.getPageRangesDiffForManagedDisks(
      0,
      1024,
      snapshotUrl,
    );

    assert.equal(rangesDiff.pageRange![0].offset, 0);
    assert.equal(rangesDiff.pageRange![0].count, 511);
    assert.equal(rangesDiff.clearRange![0].offset, 512);
    assert.equal(rangesDiff.clearRange![0].count, 511);

    await mdContainerClient.delete();
  });

  it("fetch a blob for disk with challenge Bearer token", async function () {
    const diskBlobClient = new PageBlobClient(
      `https://${getMdAccountName()}.blob.core.windows.net/g15jvgx5jcgz/abcd`,
      new StorageSharedKeyCredential(accountName, accountKey),
    );
    const result = await diskBlobClient.getProperties();
    assert.ok(result.contentLength);
  });

  it("fetch a blob for disk with Bearer token", async function () {
    const diskBlobClient = new PageBlobClient(
      `https://${getMdAccountName()}.blob.core.windows.net/g15jvgx5jcgz/abcd`,
      new StorageSharedKeyCredential(accountName, accountKey),
      {
        audience: StorageBlobAudience.DiskComputeOAuthScopes,
      },
    );

    const result = await diskBlobClient.getProperties();
    assert.ok(result.contentLength);
  });
});
