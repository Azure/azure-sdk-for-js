// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerClient, BlobClient, BlobServiceClient } from "../../../src/index.js";
import { type PageBlobClient, PremiumPageBlobTier } from "../../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient, createPageBlobClient } from "../../utils/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { bodyToString } from "../../utils/browser/testHelpers.js";

describe("PageBlobClient - browser", () => {
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

  it("can be created with a url and a credential", async () => {
    const newClient = await createPageBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
    });

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const newClient = await createPageBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
      options: {
        retryOptions: {
          maxTries: 5,
        },
      },
    });

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a url and a pipeline", async () => {
    const newClient = await createPageBlobClient("Pipeline", { recorder, blobName, containerName });

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("create with default parameters", async () => {
    await pageBlobClient.create(512);

    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("create with all parameters set", async () => {
    const options = {
      blobHTTPHeaders: {
        blobCacheControl: "blobCacheControl",
        blobContentDisposition: "blobContentDisposition",
        blobContentEncoding: "blobContentEncoding",
        blobContentLanguage: "blobContentLanguage",
        blobContentType: "blobContentType",
      },
      metadata: {
        key1: "vala",
        key2: "valb",
      },
    };
    await pageBlobClient.create(512, options);

    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));

    const properties = await blobClient.getProperties();
    assert.equal(properties.cacheControl, options.blobHTTPHeaders.blobCacheControl);
    assert.equal(properties.contentDisposition, options.blobHTTPHeaders.blobContentDisposition);
    assert.equal(properties.contentEncoding, options.blobHTTPHeaders.blobContentEncoding);
    assert.equal(properties.contentLanguage, options.blobHTTPHeaders.blobContentLanguage);
    assert.equal(properties.contentType, options.blobHTTPHeaders.blobContentType);
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("create with premium page blob tier", async () => {
    const options = { tier: PremiumPageBlobTier.P20 };

    try {
      await pageBlobClient.create(512, options);

      const result = await blobClient.download(0);
      assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));

      const properties = await blobClient.getProperties();
      assert.equal(properties.accessTier, options.tier);
    } catch (err: any) {
      assert.isTrue(err.message.startsWith("The access tier is not supported for this blob type."));
    }
  });

  it("uploadPages", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("a".repeat(512), 0, 512);
    await pageBlobClient.uploadPages("b".repeat(512), 512, 512);

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("uploadPages with progress report", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
      onProgress: () => {
        /* empty */
      },
    });
    await pageBlobClient.uploadPages("b".repeat(512), 512, 512, {
      onProgress: () => {
        /* empty */
      },
    });

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("clearPages", async () => {
    await pageBlobClient.create(1024);
    let result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("a".repeat(1024), 0, 1024);
    result = await pageBlobClient.download(0, 1024);
    assert.deepStrictEqual(await bodyToString(result, 1024), "a".repeat(1024));

    await pageBlobClient.clearPages(0, 512);
    result = await pageBlobClient.download(0, 512);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("getPageRanges", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("a".repeat(512), 0, 512);
    await pageBlobClient.uploadPages("b".repeat(512), 512, 512);

    const page1 = await pageBlobClient.getPageRanges(0, 512);
    const page2 = await pageBlobClient.getPageRanges(512, 512);

    assert.equal((page1.pageRange![0].count || 0) + page1.pageRange![0].offset, 511);
    assert.equal((page2.pageRange![0].count || 0) + page2.pageRange![0].offset, 1023);
  });

  it("getPageRangesDiff", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("b".repeat(1024), 0, 1024);

    const snapshotResult = await pageBlobClient.createSnapshot();
    assert.isDefined(snapshotResult.snapshot);

    await pageBlobClient.uploadPages("a".repeat(512), 0, 512);
    await pageBlobClient.clearPages(512, 512);

    const rangesDiff = await pageBlobClient.getPageRangesDiff(0, 1024, snapshotResult.snapshot!);
    assert.equal(rangesDiff.pageRange![0].offset, 0);
    assert.equal(rangesDiff.pageRange![0].count, 511);
    assert.equal(rangesDiff.clearRange![0].offset, 512);
    assert.equal(rangesDiff.clearRange![0].count, 511);
  });
});
