// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerClient, BlobClient, BlobServiceClient } from "../../src/index.js";
import { getBlobServiceAccountAudience, PageBlobClient } from "../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { getYieldedValue } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient, createPageBlobClient } from "../utils/clients.js";
import { getUniqueName } from "../utils/testHelpers.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { SimpleTokenCredential } from "../utils/simpleToken.js";
import { assertClientUsesTokenCredential } from "../utils/assert.js";
import { isRestError } from "@azure/core-rest-pipeline";

describe("PageBlobClient", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let pageBlobClient: PageBlobClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
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

  it("Default audience should work", async () => {
    await pageBlobClient.create(1024);
    const pageBlobClientWithOAuthToken = await createPageBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
    });
    const exist = await pageBlobClientWithOAuthToken.exists();
    assert.isTrue(exist);
  });

  it("Customized audience should work", async () => {
    await pageBlobClient.create(1024);
    const pageBlobClientWithOAuthToken = await createPageBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
      options: {
        audience: [getBlobServiceAccountAudience(blobServiceClient.accountName)],
      },
    });
    const exist = await pageBlobClientWithOAuthToken.exists();
    assert.isTrue(exist);
  });

  it("Bearer token challenge should work", async () => {
    await pageBlobClient.create(1024);

    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const pageBlobClientWithPlainOAuthToken = await createPageBlobClient("Custom", {
      recorder,
      blobName,
      containerName,
      credential: new SimpleTokenCredential(authToken.token),
    });

    try {
      await pageBlobClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.strictEqual(err.statusCode, 401);
    }
    const blockBlobClientWithOAuthToken = await createPageBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
      options: {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      },
    });
    const exist = await blockBlobClientWithOAuthToken.exists();
    assert.isTrue(exist);
  });

  it("can be created with a url and a TokenCredential", async () => {
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

  it("createIfNotExists", async () => {
    const res = await pageBlobClient.createIfNotExists(512);
    assert.isTrue(res.succeeded);
    assert.isDefined(res.etag);

    const res2 = await pageBlobClient.createIfNotExists(512);
    assert.isFalse(res2.succeeded);
    assert.equal(res2.errorCode, "BlobAlreadyExists");
  });

  it("listPageRanges", async () => {
    await pageBlobClient.create(4096);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
    }

    const rangesResult = (await pageBlobClient.listPageRanges(0, 4096).byPage().next()).value;

    for (let i = 0; i < 4; ++i) {
      assert.equal(rangesResult.pageRange[i].start, i * 1024);
      assert.equal(rangesResult.pageRange[i].end, i * 1024 + 511);
    }
  });

  it("Verify PagedAsyncIterableIterator for listPageRanges", async () => {
    await pageBlobClient.create(4096);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
    }

    let index = 0;
    for await (const pageRange of pageBlobClient.listPageRanges(0, 4096)) {
      assert.equal(pageRange.start, index * 1024);
      assert.equal(pageRange.end, index * 1024 + 511);
      ++index;
    }
  });

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for listPageRanges", async () => {
    await pageBlobClient.create(4096);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
    }

    const iterator = pageBlobClient.listPageRanges(0, 4096);

    let pageRange = getYieldedValue(await iterator.next());
    assert.equal(pageRange.start, 0);

    pageRange = getYieldedValue(await iterator.next());
    assert.equal(pageRange.start, 1024);
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listPageRanges", async () => {
    await pageBlobClient.create(4096);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
    }

    let index = 0;

    for await (const response of pageBlobClient
      .listPageRanges(0, 4096)
      .byPage({ maxPageSize: 2 })) {
      for (const pageRangeItem of response.pageRange!) {
        assert.equal(pageRangeItem.start, index * 1024);
        assert.equal(pageRangeItem.end, index * 1024 + 511);
        ++index;
      }
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listPageRanges", async () => {
    await pageBlobClient.create(4096);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
    }

    let index = 0;

    let iter = pageBlobClient.listPageRanges(0, 4096).byPage({ maxPageSize: 2 });

    let response = (await iter.next()).value;
    for (const pageRangeItem of response.pageRange) {
      assert.equal(pageRangeItem.start, index * 1024);
      assert.equal(pageRangeItem.end, index * 1024 + 511);
      ++index;
    }
    // Gets next marker
    const marker = response.continuationToken;
    // Passing next marker as continuationToken
    iter = pageBlobClient
      .listPageRanges(0, 4096)
      .byPage({ continuationToken: marker, maxPageSize: 2 });

    response = (await iter.next()).value;
    for (const pageRangeItem of response.pageRange) {
      assert.equal(pageRangeItem.start, index * 1024);
      assert.equal(pageRangeItem.end, index * 1024 + 511);
      ++index;
    }
  });

  it("listPageRangesDiff", async () => {
    await pageBlobClient.create(4096);

    await pageBlobClient.uploadPages("b".repeat(4096), 0, 4096);

    const snapshotResult = await pageBlobClient.createSnapshot();
    assert.isDefined(snapshotResult.snapshot);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
      await pageBlobClient.clearPages(i * 1024 + 512, 512);
    }

    const rangesDiff = (
      await pageBlobClient.listPageRangesDiff(0, 4096, snapshotResult.snapshot!).byPage().next()
    ).value;

    for (let i = 0; i < 4; ++i) {
      assert.equal(rangesDiff.pageRange[i].start, i * 1024);
      assert.equal(rangesDiff.pageRange[i].end, i * 1024 + 511);
      assert.equal(rangesDiff.clearRange[i].start, i * 1024 + 512);
      assert.equal(rangesDiff.clearRange[i].end, i * 1024 + 1023);
    }
  });

  it("Verify PagedAsyncIterableIterator for listPageRangesDiff", async () => {
    await pageBlobClient.create(4096);

    await pageBlobClient.uploadPages("b".repeat(4096), 0, 4096);
    const snapshotResult = await pageBlobClient.createSnapshot();
    assert.isDefined(snapshotResult.snapshot);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
      await pageBlobClient.clearPages(i * 1024 + 512, 512);
    }

    let index = 0;
    for await (const pageRange of pageBlobClient.listPageRangesDiff(
      0,
      4096,
      snapshotResult.snapshot!,
    )) {
      assert.equal(pageRange.start, index * 512);
      assert.equal(pageRange.end, index * 512 + 511);
      if (index % 2 === 0) {
        assert.isFalse(pageRange.isClear);
      } else {
        assert.isDefined(pageRange.isClear);
      }
      ++index;
    }
  });

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for listPageRangesDiff", async () => {
    await pageBlobClient.create(4096);

    await pageBlobClient.uploadPages("b".repeat(4096), 0, 4096);
    const snapshotResult = await pageBlobClient.createSnapshot();
    assert.isDefined(snapshotResult.snapshot);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
      await pageBlobClient.clearPages(i * 1024 + 512, 512);
    }

    const iterator = pageBlobClient.listPageRangesDiff(0, 4096, snapshotResult.snapshot!);

    let pageRange = getYieldedValue(await iterator.next());
    assert.equal(pageRange.start, 0);

    pageRange = getYieldedValue(await iterator.next());
    assert.equal(pageRange.start, 512);
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listPageRangesDiff", async () => {
    await pageBlobClient.create(4096);

    await pageBlobClient.uploadPages("b".repeat(4096), 0, 4096);
    const snapshotResult = await pageBlobClient.createSnapshot();
    assert.isDefined(snapshotResult.snapshot);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
      await pageBlobClient.clearPages(i * 1024 + 512, 512);
    }

    let index = 0;
    for await (const response of pageBlobClient
      .listPageRangesDiff(0, 4096, snapshotResult.snapshot!)
      .byPage({ maxPageSize: 2 })) {
      assert.equal(response.pageRange![0].start, index * 1024);
      assert.equal(response.pageRange![0].end, index * 1024 + 511);
      assert.equal(response.clearRange![0].start, index * 1024 + 512);
      assert.equal(response.clearRange![0].end, index * 1024 + 1023);
      ++index;
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listPageRangesDiff", async () => {
    await pageBlobClient.create(4096);

    await pageBlobClient.uploadPages("b".repeat(4096), 0, 4096);
    const snapshotResult = await pageBlobClient.createSnapshot();
    assert.isDefined(snapshotResult.snapshot);

    for (let i = 0; i < 4; ++i) {
      await pageBlobClient.uploadPages("a".repeat(512), i * 1024, 512);
      await pageBlobClient.clearPages(i * 1024 + 512, 512);
    }

    let iter = pageBlobClient
      .listPageRangesDiff(0, 4096, snapshotResult.snapshot!)
      .byPage({ maxPageSize: 2 });

    let response = (await iter.next()).value;
    assert.equal(response.pageRange![0].start, 0);
    assert.equal(response.pageRange![0].end, 511);
    assert.equal(response.clearRange![0].start, 512);
    assert.equal(response.clearRange![0].end, 1023);

    // Gets next marker
    const marker = response.continuationToken;
    // Passing next marker as continuationToken
    iter = pageBlobClient
      .listPageRangesDiff(0, 4096, snapshotResult.snapshot!)
      .byPage({ continuationToken: marker, maxPageSize: 2 });

    response = (await iter.next()).value;
    assert.equal(response.pageRange![0].start, 1024);
    assert.equal(response.pageRange![0].end, 1024 + 511);
    assert.equal(response.clearRange![0].start, 1024 + 512);
    assert.equal(response.clearRange![0].end, 1024 + 1023);
  });

  it("updateSequenceNumber", async () => {
    await pageBlobClient.create(1024);
    let propertiesResponse = await pageBlobClient.getProperties();

    await pageBlobClient.updateSequenceNumber("increment");
    propertiesResponse = await pageBlobClient.getProperties();
    assert.equal(propertiesResponse.blobSequenceNumber!, 1);

    await pageBlobClient.updateSequenceNumber("update", 10);
    propertiesResponse = await pageBlobClient.getProperties();
    assert.equal(propertiesResponse.blobSequenceNumber!, 10);

    await pageBlobClient.updateSequenceNumber("max", 100);
    propertiesResponse = await pageBlobClient.getProperties();
    assert.equal(propertiesResponse.blobSequenceNumber!, 100);
  });

  it("uploadPages with invalid CRC64 should fail", async () => {
    await pageBlobClient.create(1024);

    let exceptionCaught = false;
    try {
      await pageBlobClient.uploadPages("b".repeat(1024), 0, 1024, {
        transactionalContentCrc64: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
      });
    } catch (err: any) {
      if (
        err instanceof Error &&
        err.message.startsWith(
          "The CRC64 value specified in the request did not match with the CRC64 value calculated by the server.",
        )
      ) {
        exceptionCaught = true;
      }
    }

    assert.isDefined(exceptionCaught);
  });

  it("startCopyIncremental", async () => {
    await pageBlobClient.create(1024, {
      metadata: {
        sourcemeta: "val",
      },
    });
    await pageBlobClient.uploadPages("b".repeat(1024), 0, 1024);

    let snapshotResult = await pageBlobClient.createSnapshot();
    assert.isDefined(snapshotResult.snapshot);

    const destPageBlobClient = containerClient.getPageBlobClient(
      getUniqueName("page", { recorder }),
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
    assert.isDefined(snapshotResult.snapshot);
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
});
